import React, { useState } from 'react';

// material-ui
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Avatar,
  IconButton,
  TextField,
  InputAdornment
} from '@mui/material';

// project imports
import { gridSpacing } from 'config';
import { useSideSheet } from 'contexts/SideSheetContext';
import UserForm from './UserForm';

// icons
import SearchIcon from '@mui/icons-material/Search';
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const { openSideSheet, closeSideSheet } = useSideSheet();

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter users based on search term
  const filteredUsers = sampleUsers.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Get current page of users
  const currentUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography variant="h3">Users Management</Typography>
        <Typography variant="body2" mt={1}>
          Manage users, assign roles, and monitor user activity
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h4">Users</Typography>
                <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddUser}>
                  Add User
                </Button>
              </Box>
            }
          />
          <Divider />
          <CardContent>
            <Box mb={3}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search users by name, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Join Date</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentUsers.map((user) => (
                    <TableRow key={user.id} hover>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Avatar src={user.avatar} alt={user.name} sx={{ mr: 2 }} />
                          <Box>
                            <Typography variant="subtitle1">{user.name}</Typography>
                            <Typography variant="body2" color="textSecondary">
                              {user.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Chip label={user.status} color={user.status === 'Active' ? 'success' : 'default'} size="small" />
                      </TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell align="center">
                        <IconButton color="info" size="small" title="View">
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                        <IconButton color="primary" size="small" title="Edit">
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton color="error" size="small" title="Delete">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={filteredUsers.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Users;
