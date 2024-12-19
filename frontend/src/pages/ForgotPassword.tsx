import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import axios from 'axios';

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ open, handleClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('/api/forgot-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('E-mail is not registered.');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Reset Your Password</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Enter your email"
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {message && <p>{message}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleResetPassword} color="primary">
          Reset Password
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPassword;