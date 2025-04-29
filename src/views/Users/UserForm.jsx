/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// material-ui
import { Box, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

// project imports
import { gridSpacing } from 'config';

// ==============================|| USER FORM ||============================== //

const UserForm = ({ onSubmit, onCancel }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    role: 'User',
    status: 'Active'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });

    if (errors[event.target.name]) {
      setErrors({
        ...errors,
        [event.target.name]: ''
      });
    }
  };

  const validate = () => {
    const tempErrors = {};
    if (!values.name) tempErrors.name = 'Name is required';
    if (!values.email) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      tempErrors.email = 'Email is invalid';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      onSubmit && onSubmit(values);
    }
  };

  return (
    <Box display="flex" flexDirection="column" height="100%">
      {/* Scrollable Form */}
      <Box component="form" onSubmit={handleSubmit} flexGrow={1} overflow="auto" pl={2} pr={2} pb={2}>
        <Grid container spacing={2} gap={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Enter user details below</Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="role-label">Role</InputLabel>
              <Select labelId="role-label" id="role" name="role" value={values.role} onChange={handleChange} label="Role">
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Editor">Editor</MenuItem>
                <MenuItem value="User">User</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select labelId="status-label" id="status" name="status" value={values.status} onChange={handleChange} label="Status">
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Box display="flex" justifyContent="flex-end" gap={2} p={2} marginBottom="auto">
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          CANCEL
        </Button>
        <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
          SAVE USER
        </Button>
      </Box>
    </Box>
  );
};

UserForm.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func
};

export default UserForm;
