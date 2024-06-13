import {
  AppBar,
  Box,
  Grid,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { useContext } from 'react';
import { useAppSelector } from '../../core/store/auth/auth.selector';
import {
  NotificationsNoneOutlined,
  Search,
  DarkMode,
  LightMode,
  MenuOutlined,
} from '@mui/icons-material';
import { ColorModeContext, tokens } from '../../assets/theme';
import { ITopbarProps } from '../../core/types/topbar';

export const TopBarComponent: React.FC<ITopbarProps> = (
  props: ITopbarProps
): JSX.Element => {
  const { isOpen, setIsOpen } = props;
  const { firstName } = useAppSelector((state) => state.auth.user);
  console.log('user', firstName);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <MenuOutlined
            sx={{ mr: '10px', cursor: 'pointer' }}
            onClick={() => setIsOpen(!isOpen)}
          />
          <Typography variant='h3'>Welcome, {firstName}</Typography>{' '}
        </Box>
        <Box display={'flex'}>
          <Grid
            sx={{
              pr: '37px',
              pt: '10px',
              borderRight: `1px solid ${colors.borderColor}`,
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
          <Grid
            sx={{
              display: 'flex',
              borderRadius: '8px',
              maxHeight: '45px',
              backgroundColor: `${colors.primary[600]}`,
              marginLeft: '28px',
            }}
          >
            <IconButton
              sx={{
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              <Search />
            </IconButton>
            <InputBase placeholder='Search' sx={{ padding: '1rem 0.rem' }} />
          </Grid>
        </Box>
      </Toolbar>
    </AppBar>
    // <Box className={classes.root} sx={{ flexGrow: 1 }}>
    //   <Grid>Welcome, {firstName}</Grid>
    //   <Box display={'flex'}>
    //     <Grid
    //       className={classes.iconsBlock}
    //       onClick={colorMode.toggleColorMode}
    //     >
    //       <IconButton className={classes.themeIcon}>
    //         {theme.palette.mode === 'dark' ? (
    //           <DarkModeIcon />
    //         ) : (
    //           <LightModeIcon />
    //         )}
    //       </IconButton>
    //       <IconButton>
    //         <NotificationsNoneOutlinedIcon />
    //       </IconButton>
    //     </Grid>
    //     <Grid className={classes.searchBlock}>
    //       <IconButton className={classes.searchIcon}>
    //         <SearchIcon />
    //       </IconButton>
    //       <InputBase placeholder='Search' className={classes.searchInput} />
    //     </Grid>
    //   </Box>
    // </Box>
  );
};
