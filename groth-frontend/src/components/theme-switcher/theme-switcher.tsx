import { DarkMode, LightMode } from '@mui/icons-material';
import { Grid, IconButton, useTheme } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext } from '../../assets/theme';

export const ThemeSwitcher: React.FC = (): JSX.Element => {
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
      <IconButton sx={{ ml: '5px' }}>
        {theme.palette.mode === 'dark' ? <DarkMode /> : <LightMode />}
      </IconButton>
    </Grid>
  );
};
