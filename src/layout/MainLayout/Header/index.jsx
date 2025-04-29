import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { Box, Grid, Menu, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project import
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';
import { drawerWidth } from 'config.js';
import { Button, IconButton, Tooltip } from '@mui/material';
import httpService from 'services/httpService';
import { useNotification, NOTIFICATION_TYPES } from 'contexts/NotificationContext';
import { useDialog } from 'contexts/DialogContext';

// assets
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';

// redux
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from 'store/actions';

// ==============================|| HEADER ||============================== //

const Header = () => {
  const { addNotification } = useNotification();
  const { openDialog } = useDialog();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customization);
  const { sidebarCollapsed } = customization;

  const handleCollapse = () => {
    dispatch({ type: actionTypes.SIDEBAR_COLLAPSED, sidebarCollapsed: !sidebarCollapsed });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleButtonClick = async () => {
    try {
      const response = await httpService.get('/example-endpoint');
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
      addNotification('An error occurred while making the request.', NOTIFICATION_TYPES.ERROR);
    }
  };

  const showNotification = (type) => {
    const messages = {
      [NOTIFICATION_TYPES.SUCCESS]: 'Operation completed successfully!',
      [NOTIFICATION_TYPES.ERROR]: 'An error occurred while processing your request.',
      [NOTIFICATION_TYPES.WARNING]: 'Warning: This action may have consequences.',
      [NOTIFICATION_TYPES.INFO]: 'Here is some information you might find useful.'
    };

    addNotification(messages[type], type);
    handleClose();
  };

  const handleDeleteClick = () => {
    openDialog({
      title: 'Confirm Deletion',
      content: 'Are you sure you want to delete this item? This action cannot be undone.',
      confirmText: 'Delete',
      confirmColor: 'error',
      onConfirm: () => {
        // Perform delete operation here
        setTimeout(() => {
          addNotification('Item successfully deleted!', NOTIFICATION_TYPES.SUCCESS);
        }, 500);
      }
    });
  };

  return (
    <>
      <Box width={drawerWidth} sx={{ zIndex: 1201 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title={sidebarCollapsed ? 'Expand' : 'Collapse'}>
              <IconButton
                color="inherit"
                onClick={handleCollapse}
                sx={{
                  color: 'white',
                  borderRadius: '5px',
                  width: sidebarCollapsed ? '40px' : '40px',
                  height: sidebarCollapsed ? '40px' : '40px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: sidebarCollapsed ? 'transparent' : 'transparent',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.light + '1A'  // 10% opacity
                  }
                }}
              >
                {sidebarCollapsed ? <MenuIcon /> : <MenuOpenIcon />}
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <SearchSection theme="light" />
      <Box sx={{ display: 'flex', gap: '8px' }}>
        <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }} startIcon={<DeleteIcon />} onClick={handleDeleteClick}>
          Delete Item
        </Button>
        <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }} endIcon={<KeyboardArrowDownIcon />} onClick={handleClick}>
          Test Notifications
        </Button>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={() => showNotification(NOTIFICATION_TYPES.SUCCESS)}>Success</MenuItem>
          <MenuItem onClick={() => showNotification(NOTIFICATION_TYPES.ERROR)}>Error</MenuItem>
          <MenuItem onClick={() => showNotification(NOTIFICATION_TYPES.WARNING)}>Warning</MenuItem>
          <MenuItem onClick={() => showNotification(NOTIFICATION_TYPES.INFO)}>Info</MenuItem>
        </Menu>
        <Button onClick={handleButtonClick} variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>
          Make Request
        </Button>
      </Box>
      <NotificationSection />
      <ProfileSection />
    </>
  );
};

Header.propTypes = {
  drawerToggle: PropTypes.func
};

export default Header;
