import {
  ChevronLeftOutlined,
  ChevronRightOutlined,
  LogoutOutlined,
} from '@mui/icons-material';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/styles';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { navMenu } from '../../../common/moks/navigate';
import { tokens } from '../../../assets/theme';
import Logo from '../../../assets/images/logo-groth.svg';
import { useStyles } from './styles';

const FlexBetween = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const Sidebar = (props: any) => {
  const { matches, drawerWidth, isOpen, setIsOpen } = props;

  const [isActive, setIsActive] = useState('');
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const classes = useStyles();

  useEffect(() => {
    setIsActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component='nav'>
      {isOpen && (
        <Drawer
          open={isOpen}
          onClose={() => setIsOpen(false)}
          variant='persistent'
          anchor='left'
          sx={{
            width: drawerWidth,
            '&.MuiDrawer-paper': {
              color: theme.palette.secondary.main,
              backgroundColor: theme.palette.primary.main,
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <Box
            className={classes.navBlock}
            sx={{ borderBottom: `1px solid ${colors.borderColor}` }}
          >
            <Box>
              <FlexBetween>
                <Box className={classes.brand}>
                  <img src={Logo} alt='logo' />
                  <Typography
                    className={classes.brandTitle}
                    variant='h1'
                    color={
                      theme.palette.mode === 'dark'
                        ? colors.white.DEFAULT
                        : colors.black.DEFAULT
                    }
                  >
                    Groth
                  </Typography>
                </Box>
                {!matches && (
                  <IconButton onClick={() => setIsOpen(!isOpen)}>
                    <ChevronLeftOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List className={classes.navList}>
              {navMenu.map((el): JSX.Element => {
                return (
                  <ListItem key={el.id}>
                    <ListItemButton
                      onClick={() => navigate(`${el.path}`)}
                      className={classes.navItem}
                    >
                      <ListItemIcon> {el.icon}</ListItemIcon>
                      <Typography variant='body1'>{el.name}</Typography>
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box width='100%'>
            <List>
              <ListItem>
                <ListItemButton className={classes.navItem}>
                  <ListItemIcon>
                    <LogoutOutlined />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography>Logout</Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};
