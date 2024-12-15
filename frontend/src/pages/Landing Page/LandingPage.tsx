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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";

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
    { title: "Our Mission", content: "Dedicated in rendering quality healthcare services, establishing cooperative relationships with healthcare professionals and promotion of wellness through health and awareness in enriching the quality of life in the community." },
    { title: "Our Vision", content: "Envisions a partnership between healthcare providers and community dedicated to achieving excellence in health services and outcomes." },
  ];

  const carouselImages = [
    image1,
    image2,
    image3
  ];

  const sliderSettings = {
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true as const,
  };

  return (
    <Box sx={{ backgroundColor: "#0A1929", color: "#FFFFFF", minHeight: "100vh" }}>
      <AppBar position="sticky" sx={{ backgroundColor: "#0A1929", boxShadow: 3 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", letterSpacing: 1 }}>
            JIMIRENE MATERNITY CLINIC
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

      {/* Hero Section with Carousel */}
      <Box sx={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <Slider {...sliderSettings}>
          {carouselImages.map((imgSrc, index) => (
            <Box
              key={index}
              sx={{
                backgroundImage: `url(${imgSrc})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                width: "100%"
              }}
            >
              {/* Overlay for better text visibility */}
              <Box sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.5)"
              }} />

              {/* Hero Content */}
              <Container sx={{ 
                textAlign: "center", 
                height: "100%", 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center",
                position: "relative",
                zIndex: 1
              }}>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: "#FFFFFF" }}>
                  Welcome to <Box component="span" sx={{ color: "#2196F3" }}>JIMIRENE Maternity Clinic</Box>
                </Typography>
                <Typography variant="h6" sx={{ mb: 4, maxWidth: "800px", mx: "auto", color: "#FFFFFF" }}>
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
                    alignSelf: "center"
                  }}
                  href="https://web.facebook.com/profile.php?id=100083275475984"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact Us on Facebook
                </Button>
              </Container>
            </Box>
          ))}
        </Slider>
      </Box>

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
        <Typography variant="body2">2024 &copy; JIMIRENE Diagnostic and Midwifery Clinic. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default LandingPage;
