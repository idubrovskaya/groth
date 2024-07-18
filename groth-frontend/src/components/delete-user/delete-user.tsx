import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { tokens } from '../../assets/theme';
import { AppButton } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../core/store/store';
import { deleteUser } from '../../core/store/auth/auth.actions';

export const DeleteUserComponent: React.FC = (): JSX.Element => {
  const [checked, setChecked] = useState(false);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const handleDelete = () => {
    dispatch(deleteUser());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('firstName');
    navigate('/sign-in');
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Grid container sx={{ padding: '32px' }}>
      <Grid
        item
        sx={{ textAlign: 'center', width: '100%', marginBottom: '32px' }}
      >
        <Typography variant='h2'>Delete account</Typography>
      </Grid>
      <Grid
        item
        sx={{ textAlign: 'center', width: '100%', marginBottom: '32px' }}
      >
        <Typography variant='body1'>
          Dear user, deleting your account will delete all records under the
          account as well. You will no longer have access.
        </Typography>
      </Grid>
      <Grid item sx={{ width: '100%', marginBottom: '32px' }}>
        <FormGroup>
          <FormControlLabel
            sx={{ justifyContent: 'center' }}
            control={
              <Checkbox
                checked={checked}
                onChange={() => setChecked(!checked)}
                sx={{
                  color: colors.blue,
                  '&.Mui-checked': { color: colors.blue },
                }}
              />
            }
            label='I agree'
          />
        </FormGroup>
      </Grid>
      <Grid item sx={{ width: '100%', textAlign: 'center' }}>
        <AppButton disabled={!checked} onClick={handleDelete}>
          Delete account
        </AppButton>
      </Grid>
    </Grid>
  );
};
