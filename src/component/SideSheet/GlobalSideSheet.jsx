/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, Typography, IconButton, Divider } from '@mui/material';

// icons
import CloseIcon from '@mui/icons-material/Close';

// ==============================|| GLOBAL SIDE SHEET ||============================== //

const GlobalSideSheet = ({ open, onClose, title, content, width }) => {
  const theme = useTheme();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: width || 400,
          height: '100%',
          boxSizing: 'border-box',
          boxShadow: '0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)'
        }
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4">{title}</Typography>
        <IconButton onClick={onClose} size="small" aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <Box sx={{ p: 3 }}>{content}</Box>
    </Drawer>
  );
};

GlobalSideSheet.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  content: PropTypes.node,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default GlobalSideSheet;
