import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Alert, Snackbar, Stack } from '@mui/material';
import { useNotification } from 'contexts/NotificationContext';

const Notification = () => {
  const theme = useTheme();
  const { notifications, removeNotification } = useNotification();

  const handleClose = (id) => () => {
    removeNotification(id);
  };

  // Set up auto-dismissal after 5 seconds
  useEffect(() => {
    const timers = notifications.map((notification) => {
      return setTimeout(() => {
        removeNotification(notification.id);
      }, 5000); // 5 seconds
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [notifications, removeNotification]);

  return (
    <Stack
      spacing={2}
      sx={{
        position: 'fixed',
        bottom: theme.spacing(3), // Changed from top to bottom
        left: '50%', // Center horizontally
        transform: 'translateX(-50%)', // Center horizontally
        zIndex: 2000,
        width: { xs: '90%', sm: '500px', md: '600px' }, // Increased width for better single-line display
        maxWidth: '95%',
        alignItems: 'center' // Center the notifications in the stack
      }}
    >
      {notifications.map((notification) => (
        <Snackbar
          key={notification.id}
          open={true}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Changed to bottom-center
          sx={{ position: 'static', transform: 'none !important', width: '100%' }}
        >
          <Alert
            variant="filled"
            severity={notification.type}
            onClose={handleClose(notification.id)}
            sx={{
              width: '100%',
              boxShadow: theme.shadows[3],
              color: 'white',
              '& .MuiAlert-message': {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }
            }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </Stack>
  );
};

export default Notification;
