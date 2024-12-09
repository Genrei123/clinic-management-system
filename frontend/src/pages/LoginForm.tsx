import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import assetsLogin from '../assets/assetsLogin.png';
import logo from '../assets/logo.svg';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, TextField, Typography, Stack } from '@mui/material';
import './LoginForm.css';
import ForgotPassword from './ForgotPassword';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { setUserRole } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [openForgotPassword, setOpenForgotPassword] = useState(false);

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
      const role = email.includes('admin') ? 'admin' : 'employee';
      setUserRole(role);
      localStorage.setItem("token", "dummy_token");
      localStorage.setItem("userRole", role);
      navigate("/home");
    }
  };

  return (
    <section className="login-page">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="left-section lg:col-span-7 xl:col-span-8">
          <div className="flex items-center justify-center h-full">
            <img src={assetsLogin} alt="Login Illustration" className="login-image" />
          </div>
        </section>

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
          </Box>
        </section>
      </div>

      <ForgotPassword open={openForgotPassword} handleClose={() => setOpenForgotPassword(false)} />
    </section>
  );
};

export default LoginForm;

