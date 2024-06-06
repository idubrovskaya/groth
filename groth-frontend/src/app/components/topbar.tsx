import { Box, Grid, IconButton, InputBase, useTheme } from '@mui/material';
import { useContext } from 'react';
import { useAppSelector } from '../auth/store/auth.selector';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { ColorModeContext, tokens } from '../../assets/theme';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
});

export const TopBarComponent = () => {
  const { firstName } = useAppSelector((state) => state.auth.user);
  console.log('user', firstName);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const classes = useStyles();

  return (
    <Box display='flex' justifyContent='space-between' px='2rem' py='1.5rem'>
      <Grid>Welcome, {firstName}</Grid>
      <Box display={'flex'}>
        <Grid
          onClick={colorMode.toggleColorMode}
          sx={{
            pr: '37px',
            borderRight: `1px solid ${colors.gray.DEFAULT}`,
          }}
        >
          <IconButton sx={{ mr: '45px' }}>
            {theme.palette.mode === 'dark' ? (
              <DarkModeIcon />
            ) : (
              <LightModeIcon />
            )}
          </IconButton>
          <IconButton>
            <NotificationsNoneOutlinedIcon />
          </IconButton>
        </Grid>
        <Grid
          sx={{
            display: 'flex',
            backgroundColor: `${colors.primary[600]}`,
            borderRadius: '8px',
            ml: '28px',
          }}
        >
          <IconButton className={classes.root}>
            <SearchIcon />
          </IconButton>
          <InputBase placeholder='Search' sx={{ px: '1rem', py: '0.5rem' }} />
        </Grid>
      </Box>
    </Box>
  );
};
