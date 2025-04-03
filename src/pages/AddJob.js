import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import API from '../services/api';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Snackbar,
  Alert
} from '@mui/material';

const AddJob = () => {
  const [form, setForm] = useState({
    company: '',
    title: '',
    description: '',
    salary: ''
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { token } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.company || !form.title || !form.description || !form.salary) {
      setError('All fields are required');
      return;
    }

    try {
      await API.post('/create/job', form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSuccess(true);
      setForm({ company: '', title: '', description: '', salary: '' });
    } catch (err) {
      console.error('❌ Job creation failed:', err);
      setError('Job creation failed');
    }
  };

  return (
    <Paper elevation={4} sx={{ padding: 4, mt: 5, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
        Add New Job
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Company"
          name="company"
          variant="outlined"
          fullWidth
          margin="normal"
          value={form.company}
          onChange={handleChange}
        />
        <TextField
          label="Job Title"
          name="title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={form.title}
          onChange={handleChange}
        />
        <TextField
          label="Description"
          name="description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={form.description}
          onChange={handleChange}
        />
        <TextField
          label="Salary"
          name="salary"
          variant="outlined"
          fullWidth
          margin="normal"
          value={form.salary}
          onChange={handleChange}
        />

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ mt: 2, borderRadius: 2, fontWeight: 'bold' }}
          fullWidth
        >
          Post Job
        </Button>
      </Box>

      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
        <Alert severity="success" onClose={() => setSuccess(false)}>
          Job posted successfully!
        </Alert>
      </Snackbar>

      <Snackbar open={!!error} autoHideDuration={3000} onClose={() => setError('')}>
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default AddJob;
