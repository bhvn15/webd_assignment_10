import React, { useState } from 'react';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('/user/login', {
        email: username,
        password: password,
      });

      console.log('✅ Login response:', res.data);

      sessionStorage.setItem('token', res.data.user.id);
      sessionStorage.setItem('user', JSON.stringify(res.data.user));

      alert('Login successful!');
      navigate('/home');
    } catch (error) {
      console.error('🚨 Login failed:', error.response?.data?.error || error.message);
      alert(`Login failed: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={4} sx={{ padding: 4, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login to CareerConnect
        </Typography>

        <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
          <TextField
            label="Email"
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
            sx={{ mb: 3 }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            sx={{ mb: 4 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth size="large">
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
