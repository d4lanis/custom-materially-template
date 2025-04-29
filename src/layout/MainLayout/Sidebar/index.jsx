import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { useMediaQuery, Divider, Drawer, Grid, Box } from '@mui/material';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project import
import MenuList from './MenuList';
import { drawerWidth, miniDrawerWidth } from 'config.js';

// assets
import logo from 'assets/images/logo-dark.svg';

// redux
import { useSelector } from 'react-redux';

// custom style
const Nav = styled((props) => <nav {...props} />)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    width: drawerWidth,
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  }
}));

// ==============================|| SIDEBAR ||============================== //

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const customization = useSelector((state) => state.customization);
  const { sidebarCollapsed } = customization;

  const currentDrawerWidth = sidebarCollapsed ? miniDrawerWidth : drawerWidth;

  const drawer = (
    <>
      {/* Logo section for all screen sizes */}
      <Box
        sx={{
          display: sidebarCollapsed ? 'none' : 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          p: 1.5,
          ...theme.mixins.toolbar,
          background: theme.palette.background.default
        }}
      >
        <img src={logo} alt="Logo" style={{ height: '36px' }} />
      </Box>
      <Divider />

      {/* Mobile-only header (keeping for backward compatibility) */}
      <Box sx={{ display: { md: 'none', xs: 'block' } }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          elevation={5}
          alignItems="center"
          spacing={0}
          sx={{
            ...theme.mixins.toolbar,
            lineHeight: 0,
            background: theme.palette.primary.main,
            boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
          }}
        ></Grid>
      </Box>
      <PerfectScrollbar
        style={{
          height: 'calc(100vh - 65px)',
          padding: '10px',
          paddingBottom: '10px'
        }}
      >
        <MenuList collapsed={sidebarCollapsed} />
      </PerfectScrollbar>
    </>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Nav
      sx={{
        width: { md: currentDrawerWidth },
        flexShrink: 0,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen
        })
      }}
    >
      <Drawer
        container={container}
        variant={matchUpMd ? 'persistent' : 'temporary'}
        anchor="left"
        open={drawerOpen}
        onClose={drawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: currentDrawerWidth,
            borderRight: 'none',
            boxShadow: '0 0.15rem 1.75rem 0 rgba(33, 40, 50, 0.15)',
            top: { md: 64, sm: 0 },
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen
            })
          }
        }}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </Nav>
  );
};

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.object
};

export default Sidebar;
