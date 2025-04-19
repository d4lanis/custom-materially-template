import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Typography, ListItemIcon, ListItemText, Collapse, List, ListItemButton, Tooltip } from '@mui/material';

// project import
import NavItem from '../NavItem';

// assets
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// ==============================|| NAV COLLAPSE ||============================== //

const NavCollapse = ({ menu, level, collapsed }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);

  const handleClick = () => {
    setOpen(!open);
    setSelected(!selected ? menu.id : null);
  };

  const menus = menu.children.map((item) => {
    switch (item.type) {
      case 'collapse':
        return <NavCollapse key={item.id} menu={item} level={level + 1} collapsed={collapsed} />;
      case 'item':
        return <NavItem key={item.id} item={item} level={level + 1} collapsed={collapsed} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  const Icon = menu.icon;
  const menuIcon = menu.icon ? <Icon /> : <ArrowForwardIcon fontSize={level > 0 ? 'inherit' : 'default'} />;

  const listItemContent = (
    <>
      <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : '25px', mr: collapsed ? 0 : 'auto' }}>{menuIcon}</ListItemIcon>
      {!collapsed && (
        <ListItemText
          primary={
            <Typography variant={selected === menu.id ? 'subtitle1' : 'body1'} color="inherit" sx={{ pl: 1.9 }}>
              {menu.title}
            </Typography>
          }
          secondary={
            menu.caption && (
              <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption, pl: 2 }} display="block" gutterBottom>
                {menu.caption}
              </Typography>
            )
          }
        />
      )}
      {!collapsed && (open ? <ExpandLess sx={{ fontSize: '1rem' }} /> : <ExpandMore sx={{ fontSize: '1rem' }} />)}
    </>
  );

  return (
    <>
      {collapsed ? (
        <>
          <Tooltip title={menu.title} placement="right">
            <ListItemButton
              sx={{
                borderRadius: '5px',
                mb: 0.6,
                pl: `${level * 8}px`,
                pr: '8px',
                justifyContent: 'center',
                ...(level > 1 && { backgroundColor: 'transparent !important', py: 1, borderRadius: '5px' })
              }}
              selected={selected === menu.id}
              onClick={handleClick}
            >
              {listItemContent}
            </ListItemButton>
          </Tooltip>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {menus}
            </List>
          </Collapse>
        </>
      ) : (
        <>
          <ListItemButton
            sx={{
              borderRadius: '5px',
              mb: 0.6,
              pl: `${level * 16}px`,
              ...(level > 1 && { backgroundColor: 'transparent !important', py: 1, borderRadius: '5px' })
            }}
            selected={selected === menu.id}
            onClick={handleClick}
          >
            {listItemContent}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {menus}
            </List>
          </Collapse>
        </>
      )}
    </>
  );
};

NavCollapse.propTypes = {
  menu: PropTypes.object,
  level: PropTypes.number,
  collapsed: PropTypes.bool,
  title: PropTypes.string,
  icon: PropTypes.string,
  id: PropTypes.string,
  children: PropTypes.string
};

export default NavCollapse;
