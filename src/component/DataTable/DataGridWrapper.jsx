import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Paper, useTheme } from '@mui/material';

const NoRows = () => (
  <Box sx={{ textAlign: 'center', p: 4 }}>
    <Typography variant="h6" color="text.secondary">
      No data available
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Try adjusting your filters
    </Typography>
  </Box>
);

const DataGridWrapper = ({ columns, rows, pageSize = 10, checkboxSelection = false, loading = false, onRowClick, sx = {} }) => {
  const theme = useTheme();

  return (
    <Paper sx={{ width: '100%', height: '100%', overflow: 'hidden', ...sx }}>
      <DataGrid
        rows={rows}
        columns={useMemo(() => columns, [columns])}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 25, 50]}
        checkboxSelection={checkboxSelection}
        disableRowSelectionOnClick={!checkboxSelection}
        onRowClick={onRowClick}
        loading={loading}
        slots={{
          noRowsOverlay: NoRows
        }}
        sx={{
          border: 'none',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette.background.paper,
            borderBottom: `1px solid ${theme.palette.divider}`
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: theme.palette.background.paper,
            borderTop: `1px solid ${theme.palette.divider}`
          },
          '& .MuiDataGrid-row:nth-of-type(even)': {
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50]
          },
          ...sx
        }}
      />
    </Paper>
  );
};

DataGridWrapper.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  pageSize: PropTypes.number,
  checkboxSelection: PropTypes.bool,
  loading: PropTypes.bool,
  onRowClick: PropTypes.func,
  sx: PropTypes.object
};

export default React.memo(DataGridWrapper);
