import { Menu as MenuIcon } from '@mui/icons-material';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';

interface HeaderProps {
  setMobileSidebarOpen: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setMobileSidebarOpen }) => {
  //   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  //   const openAccountMenu = Boolean(anchorEl);

  //   const handleOpenAccountMenu = (event: React.MouseEvent<HTMLElement>) => {
  //     setAnchorEl(event.currentTarget);
  //   };
  //   const handleCloseAccountMenu = () => {
  //     setAnchorEl(null);
  //   };

  const openMobileSidebar = () => {
    setMobileSidebarOpen(true);
  };

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <AppBar
      position='fixed'
      sx={{
        zIndex: isDesktop ? theme.zIndex.drawer + 1 : theme.zIndex.appBar,
      }}>
      <Toolbar>
        <Typography component='div' noWrap variant='h6'>
          Title
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {/* <div>
            <IconButton
              onClick={handleOpenAccountMenu}
              size="large"
              sx={{ ml: 2 }}
              aria-controls={openAccountMenu ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openAccountMenu ? "true" : undefined}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={openAccountMenu}
              onClose={handleCloseAccountMenu}
              onClick={handleCloseAccountMenu}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleCloseAccountMenu} sx={{ paddingX: 3 }}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                设置
              </MenuItem>
              <MenuItem onClick={handleOpenLogoutModal} sx={{ paddingX: 3 }}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                登出
              </MenuItem>
            </Menu>
          </div> */}
        <IconButton
          aria-label='open drawer'
          color='inherit'
          edge='start'
          onClick={openMobileSidebar}
          sx={{ display: { md: 'none' } }}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
