import {
  Analytics as AnalyticsIcon,
  Dashboard as DashboardIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import type { FC } from 'react';
import { Fragment, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuthContext } from 'src/contexts/AuthContext';
import constants from 'src/utils/constants';

interface SidebarProps {
  isMobileSidebarOpen: boolean;
  setMobileSidebarOpen: (isOpen: boolean) => void;
}

const Sidebar: FC<SidebarProps> = ({
  isMobileSidebarOpen,
  setMobileSidebarOpen,
}) => {
  const { logout } = useAuthContext();
  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  const location = useLocation();

  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const handleCloseLogoutModal = () => {
    setOpenLogoutModal(false);
  };

  const handleOpenLogoutModal = () => {
    setOpenLogoutModal(true);
  };

  const topList = [
    {
      id: 'main',
      text: 'Main',
      icon: <DashboardIcon />,
      href: '/',
      children: [],
    },
    {
      id: 'analytics',
      text: 'Analytics',
      icon: <AnalyticsIcon />,
      href: '/analytics',
    },
  ];

  const bottomList = [
    {
      id: 'settings',
      text: 'Settings',
      icon: <SettingsIcon />,
      href: '/settings',
    },

    {
      id: 'logout',
      text: 'Logout',
      icon: <LogoutIcon />,
    },
  ];
  const [open, setOpen] = useState(false);

  const renderIcon = (isNested: boolean) => {
    if (isNested) {
      return open ? <ExpandLessIcon /> : <ExpandMoreIcon />;
    }
    return null;
  };

  const drawerContent = (
    <Box display='flex' flexDirection='column' height='100%'>
      <Toolbar sx={{ display: { xs: 'none', md: 'block' } }} />
      <List>
        {topList.map(({ id, text, icon, href, children }) => {
          const isNested = !!children && children.length > 0;
          const buttonProps = isNested
            ? {
                onClick: () => {
                  setOpen(!open);
                },
              }
            : {
                component: NavLink,
                to: href,
                selected: location.pathname === href,
              };
          return (
            <Fragment key={id}>
              <ListItem disablePadding>
                <ListItemButton {...buttonProps}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                  {renderIcon(isNested)}
                </ListItemButton>
              </ListItem>
              {isNested ? (
                <Collapse in={open} timeout='auto' unmountOnExit>
                  <List disablePadding>
                    {children.map(
                      ({
                        id: childrenId,
                        text: childrenText,
                        icon: childrenIcon,
                        href: childrenHref,
                      }) => (
                        <ListItem disablePadding key={childrenId}>
                          <ListItemButton
                            component={NavLink}
                            selected={location.pathname === childrenHref}
                            sx={{ pl: 4 }}
                            to={href}>
                            <ListItemIcon>{childrenIcon}</ListItemIcon>
                            <ListItemText primary={childrenText} />
                          </ListItemButton>
                        </ListItem>
                      ),
                    )}
                  </List>
                </Collapse>
              ) : null}
            </Fragment>
          );
        })}
      </List>

      <Box sx={{ mt: 'auto' }}>
        <List>
          {bottomList.map(({ id, text, icon, href }) => (
            <ListItem disablePadding key={id}>
              <ListItemButton
                onClick={() => {
                  if (text === 'Logout') {
                    handleOpenLogoutModal();
                  }
                }}
                {...(text !== 'Logout' && {
                  component: NavLink,
                  to: href,
                })}
                selected={location.pathname === href}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Box
        aria-label='mailbox folders'
        component='nav'
        sx={{ width: { md: constants.SIDEBAR_WIDTH }, flexShrink: { md: 0 } }}>
        <Drawer
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          onClose={closeMobileSidebar}
          open={isMobileSidebarOpen}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: constants.SIDEBAR_WIDTH,
            },
          }}
          variant='temporary'>
          {drawerContent}
        </Drawer>
        <Drawer
          open
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: constants.SIDEBAR_WIDTH,
            },
            flexShrink: 0,
          }}
          variant='permanent'>
          {drawerContent}
        </Drawer>
      </Box>

      <Dialog
        aria-describedby='alert-dialog-description'
        aria-labelledby='alert-dialog-title'
        fullWidth // make the dialog full width for the specified maxWidth
        maxWidth='xs' // control dialog width
        onClose={handleCloseLogoutModal}
        open={openLogoutModal}>
        <DialogTitle
          id='alert-dialog-title'
          sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          Alert!
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id='alert-dialog-description'
            sx={{ textAlign: 'center' }}>
            You are about to logout. Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            color='primary'
            onClick={handleCloseLogoutModal}
            sx={{ mx: 2 }}
            variant='outlined'>
            No
          </Button>
          <Button
            color='error'
            onClick={logout}
            sx={{ mx: 2 }}
            variant='contained'>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Sidebar;
