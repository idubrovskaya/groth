import { Box, useMediaQuery } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../sidebar/sidebar';
import { useState } from 'react';
import { TopBarComponent } from '../topbar/topbar';

export const LayoutComponent: React.FC = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const matches = useMediaQuery('(min-width:760px)');
  return location.pathname === '/sign-in' ||
    location.pathname === '/sign-up' ? (
    <>
      <Outlet />
    </>
  ) : (
    <Box
      display={matches ? 'flex' : 'block'}
      justifyContent='space-between'
      width='100%'
      height='100%'
    >
      <Sidebar
        matches={matches}
        drawerWidth='200px'
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flexGrow: 1,
        }}
      >
        <TopBarComponent
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          matches={matches}
        />
        <Outlet />
      </Box>
    </Box>
  );
};
