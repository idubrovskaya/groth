import {
  HomeOutlined,
  ChevronLeftOutlined,
  ChevronRightOutlined,
  SettingsOutlined,
  TrendingUpOutlined,
  MenuBookOutlined,
  LogoutOutlined,
} from '@mui/icons-material';
import { Box, Drawer, IconButton, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/styles';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FlexBetween = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const Sidebar = (props: any) => {
  const [isActive, setIsActive] = useState('');
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setIsActive(pathname.substring(1));
  }, [pathname]);
  const { matches, drawerWidth, isOpen, setIsOpen } = props;

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
          <Box width='100%'>
            <Box>
              <FlexBetween>
                <Box display='flex' alignItems='center' gap='10px'>
                  <Typography>Groth</Typography>
                </Box>
                {!matches && (
                  <IconButton onClick={() => setIsOpen(!isOpen)}>
                    <ChevronLeftOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};
