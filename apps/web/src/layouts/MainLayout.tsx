import { Box, Toolbar } from '@mui/material';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'src/components/Layout/Header';
import Sidebar from 'src/components/Layout/Sidebar';
import AuthGuard from 'src/guards/AuthGuard';
import ConfirmGuard from 'src/guards/ConfirmGuard';
import constants from 'src/utils/constants';

const MainLayout = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <AuthGuard requireAuth>
      <ConfirmGuard requireConfirm>
        <Box sx={{ display: 'flex' }}>
          <Header setMobileSidebarOpen={setMobileSidebarOpen} />
          <Sidebar
            isMobileSidebarOpen={isMobileSidebarOpen}
            setMobileSidebarOpen={setMobileSidebarOpen}
          />

          <Box
            component='main'
            sx={{
              flexGrow: 1,
              width: { sm: `calc(100% - ${constants.SIDEBAR_WIDTH}px)` },
              minHeight: '100vh',
            }}>
            <Toolbar />

            <Outlet />
          </Box>
        </Box>
      </ConfirmGuard>
    </AuthGuard>
  );
};

export default MainLayout;
