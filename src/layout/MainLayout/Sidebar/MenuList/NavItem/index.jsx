import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography, Tooltip } from '@mui/material';

// third party
import { useSelector, useDispatch } from 'react-redux';

// project import
import * as actionTypes from 'store/actions';

// assets
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// ==============================|| NAV ITEM ||============================== //

const NavItem = ({ item, level, collapsed }) => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const dispatch = useDispatch();
  const Icon = item.icon;
  const itemIcon = item.icon ? <Icon color="inherit" /> : <ArrowForwardIcon color="inherit" fontSize={level > 0 ? 'inherit' : 'default'} />;

  let itemTarget = '';
  if (item.target) {
    itemTarget = '_blank';
  }
  let listItemProps = { component: Link, to: item.url };
  if (item.external) {
    listItemProps = { component: 'a', href: item.url };
  }

  const itemHandler = () => {
    dispatch({ type: actionTypes.MENU_OPEN, isOpen: item.id });
  };

  const listItemContent = (
    <>
      <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : 25, marginRight: collapsed ? 0 : 'auto' }}>{itemIcon}</ListItemIcon>
      {!collapsed && (
        <ListItemText
          primary={
            <Typography sx={{ pl: 1.4 }} variant={customization.isOpen === item.id ? 'subtitle1' : 'body1'} color="inherit">
              {item.title}
            </Typography>
          }
          secondary={
            item.caption && (
              <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption, pl: 2 }} display="block" gutterBottom>
                {item.caption}
              </Typography>
            )
          }
        />
      )}
      {item.chip && !collapsed && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </>
  );

  return (
    <>
      {collapsed ? (
        <Tooltip title={item.title} placement="right">
          <ListItemButton
            disabled={item.disabled}
            sx={{
              ...(level > 1 && { backgroundColor: 'transparent !important', py: 1, borderRadius: '5px' }),
              borderRadius: '5px',
              marginBottom: '5px',
              pl: `${level * 8}px`,
              pr: '8px',
              justifyContent: 'center'
            }}
            selected={customization.isOpen === item.id}
            component={Link}
            onClick={itemHandler}
            to={item.url}
            target={itemTarget}
            {...listItemProps}
          >
            {listItemContent}
          </ListItemButton>
        </Tooltip>
      ) : (
        <ListItemButton
          disabled={item.disabled}
          sx={{
            ...(level > 1 && { backgroundColor: 'transparent !important', py: 1, borderRadius: '5px' }),
            borderRadius: '5px',
            marginBottom: '5px',
            pl: `${level * 16}px`
          }}
          selected={customization.isOpen === item.id}
          component={Link}
          onClick={itemHandler}
          to={item.url}
          target={itemTarget}
          {...listItemProps}
        >
          {listItemContent}
        </ListItemButton>
      )}
    </>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
  collapsed: PropTypes.bool,
  icon: PropTypes.object,
  target: PropTypes.object,
  url: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  title: PropTypes.string,
  caption: PropTypes.string,
  chip: PropTypes.object,
  color: PropTypes.string,
  label: PropTypes.string,
  avatar: PropTypes.object
};

export default NavItem;
