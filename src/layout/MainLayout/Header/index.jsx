import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { Box, Grid } from '@mui/material';

// project import
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';
import { drawerWidth } from 'config.js';
import { Button, IconButton, Tooltip } from '@mui/material';
import httpService from 'services/httpService';

// assets
import logo from 'assets/images/logo.svg';

// ==============================|| HEADER ||============================== //

const Header = () => {
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
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Grid item>
              <Box mt={0.5}>
                <img src={logo} alt="Logo" />
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <SearchSection theme="light" />
        <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }} startIcon={<DeleteIcon />} onClick={handleDeleteClick}>
          Delete Item
        </Button>
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
