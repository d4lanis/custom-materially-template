import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import { Typography } from '@mui/material';

// project import
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

// ==============================|| MENULIST ||============================== //

const MenuList = ({ collapsed }) => {
  const navItems = menuItem.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} collapsed={collapsed} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return navItems;
};

MenuList.propTypes = {
  collapsed: PropTypes.bool
};

MenuList.defaultProps = {
  collapsed: false
};

export default MenuList;
