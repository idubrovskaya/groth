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
import { useAppSelector } from '../../core/store/auth/auth.selector';

export const TopBarComponent: React.FC<ITopbarProps> = (
  props: ITopbarProps
): JSX.Element => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { isOpen, setIsOpen, matches } = props;

  const { user } = useAppSelector((state) => state.auth.user);

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
          <Grid item sm={4} lg={4}>
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
                Welcome, {user ? user.firstName : ''}
              </Typography>{' '}
            </Box>
          </Grid>
          {matches && (
            <Grid
              item
              sm={8}
              lg={8}
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
