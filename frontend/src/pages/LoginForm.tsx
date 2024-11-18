import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import assetsLogin from '../assets/assetsLogin.png';
import logo from '../assets/logo.svg';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, TextField, Typography, Stack, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import './LoginForm.css';
import ForgotPassword from './ForgotPassword';
import { styled } from '@mui/material/styles';

const Card = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
}));

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem("token");

  // If already logged in, redirect to home
  if (loggedIn) {
    navigate("/home");
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false); // State for handling the sign-up modal

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;
    if (!email) {
      setEmailError("Please enter your email.");
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      navigate("/home");
    }
  };

  const handleSignUpOpen = () => setOpenSignUp(true);
  const handleSignUpClose = () => setOpenSignUp(false);

  return (
    <section className="login-page">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Left Section - 70% of the Screen Width */}
        <section className="left-section lg:col-span-7 xl:col-span-8">
          <div className="flex items-center justify-center h-full">
            <img src={assetsLogin} alt="Login Illustration" className="login-image" />
          </div>
        </section>

        {/* Right Section - 30% of the Screen Width */}
        <section className="right-section lg:col-span-5 xl:col-span-4 flex items-center justify-center">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: 4,
              width: '100%',
              gap: 2,
              maxWidth: 450,
              margin: 'auto',
              justifyContent: 'flex-start',
              height: '100vh'
            }}
          >
            <img src={logo} alt="Logo" className="login-logo" />
            <Typography variant="h4" className="login-title" sx={{ textAlign: 'center' }}>
              Login To Your Account
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
              <FormControl fullWidth margin="normal">
                <FormLabel>Email</FormLabel>
                <TextField
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  error={!!emailError}
                  helperText={emailError}
                  fullWidth
                  variant="outlined"
                />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <FormLabel>Password</FormLabel>
                <TextField
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  error={!!passwordError}
                  helperText={passwordError}
                  fullWidth
                  variant="outlined"
                />
              </FormControl>

              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                <FormControlLabel control={<Checkbox color="primary" />} label="Remember me" />
                <Typography sx={{ color: 'blue', cursor: 'pointer' }} onClick={() => setOpenForgotPassword(true)}>
                  Forgot Password
                </Typography>
              </Stack>

              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign in
              </Button>
            </Box>

            <Typography sx={{ textAlign: 'center', mt: 2 }}>
              Don’t have an account?{' '}
              <a href="#" onClick={handleSignUpOpen} style={{ textDecoration: 'none', color: '#3f51b5' }}>
                Sign up
              </a>
            </Typography>
          </Box>
        </section>
      </div>

      {/* Forgot Password Dialog */}
      <ForgotPassword open={openForgotPassword} handleClose={() => setOpenForgotPassword(false)} />

      {/* Sign Up Modal */}
      <Dialog open={openSignUp} onClose={handleSignUpClose}>
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent>
          
            
              
              <Typography
                component="h1"
                variant="h4"
                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
              >
                Sign up
              </Typography>
              <Box
                component="form"
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
              >
                <FormControl>
                  <FormLabel htmlFor="name">Full name</FormLabel>
                  <TextField
                    autoComplete="name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    placeholder="Jon Snow"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    placeholder="your@email.com"
                    name="email"
                    autoComplete="email"
                    variant="outlined"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    placeholder="••••••"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    variant="outlined"
                  />
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                >
                  Sign up
                </Button>
              </Box>
            
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSignUpClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};

export default LoginForm;
