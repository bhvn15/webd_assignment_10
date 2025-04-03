import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Box, Paper } from '@mui/material';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={4} sx={{ padding: 4, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Admin Dashboard
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/employees')}
          >
            View Employees
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/add-job')}
          >
            Add New Job
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
