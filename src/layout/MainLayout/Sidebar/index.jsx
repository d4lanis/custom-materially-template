import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { useMediaQuery, Divider, Drawer, Grid, Box, IconButton, Tooltip } from '@mui/material';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project import
import MenuList from './MenuList';
import { drawerWidth, miniDrawerWidth } from 'config.js';

// assets
import logo from 'assets/images/logo.svg';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';

// redux
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from 'store/actions';

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
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customization);
  const { sidebarCollapsed } = customization;

  const handleCollapse = () => {
    dispatch({ type: actionTypes.SIDEBAR_COLLAPSED, sidebarCollapsed: !sidebarCollapsed });
  };

  const currentDrawerWidth = sidebarCollapsed ? miniDrawerWidth : drawerWidth;

  const drawer = (
    <>
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
        >
          <Grid item>
            <img src={logo} alt="Logo" />
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <PerfectScrollbar
        style={{
          height: 'calc(100vh - 65px)',
          padding: '10px',
          paddingBottom: sidebarCollapsed ? '70px' : '10px' // Extra padding at bottom when collapsed for the toggle button
        }}
      >
        <MenuList collapsed={sidebarCollapsed} />
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            width: sidebarCollapsed ? `${miniDrawerWidth - 20}px` : `${drawerWidth - 20}px`,
            backgroundColor: theme.palette.background.paper,
            borderTop: `1px solid ${theme.palette.divider}`,
            display: 'flex',
            justifyContent: 'center',
            padding: '10px 0',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen
            })
          }}
        >
          <Tooltip title={sidebarCollapsed ? 'Expand' : 'Collapse'}>
            <IconButton
              color="primary"
              onClick={handleCollapse}
              size="medium"
              sx={{
                backgroundColor: theme.palette.primary.light,
                color: '#fff',
                '&:hover': {
                  backgroundColor: theme.palette.primary.main
                }
              }}
            >
              {sidebarCollapsed ? <MenuIcon /> : <MenuOpenIcon />}
            </IconButton>
          </Tooltip>
        </Box>
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
