import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

// project imports
import GlobalSideSheet from 'component/SideSheet/GlobalSideSheet';

// Create the side sheet context
const SideSheetContext = createContext(null);

// SideSheet provider component
export const SideSheetProvider = ({ children }) => {
  const [sideSheetConfig, setSideSheetConfig] = useState({
    open: false,
    title: '',
    content: null,
    onClose: () => {},
    width: 400
  });

  // Function to open side sheet with custom configuration
  const openSideSheet = (config) => {
    setSideSheetConfig({ ...sideSheetConfig, open: true, ...config });
  };

  // Function to close the side sheet
  const closeSideSheet = () => {
    setSideSheetConfig({ ...sideSheetConfig, open: false });
    if (sideSheetConfig.onClose) {
      sideSheetConfig.onClose();
    }
  };

  return (
    <SideSheetContext.Provider value={{ openSideSheet, closeSideSheet }}>
      {children}
      <GlobalSideSheet
        open={sideSheetConfig.open}
        onClose={closeSideSheet}
        title={sideSheetConfig.title}
        content={sideSheetConfig.content}
        width={sideSheetConfig.width}
      />
    </SideSheetContext.Provider>
  );
};

SideSheetProvider.propTypes = {
  children: PropTypes.node
};

// Custom hook to use the side sheet context
export const useSideSheet = () => {
  const context = useContext(SideSheetContext);
  if (!context) {
    throw new Error('useSideSheet must be used within a SideSheetProvider');
  }
  return context;
};
