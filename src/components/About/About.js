import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const About = () => {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom align="center">
            About CareerConnect
          </Typography>

          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            CareerConnect is a modern job portal built to bridge the gap between job seekers and top companies. 
            It provides a clean, intuitive interface to explore job listings, learn about organizations, and apply confidently.
          </Typography>

          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            This platform is part of a front-end web development project demonstrating React fundamentals like routing, 
            component structuring, session management, and dynamic rendering — with integration to a Node.js backend.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default About;
