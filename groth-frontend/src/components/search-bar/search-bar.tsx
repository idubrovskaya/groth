import { Stack, Autocomplete, TextField } from '@mui/material';
import { useAppSelector } from '../../core/store/auth/auth.selector';
import { ISingleAsset } from '../../core/types/assets';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const SearchBar = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<string | null>('');

  const assetsArray: ISingleAsset[] = useAppSelector(
    (state) => state.crypto.assets
  );
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        onChange={(event: any, value: string | null) => {
          navigate(`single/${value}`);
          setSelectedItem(null);
        }}
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
