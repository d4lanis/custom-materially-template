import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, Typography, Tooltip } from '@mui/material';

// project import
import NavItem from '../NavItem';
import NavCollapse from '../NavCollapse';

// ==============================|| NAVGROUP ||============================== //

const NavGroup = ({ item, collapsed }) => {
  const theme = useTheme();
  const items = item.children.map((menu) => {
    switch (menu.type) {
      case 'collapse':
        return <NavCollapse key={menu.id} menu={menu} level={1} collapsed={collapsed} />;
      case 'item':
        return <NavItem key={menu.id} item={menu} level={1} collapsed={collapsed} />;
      default:
        return (
          <Typography key={menu.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <List
      subheader={
        !collapsed ? (
          <Typography variant="caption" sx={{ ...theme.typography.menuCaption }} display="block" gutterBottom>
            {item.title}
            {item.caption && (
              <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                {item.caption}
              </Typography>
            )}
          </Typography>
        ) : (
          <Tooltip title={`${item.title}${item.caption ? ` - ${item.caption}` : ''}`} placement="right">
            <Typography
              variant="caption"
              sx={{
                ...theme.typography.menuCaption,
                textAlign: 'center',
                display: 'block',
                width: '100%'
              }}
              noWrap
            >
              {item.title.substring(0, 1)}
            </Typography>
          </Tooltip>
        )
      }
    >
      {items}
    </List>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object,
  collapsed: PropTypes.bool,
  children: PropTypes.object,
  title: PropTypes.string,
  caption: PropTypes.string
};

export default NavGroup;
