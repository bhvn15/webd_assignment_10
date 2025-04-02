import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  Box,
} from "@mui/material";

const CompanyShowcase = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // Static mock data
    setCompanies([
      { name: "Google", image: "https://logo.clearbit.com/google.com" },
      { name: "Amazon", image: "https://logo.clearbit.com/amazon.com" },
      { name: "Microsoft", image: "https://logo.clearbit.com/microsoft.com" },
      { name: "Facebook", image: "https://logo.clearbit.com/facebook.com" },
      { name: "Netflix", image: "https://logo.clearbit.com/netflix.com" },
      { name: "Airbnb", image: "https://logo.clearbit.com/airbnb.com" },
    ]);
  }, []);

  return (
    <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh', py: 6 }}>
      <Container>
        <Typography variant="h4" gutterBottom align="center">
          Company Showcase
        </Typography>
        <Grid container spacing={4}>
          {companies.map((company, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  maxWidth: 345,
                  mx: 'auto',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={company.image}
                  alt={company.name}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    align="center"
                    sx={{ fontWeight: 600 }}
                  >
                    {company.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CompanyShowcase;
