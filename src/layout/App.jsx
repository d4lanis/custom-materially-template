import React from 'react';

// material-ui
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// third-party
import { useSelector } from 'react-redux';

// project import
import theme from 'themes';
import Routes from 'routes/index';
import NavigationScroll from './NavigationScroll';
import Notification from 'component/Notification';
import { NotificationProvider } from 'contexts/NotificationContext';
import { DialogProvider } from 'contexts/DialogContext';
import { SideSheetProvider } from 'contexts/SideSheetContext';

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <NotificationProvider>
      <DialogProvider>
        <SideSheetProvider>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme(customization)}>
              <CssBaseline />
              <NavigationScroll>
                <Routes />
              </NavigationScroll>
              <Notification />
            </ThemeProvider>
          </StyledEngineProvider>
        </SideSheetProvider>
      </DialogProvider>
    </NotificationProvider>
  );
};

export default App;
