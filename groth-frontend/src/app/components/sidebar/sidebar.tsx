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
            sx={{
              borderBottom: `1px solid ${colors.borderColor}`,
              width: '100%',
            }}
          >
            <Box>
              <FlexBetween>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '30px 15px',
                    cursor: 'pointer',
                  }}
                >
                  <img src={Logo} alt='logo' />
                  <Typography
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
            <List sx={{ marginBottom: '55px' }}>
              {navMenu.map((el): JSX.Element => {
                return (
                  <ListItem key={el.id}>
                    <ListItemButton
                      sx={{
                        '&:hover': {
                          backgroundColor: '#1900d5 !important',
                          color: '#fff',
                          borderRadius: '4px',
                          '& .MuiSvgIcon-root': {
                            color: `${colors.white.DEFAULT} !important`,
                          },
                        },
                      }}
                      onClick={() => navigate(`${el.path}`)}
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
                <ListItemButton
                  sx={{
                    '&:hover': {
                      backgroundColor: '#1900d5 !important',
                      color: '#fff',
                      borderRadius: '4px',
                      '& .MuiSvgIcon-root': {
                        color: `${colors.white.DEFAULT} !important`,
                      },
                    },
                  }}
                >
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
