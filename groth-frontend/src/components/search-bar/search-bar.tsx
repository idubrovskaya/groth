import { Stack, Autocomplete, TextField } from '@mui/material';
import { useAppSelector } from '../../core/store/auth/auth.selector';
import { ISingleAsset } from '../../core/types/assets';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';

export const SearchBar = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<string | null>('');

  const assetsArray: ISingleAsset[] = useAppSelector(
    (state) => state.crypto.assets
  );

  const handleChange = useCallback(
    (event: any, value: string | null) => {
      if (value) {
        navigate(`single/${value}`);
      }
      setSelectedItem(value);
    },
    [navigate]
  );

  const handleInputChange = useCallback(
    (event: any, value: string) => {
      if (value === '') {
        navigate('/');
      }
      setSelectedItem(value);
    },
    [navigate]
  );

  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        onChange={handleChange}
        onInputChange={handleInputChange}
        renderInput={(element) => <TextField {...element} label='Search' />}
        options={assetsArray.map((element: { name: string }) => element.name)}
      />
    </Stack>
  );
};
