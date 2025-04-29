import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

// project imports
import GlobalDialog from 'component/Dialog/GlobalDialog';

// Create the dialog context
const DialogContext = createContext(null);

// Dialog provider component
export const DialogProvider = ({ children }) => {
  const [dialogConfig, setDialogConfig] = useState({
    open: false,
    title: '',
    content: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    onConfirm: () => {},
    maxWidth: 'sm',
    confirmColor: 'primary',
    fullWidth: true
  });

  // Function to open dialog with custom configuration
  const openDialog = (config) => {
    setDialogConfig({ ...dialogConfig, open: true, ...config });
  };

  // Function to close the dialog
  const closeDialog = () => {
    setDialogConfig({ ...dialogConfig, open: false });
  };

  // Function to confirm and close the dialog
  const confirmDialog = () => {
    dialogConfig.onConfirm();
    closeDialog();
  };

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <GlobalDialog
        open={dialogConfig.open}
        onClose={closeDialog}
        title={dialogConfig.title}
        content={dialogConfig.content}
        confirmText={dialogConfig.confirmText}
        cancelText={dialogConfig.cancelText}
        onConfirm={confirmDialog}
        maxWidth={dialogConfig.maxWidth}
        confirmColor={dialogConfig.confirmColor}
        fullWidth={dialogConfig.fullWidth}
      />
    </DialogContext.Provider>
  );
};

DialogProvider.propTypes = {
  children: PropTypes.node
};

// Custom hook to use the dialog context
export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};
