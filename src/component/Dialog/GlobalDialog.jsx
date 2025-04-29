import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useTheme, useMediaQuery } from '@mui/material';

// ==============================|| GLOBAL DIALOG ||============================== //

const GlobalDialog = ({
  open,
  onClose,
  title,
  content,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  maxWidth = 'sm',
  confirmColor = 'primary',
  fullWidth = true
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      aria-labelledby="global-dialog-title"
      aria-describedby="global-dialog-description"
    >
      {title && <DialogTitle id="global-dialog-title">{title}</DialogTitle>}
      <DialogContent>
        {typeof content === 'string' ? <DialogContentText id="global-dialog-description">{content}</DialogContentText> : content}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="outlined">
          {cancelText}
        </Button>
        <Button onClick={onConfirm} color={confirmColor} variant="contained" autoFocus>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

GlobalDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.node,
  content: PropTypes.node,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  maxWidth: PropTypes.string,
  confirmColor: PropTypes.string,
  fullWidth: PropTypes.bool
};

export default GlobalDialog;
