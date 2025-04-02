import React from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Stack,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      {/* Hero Banner with Overlay */}
      <Box
        sx={{
          position: 'relative',
          backgroundImage: 'url(https://source.unsplash.com/1600x500/?career,office)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          py: 10,
          px: 4,
          textAlign: 'center',
        }}
      >
        {/* Dark Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}
        />

        {/* Hero Content */}
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Typography variant="h2" sx={{ fontWeight: 700 }}>
            Welcome to CareerConnect
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Discover your next opportunity with top companies.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
            <Button variant="contained" color="primary" onClick={() => navigate('/jobs')}>
              Browse Jobs
            </Button>
            <Button variant="outlined" color="inherit" onClick={() => navigate('/companies')}>
              Company Showcase
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Info Section */}
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
            Why CareerConnect?
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.2rem', lineHeight: 1.8 }}>
            CareerConnect is your go-to platform to browse curated job postings, learn about top employers, and streamline your job search. 
            Whether you're just starting out or looking to grow in your career, we help you take that next step with confidence.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;
