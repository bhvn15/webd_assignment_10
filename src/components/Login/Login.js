import React, { useState } from 'react';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice';
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
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('/user/login', {
        email: username,
        password: password,
      });

      console.log("📦 Full response from backend:", res.data);
      const user = res.data.user || {};
      const token = res.data.token;

      console.log("✅ Login Success:", user);
      console.log("🔐 Token:", token);
      console.log("🧭 Redirecting user:", user?.type);

      dispatch(loginSuccess({ user, token }));
      alert('Login successful!');

      if (user.type === 'admin') {
        navigate('/admin');
      } else if (user.type === 'employee') {
        navigate('/jobs');
      } else {
        console.warn("🚨 Unknown user type:", user.type);
        navigate('/');
      }

    } catch (error) {
      console.error('🚨 Login failed:', error.response?.data?.error || error.message);
      alert(`Login failed: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={4} sx={{ padding: 4, borderRadius: 3 }}>
        <Typography variant="h4" color="primary" fontWeight="bold" align="center" gutterBottom>
          Login to CareerConnect
        </Typography>

        <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            fullWidth
            sx={{ fontWeight: 'bold', mt: 2, borderRadius: 2 }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
