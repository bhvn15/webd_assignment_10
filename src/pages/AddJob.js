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
  const { token } = useSelector((state) => state.auth); // ✅ Get token from Redux

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
          Authorization: `Bearer ${token}` // ✅ Secure the request
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
      <Typography variant="h5" gutterBottom>Add New Job</Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Company"
          name="company"
          fullWidth
          margin="normal"
          value={form.company}
          onChange={handleChange}
        />
        <TextField
          label="Job Title"
          name="title"
          fullWidth
          margin="normal"
          value={form.title}
          onChange={handleChange}
        />
        <TextField
          label="Description"
          name="description"
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
          fullWidth
          margin="normal"
          value={form.salary}
          onChange={handleChange}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          fullWidth
        >
          Post Job
        </Button>
      </Box>

      {/* Success Snackbar */}
      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
        <Alert severity="success" onClose={() => setSuccess(false)}>
          Job posted successfully!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar open={!!error} autoHideDuration={3000} onClose={() => setError('')}>
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default AddJob;
