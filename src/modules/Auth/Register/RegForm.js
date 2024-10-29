import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Iconify from '../../../components/iconify';
import { auth, db } from '../../../Firebase';
import { errorAlert, successAlert } from 'src/utils';

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone_number: '',
    fullname: '',
    role: 'User',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePhoneInput = (event) => {
    const { name, value } = event.target;
    const phonePattern = /^[0-9]{10}$/;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === 'phone_number' && value.length === 10 && !phonePattern.test(value)) {
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      const userId = `user${Date.now()}`;

      const userData = {
        ...formData,
        id: userId,
      };

      await setDoc(doc(db, 'users', user.uid), userData).then(() => {
        setIsSuccess(true);
        successAlert('registration successful');
        navigate('/login');
      });
    } catch (error) {
      console.error('Error registering user:', error);
      errorAlert('Error registering user');
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          value={formData.fullname}
          onChange={handleInputChange}
          required
          name="fullname"
          type="text"
          label="Enter your Full Name"
        />
        <TextField
          value={formData.email}
          onChange={handleInputChange}
          required
          name="email"
          type="email"
          label="Email address"
        />
        <TextField
          value={formData.phone_number}
          onChange={handlePhoneInput}
          required
          name="phone_number"
          type="tel"
          label="Phone Number"
          inputProps={{ pattern: '[0-9]*' }}
        />
        <TextField
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      ></Stack>
      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading}>
        Sign Up
      </LoadingButton>
    </form>
  );
}
