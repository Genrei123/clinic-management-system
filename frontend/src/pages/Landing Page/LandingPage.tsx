import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Box,
  Card,
  CardContent,
  Link,
} from "@mui/material";

const LandingPage: React.FC = () => {
  // Example data for branches
  const branches = [
    {
      name: "Branch 1",
      address: "123 Main Street, City A",
      fbLink: "https://facebook.com/branch1",
      mapLink: "https://www.google.com/maps?q=123+Main+Street,+City+A",
    },
    {
      name: "Branch 2",
      address: "456 Elm Street, City B",
      fbLink: "https://facebook.com/branch2",
      mapLink: "https://www.google.com/maps?q=456+Elm+Street,+City+B",
    },
    {
      name: "Branch 3",
      address: "789 Oak Street, City C",
      fbLink: "https://facebook.com/branch3",
      mapLink: "https://www.google.com/maps?q=789+Oak+Street,+City+C",
    },
  ];

  return (
    <div style={{ backgroundColor: "#0A1929", color: "#FFFFFF", minHeight: "100vh" }}>
      {/* Navbar */}
      <AppBar position="sticky" style={{ backgroundColor: "#0A1929" }} elevation={2}>
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            ClinicName
          </Typography>
          <Box>
            <Button color="inherit" style={{ marginRight: "1rem" }}>
              About Us
            </Button>
            <Button color="inherit" style={{ marginRight: "1rem" }}>
              Locations
            </Button>
            <Button
              variant="outlined"
              style={{ color: "#FFFFFF", borderColor: "#FFFFFF" }}
              onClick={() => (window.location.href = "/login")} // Navigates to Login Page
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container style={{ textAlign: "center", padding: "4rem 0" }}>
        <Typography variant="h3" style={{ fontWeight: 700, marginBottom: "1rem" }}>
          Welcome to <span style={{ color: "#2196F3" }}>Our Clinic</span>
        </Typography>
        <Typography variant="h6" style={{ marginBottom: "2rem" }}>
          Providing cutting-edge healthcare solutions tailored to your needs.
        </Typography>
        <Button
          variant="contained"
          style={{ backgroundColor: "#2196F3", color: "#FFFFFF" }}
          href="https://facebook.com/clinicpage" // Replace with your Facebook page link
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact Us on Facebook
        </Button>
      </Container>

      {/* Mission, Vision, and Locations Section */}
      <Container style={{ padding: "2rem 0" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box
              style={{
                backgroundColor: "#102A43",
                padding: "2rem",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              <Typography variant="h5" style={{ fontWeight: 600, marginBottom: "1rem" }}>
                Our Mission
              </Typography>
              <Typography>
                To provide high-quality, accessible healthcare services to the community.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              style={{
                backgroundColor: "#102A43",
                padding: "2rem",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              <Typography variant="h5" style={{ fontWeight: 600, marginBottom: "1rem" }}>
                Our Vision
              </Typography>
              <Typography>
                To become the leading clinic, recognized for innovative and compassionate care.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              style={{
                backgroundColor: "#102A43",
                padding: "2rem",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              <Typography variant="h5" style={{ fontWeight: 600, marginBottom: "1rem" }}>
                Locations
              </Typography>
              <Typography>
                Find us in multiple locations across the city for your convenience.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Branches Section */}
      <Container style={{ padding: "2rem 0" }}>
        <Typography variant="h4" style={{ textAlign: "center", marginBottom: "2rem" }}>
          Our Branches
        </Typography>
        <Grid container spacing={4}>
          {branches.map((branch, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card style={{ backgroundColor: "#102A43", color: "#FFFFFF" }}>
                <CardContent>
                  <Typography variant="h6" style={{ fontWeight: 600, marginBottom: "0.5rem" }}>
                    {branch.name}
                  </Typography>
                  <Typography variant="body2" style={{ marginBottom: "1rem" }}>
                    {branch.address}
                  </Typography>
                  <Box style={{ display: "flex", justifyContent: "space-between" }}>
                    <Link
                      href={branch.fbLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#2196F3" }}
                    >
                      Visit Facebook
                    </Link>
                    <Button
                      variant="outlined"
                      size="small"
                      style={{ color: "#FFFFFF", borderColor: "#FFFFFF" }}
                      href={branch.mapLink}
                      target="_blank"
                    >
                      Get Location
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box style={{ backgroundColor: "#102A43", padding: "1rem", textAlign: "center" }}>
        <Typography variant="body2">&copy; 2024 ClinicName. All rights reserved.</Typography>
      </Box>
    </div>
  );
};

export default LandingPage;
