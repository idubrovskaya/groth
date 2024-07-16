import {
  AppBar,
  Box,
  Grid,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { MenuOutlined } from '@mui/icons-material';
import { tokens } from '../../assets/theme';
import { ITopbarProps } from '../../core/types/topbar';
import { ThemeSwitcher } from '../theme-switcher/theme-switcher';
import { SearchBar } from '../search-bar/search-bar';

export const TopBarComponent: React.FC<ITopbarProps> = (
  props: ITopbarProps
): JSX.Element => {
  const { isOpen, setIsOpen, matches } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <AppBar
      sx={{
        position: 'static',
        flexGrow: 1,
        backgroundColor: colors.primary.DEFAULT,
        borderBottom: `1px solid ${colors.borderColor}`,
        boxShadow: 'none !important',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', p: '25px 45px' }}>
        <Grid container justifyContent={'space-between'} alignItems={'center'}>
          <Grid item sm={3} lg={3}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <MenuOutlined
                sx={{ mr: '10px', cursor: 'pointer' }}
                onClick={() => setIsOpen(!isOpen)}
              />
              <Typography variant='h3'>
                Welcome, {localStorage.getItem('firstName')}
              </Typography>{' '}
            </Box>
          </Grid>
          {matches && (
            <Grid
              item
              sm={9}
              lg={9}
              display={'flex'}
              justifyContent={'flex-end'}
            >
              <ThemeSwitcher />
              <SearchBar />
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
