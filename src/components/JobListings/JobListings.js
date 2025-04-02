import React from 'react';
import jobPosts from '../../data/jobPosts';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Container,
  Chip,
  Stack,
} from '@mui/material';

const JobListings = () => {
  return (
    <Container sx={{ marginTop: 4, marginBottom: 6 }}>
      <Typography variant="h4" gutterBottom align="center">
        Job Listings
      </Typography>
      <Grid container spacing={4}>
        {jobPosts.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
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
                  <strong>Salary:</strong> {job.salary}
                </Typography>

                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Required Skills:</strong>
                </Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mb: 2 }}>
                  {job.skills.map((skill, i) => (
                    <Chip key={i} label={skill} size="small" color="primary" />
                  ))}
                </Stack>

                <Typography variant="caption" display="block" gutterBottom sx={{ mb: 2 }}>
                  {job.lastUpdated}
                </Typography>

                <Button
                  variant="contained"
                  size="small"
                  fullWidth
                  href={job.applyLink}
                  target="_blank"
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
