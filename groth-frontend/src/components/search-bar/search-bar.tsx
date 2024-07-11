import { Stack, Autocomplete, TextField } from '@mui/material';
import { useAppSelector } from '../../core/store/auth/auth.selector';
import { ISingleAsset } from '../../core/types/assets';

export const SearchBar = () => {
  const assetsArray: ISingleAsset[] = useAppSelector(
    (state) => state.crypto.assets
  );
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        freeSolo
        renderInput={(element) => (
          <TextField
            {...element}
            label='Search'
            InputProps={{ ...element.InputProps, type: 'search' }}
          />
        )}
        options={assetsArray.map((element: { name: string }) => element.name)}
      />
    </Stack>
  );
};
