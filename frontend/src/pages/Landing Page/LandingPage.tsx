import React, { useState } from "react";
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
  Tabs,
  Tab,
} from "@mui/material";

const NavButton: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Button
    color="inherit"
    sx={{
      mx: 1,
      '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' },
      textTransform: 'none',
    }}
  >
    {children}
  </Button>
);

const InfoBox: React.FC<{ title: string; content: string }> = ({ title, content }) => (
  <Box
    sx={{
      backgroundColor: "#102A43",
      p: 4,
      borderRadius: 2,
      textAlign: "center",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
      '&:hover': {
        transform: "translateY(-5px)",
        boxShadow: 3
      }
    }}
  >
    <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
      {title}
    </Typography>
    <Typography>{content}</Typography>
  </Box>
);

const BranchCard: React.FC<{
  name: string;
  address: string;
  fbLink: string;
  mapLink: string;
}> = ({ name, address, fbLink, mapLink }) => (
  <Card sx={{
    backgroundColor: "#102A43",
    color: "#FFFFFF",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.3s ease-in-out",
    '&:hover': {
      transform: "translateY(-5px)"
    }
  }}>
    <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        {name}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, flexGrow: 1 }}>
        {address}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link
          href={fbLink}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: "#2196F3", '&:hover': { textDecoration: "underline" } }}
        >
          Visit Facebook
        </Link>
        <Button
          variant="outlined"
          size="small"
          sx={{
            color: "#FFFFFF",
            borderColor: "#FFFFFF",
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' }
          }}
          href={mapLink}
          target="_blank"
        >
          Get Location
        </Button>
      </Box>
    </CardContent>
  </Card>
);

const LandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

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

  const infoBoxes = [
    { title: "Our Mission", content: "To provide high-quality, accessible healthcare services to the community." },
    { title: "Our Vision", content: "To become the leading clinic, recognized for innovative and compassionate care." },
    { title: "Locations", content: "Find us in multiple locations across the city for your convenience." },
  ];

  return (
    <Box sx={{ backgroundColor: "#0A1929", color: "#FFFFFF", minHeight: "100vh" }}>
      <AppBar position="sticky" sx={{ backgroundColor: "#0A1929", boxShadow: 3 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", letterSpacing: 1 }}>
            ClinicName
          </Typography>
          <Box>
            <NavButton>About Us</NavButton>
            <NavButton>Locations</NavButton>
            <Button
              variant="outlined"
              sx={{
                color: "#FFFFFF",
                borderColor: "#FFFFFF",
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' },
                textTransform: 'none',
              }}
              onClick={() => (window.location.href = "/login")}
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
          Welcome to <Box component="span" sx={{ color: "#2196F3" }}>Our Clinic</Box>
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, maxWidth: "800px", mx: "auto" }}>
          Providing cutting-edge healthcare solutions tailored to your needs.
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2196F3",
            color: "#FFFFFF",
            py: 1.5,
            px: 4,
            fontSize: "1.1rem",
            '&:hover': { backgroundColor: '#1976D2' },
            textTransform: 'none',
          }}
          href="https://facebook.com/clinicpage"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact Us on Facebook
        </Button>
      </Container>

      <Container sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {infoBoxes.map((box, index) => (
            <Grid item xs={12} md={4} key={index}>
              <InfoBox title={box.title} content={box.content} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container sx={{ py: 6 }}>
        <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
          Our Branches
        </Typography>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          centered
          sx={{
            mb: 4,
            '& .MuiTab-root': {
              color: '#FFFFFF',
              '&.Mui-selected': {
                color: '#2196F3',
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#2196F3',
            },
          }}
        >
          {branches.map((branch, index) => (
            <Tab key={index} label={branch.name} />
          ))}
        </Tabs>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <BranchCard {...branches[activeTab]} />
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ backgroundColor: "#102A43", py: 3, textAlign: "center" }}>
        <Typography variant="body2">&copy; 2024 ClinicName. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default LandingPage;