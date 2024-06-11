import { Box, useMediaQuery } from '@mui/material';
import { ILayout } from '../../../common/types/layout';
import { TopBarComponent } from '../topbar/topbar';
import { useLocation } from 'react-router-dom';
import { Sidebar } from '../sidebar/sidebar';
import { useState } from 'react';

export const LayoutComponent = ({ children }: ILayout) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const matches = useMediaQuery('(min-width:600px)');
  return location.pathname === '/sign-in' ||
    location.pathname === '/sign-up' ? (
    <> {children}</>
  ) : (
    <Box
      display={matches ? 'flex' : 'block'}
      justifyContent='space-between'
      width='100%'
      height='100%'
    >
      <Sidebar
        matches={matches}
        drawerWidth='250'
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '90%',
        }}
      >
        <TopBarComponent />
        {children}
      </Box>
    </Box>
  );
};
