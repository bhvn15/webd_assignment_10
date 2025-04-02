import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Container,
  CircularProgress,
  Alert,
} from '@mui/material';

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get('/jobs')
      .then(res => {
        setJobs(res.data.jobs);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load jobs');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container sx={{ mt: 10, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 10 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (jobs.length === 0) {
    return (
      <Container sx={{ mt: 10 }}>
        <Alert severity="info">No jobs available right now. Check back later.</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ marginTop: 4, marginBottom: 6 }}>
      <Typography variant="h4" gutterBottom align="center">
        Job Listings
      </Typography>
      <Grid container spacing={4}>
        {jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job._id}>
            <Card
              elevation={4}
              sx={{
                height: '100%',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {job.title}
                </Typography>

                <Typography variant="body2" sx={{ mt: 1, mb: 1 }}>
                  <strong>Company:</strong> {job.company}
                </Typography>

                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Salary:</strong> {job.salary}
                </Typography>

                <Typography variant="body2" sx={{ mb: 2 }}>
                  {job.description.slice(0, 100)}...
                </Typography>

                <Button
                  variant="contained"
                  size="small"
                  fullWidth
                  onClick={() => alert('Apply functionality coming soon')}
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default JobListings;
