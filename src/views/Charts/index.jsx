import React from 'react';

// material-ui
import { Box, Card, CardContent, CardHeader, Divider, Grid, Typography, useTheme } from '@mui/material';

// project imports
import { gridSpacing } from 'config';

// charts
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

// Sample chart data
const salesData = [
  { month: 'Jan', sales: 4000, target: 4500, lastYear: 3200 },
  { month: 'Feb', sales: 3000, target: 3500, lastYear: 2800 },
  { month: 'Mar', sales: 2000, target: 2500, lastYear: 1800 },
  { month: 'Apr', sales: 2780, target: 2700, lastYear: 2600 },
  { month: 'May', sales: 1890, target: 2100, lastYear: 1750 },
  { month: 'Jun', sales: 2390, target: 2200, lastYear: 2100 },
  { month: 'Jul', sales: 3490, target: 3200, lastYear: 3000 }
];

const trafficData = [
  { name: 'Direct', value: 35 },
  { name: 'Social Media', value: 25 },
  { name: 'Email', value: 20 },
  { name: 'Organic Search', value: 15 },
  { name: 'Referral', value: 5 }
];

const deviceData = [
  { name: 'Desktop', users: 4000, sessions: 2400 },
  { name: 'Mobile', users: 3000, sessions: 1398 },
  { name: 'Tablet', users: 2000, sessions: 980 }
];

const revenueData = [
  { name: 'Jan', revenue: 4000, expenses: 2400, profit: 1600 },
  { name: 'Feb', revenue: 3000, expenses: 1398, profit: 1602 },
  { name: 'Mar', revenue: 2000, expenses: 980, profit: 1020 },
  { name: 'Apr', revenue: 2780, expenses: 1408, profit: 1372 },
  { name: 'May', revenue: 1890, expenses: 1100, profit: 790 },
  { name: 'Jun', revenue: 2390, expenses: 1200, profit: 1190 },
  { name: 'Jul', revenue: 3490, expenses: 1700, profit: 1790 }
];

// Custom colors
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// ==============================|| CHARTS PAGE ||============================== //

const Charts = () => {
  const theme = useTheme();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography variant="h3">Charts</Typography>
        <Typography variant="body2" mt={1}>
          Data visualization examples using Recharts
        </Typography>
      </Grid>

      {/* Line Chart */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title="Sales Performance" />
          <Divider />
          <CardContent>
            <Typography variant="subtitle2" color="textSecondary">
              Monthly sales comparison with targets and last year
            </Typography>
            <Box height={350} mt={2}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={salesData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke={theme.palette.primary.main} activeDot={{ r: 8 }} strokeWidth={2} />
                  <Line type="monotone" dataKey="target" stroke={theme.palette.error.main} strokeDasharray="5 5" strokeWidth={2} />
                  <Line type="monotone" dataKey="lastYear" stroke={theme.palette.grey[500]} strokeWidth={1.5} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Pie Chart */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title="Traffic Sources" />
          <Divider />
          <CardContent>
            <Typography variant="subtitle2" color="textSecondary">
              Distribution of website traffic by source
            </Typography>
            <Box height={350} mt={2} display="flex" justifyContent="center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {trafficData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend layout="vertical" verticalAlign="middle" align="right" />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Bar Chart */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title="Device Usage" />
          <Divider />
          <CardContent>
            <Typography variant="subtitle2" color="textSecondary">
              Users and sessions by device type
            </Typography>
            <Box height={350} mt={2}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={deviceData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" name="Users" fill={theme.palette.primary.main} />
                  <Bar dataKey="sessions" name="Sessions" fill={theme.palette.secondary.main} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Area Chart */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title="Revenue Analysis" />
          <Divider />
          <CardContent>
            <Typography variant="subtitle2" color="textSecondary">
              Monthly revenue, expenses and profit
            </Typography>
            <Box height={350} mt={2}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={revenueData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stackId="1"
                    stroke={theme.palette.success.main}
                    fill={theme.palette.success.light}
                  />
                  <Area type="monotone" dataKey="expenses" stackId="2" stroke={theme.palette.error.main} fill={theme.palette.error.light} />
                  <Area type="monotone" dataKey="profit" stroke={theme.palette.primary.main} fill={theme.palette.primary.light} />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Charts;
