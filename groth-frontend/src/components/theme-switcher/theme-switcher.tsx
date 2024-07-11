import {
  DarkMode,
  LightMode,
  NotificationsNoneOutlined,
} from '@mui/icons-material';
import { Grid, colors, IconButton, useTheme } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../../assets/theme';

export const ThemeSwitcher = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Grid
      sx={{
        pr: '37px',
        pt: '10px',
      }}
      onClick={colorMode.toggleColorMode}
    >
      <IconButton sx={{ ml: '45px' }}>
        {theme.palette.mode === 'dark' ? <DarkMode /> : <LightMode />}
      </IconButton>
      <IconButton>
        <NotificationsNoneOutlined />
      </IconButton>
    </Grid>
  );
};