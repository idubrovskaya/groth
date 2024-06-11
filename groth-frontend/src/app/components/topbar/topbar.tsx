import { Box, Grid, IconButton, InputBase, useTheme } from '@mui/material';
import { useContext } from 'react';
import { useAppSelector } from '../../auth/store/auth.selector';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { ColorModeContext } from '../../../assets/theme';
import { useStyles } from './styles';

export const TopBarComponent = () => {
  const { firstName } = useAppSelector((state) => state.auth.user);
  console.log('user', firstName);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid>Welcome, {firstName}</Grid>
      <Box display={'flex'}>
        <Grid
          className={classes.iconsBlock}
          onClick={colorMode.toggleColorMode}
        >
          <IconButton className={classes.themeIcon}>
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
        <Grid className={classes.searchBlock}>
          <IconButton className={classes.searchIcon}>
            <SearchIcon />
          </IconButton>
          <InputBase placeholder='Search' className={classes.searchInput} />
        </Grid>
      </Box>
    </Box>
  );
};
