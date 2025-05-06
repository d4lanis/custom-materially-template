/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from 'react';

// material-ui
import { Box, Button, Chip, Typography, Avatar, IconButton, TextField, InputAdornment, Paper } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

import { useTheme } from '@mui/material/styles';
import { useSideSheet } from 'contexts/SideSheetContext';
import UserForm from './UserForm';
import DataGridWrapper from 'component/DataTable/DataGridWrapper';

// icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Sample user data
const sampleUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'Active',
    avatar: '/src/assets/images/users/avatar-1.jpg',
    joinDate: '10 Jan 2023'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Editor',
    status: 'Active',
    avatar: '/src/assets/images/users/avatar-2.jpg',
    joinDate: '22 Mar 2023'
  },
  {
    id: 3,
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    role: 'User',
    status: 'Inactive',
    avatar: '/src/assets/images/users/avatar-3.jpg',
    joinDate: '15 Apr 2023'
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    role: 'User',
    status: 'Active',
    avatar: '/src/assets/images/users/avatar-4.jpg',
    joinDate: '8 Jun 2023'
  },
  {
    id: 5,
    name: 'Michael Wilson',
    email: 'michael.wilson@example.com',
    role: 'Editor',
    status: 'Active',
    avatar: '/src/assets/images/users/avatar-1.jpg',
    joinDate: '30 Jul 2023'
  },
  {
    id: 6,
    name: 'Sarah Thompson',
    email: 'sarah.thompson@example.com',
    role: 'User',
    status: 'Inactive',
    avatar: '/src/assets/images/users/avatar-2.jpg',
    joinDate: '12 Aug 2023'
  },
  {
    id: 7,
    name: 'David Martinez',
    email: 'david.martinez@example.com',
    role: 'Admin',
    status: 'Active',
    avatar: '/src/assets/images/users/avatar-3.jpg',
    joinDate: '5 Oct 2023'
  },
  {
    id: 8,
    name: 'Jessica Brown',
    email: 'jessica.brown@example.com',
    role: 'User',
    status: 'Active',
    avatar: '/src/assets/images/users/avatar-4.jpg',
    joinDate: '18 Nov 2023'
  }
];

// ==============================|| USERS PAGE ||============================== //

const Users = () => {
  const theme = useTheme();
  const HEADER_HEIGHT = 136; // or get from theme.mixins.toolbar.minHeight
  const SAFE_MARGIN = theme.spacing(8); // 64px
  const paperHeight = `calc(100dvh - ${HEADER_HEIGHT + parseInt(SAFE_MARGIN)}px)`;
  const { openSideSheet, closeSideSheet } = useSideSheet();
  const [searchText, setSearchText] = useState('');
  const [rows, setRows] = useState(sampleUsers);

  // Handle search input change
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);
    const filtered = sampleUsers.filter((user) => Object.values(user).some((field) => String(field).toLowerCase().includes(value)));
    setRows(filtered);
  };

  // Handle opening the Add User side sheet
  const handleAddUser = () => {
    openSideSheet({
      title: 'Add User',
      content: (
        <UserForm
          onSubmit={(userData) => {
            // In a real app, you would add the user to your database here
            console.log('Adding user:', userData);
            closeSideSheet();
          }}
          onCancel={closeSideSheet}
        />
      ),
      width: 500
    });
  };

  // Handle row click for viewing user details
  const handleRowClick = (params) => {
    console.log('Row clicked:', params.row);
    // You could implement view user details functionality here
  };

  // Define columns for the data grid
  const columns = [
    {
      field: 'user',
      headerName: 'User',
      flex: 2,
      renderCell: (params) => (
        <Box display="flex" alignItems="center">
          <Avatar src={params.row.avatar} alt={params.row.name} sx={{ mr: 2 }} />
          <Box>
            <Typography variant="subtitle1">{params.row.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {params.row.email}
            </Typography>
          </Box>
        </Box>
      ),
      sortable: false
    },
    { field: 'role', headerName: 'Role', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => <Chip label={params.row.status} color={params.row.status === 'Active' ? 'success' : 'default'} size="small" />
    },
    { field: 'joinDate', headerName: 'Join Date', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: () => (
        <Box display="flex" justifyContent="center">
          <IconButton color="info" size="small" title="View">
            <VisibilityIcon fontSize="small" />
          </IconButton>
          <IconButton color="primary" size="small" title="Edit">
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton color="error" size="small" title="Delete">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      )
    }
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        height: paperHeight, // adjust to exclude header height (64px top bar + 32px margin)
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden', // prevent Paper-level scroll
        borderRadius: 3,
      }}
    >
      {/* Header + Controls */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          mb: 2
        }}
      >
        <Box sx={{ minWidth: 200 }}>
          <Typography variant="h3" sx={{ whiteSpace: 'nowrap' }}>
            Users Management
          </Typography>
          <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
            Manage users, assign roles, and monitor user activity
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flex: 1, gap: 2, justifyContent: 'flex-end' }}>
          <TextField
            placeholder="Search users..."
            value={searchText}
            onChange={handleSearch}
            sx={{
              minWidth: 250,
              '& .MuiInputBase-root': {
                height: 40
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddUser}
            sx={{ height: 40, whiteSpace: 'nowrap' }}
          >
            Add User
          </Button>
          <Button variant="contained" color="error" disabled startIcon={<DeleteIcon />} sx={{ height: 40, whiteSpace: 'nowrap' }}>
            Delete All
          </Button>
        </Box>
      </Box>

      {/* DataGrid fills remaining height */}
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <DataGridWrapper columns={columns} rows={rows} pageSize={5} checkboxSelection onRowClick={handleRowClick} sx={{ height: '100%' }} />
      </Box>
    </Paper>
  );
};

export default Users;
