import React from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const Contact = () => {
  return (
    <Container sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph>
        Have questions or suggestions? Reach out to us using the form below.
      </Typography>

      <Box component="form" sx={{ mt: 3 }}>
        <TextField fullWidth label="Your Name" margin="normal" required />
        <TextField fullWidth label="Email Address" type="email" margin="normal" required />
        <TextField fullWidth label="Message" multiline rows={4} margin="normal" required />
        <Button variant="contained" sx={{ mt: 2 }}>Send Message</Button>
      </Box>
    </Container>
  );
};

export default Contact;
