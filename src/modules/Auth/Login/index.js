// import * as React from 'react';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import { useState } from 'react';
// import {
//   alpha,
//   Card,
//   Divider,

//   IconButton,
//   InputAdornment,
//   Stack,
//   useTheme,
//   Link,
// } from '@mui/material';
// import { Link as RouterLink } from 'react-router-dom';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { errorAlert, successAlert } from 'src/utils';
// import { setLoginToken, setStoredUser } from 'src/Storage';
// import { bgGradient } from '../../../utils/cssStyles';
// import { LoadingButton } from '@mui/lab';
// import Iconify from 'src/components/iconify';
// import bg4 from '../../../assets/background/overlay_4.jpg';
// import { auth } from 'src/Firebase';

// export default function SignIn() {
//   // const [user, setUser] = React.useState(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = React.useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);

//   const theme = useTheme();

//   const [formData, setFormData] = React.useState({
//     email: '',
//     password: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         formData.email,
//         formData.password
//       );

//       const user = userCredential.user;

//       if (user) {
//         setStoredUser(user);
//         successAlert('Logged in successfully');
//         setIsSuccess(true);
//         const token = await user.getIdToken();
//         setLoginToken(token);
//       }
//     } catch (error) {
//       console.error('Error registering user:', error);
//       errorAlert('Error Signing in');
//       setIsSuccess(false);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const renderForm = (
//     <>
//       <form onSubmit={handleSubmit}>
//         <Stack spacing={3}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             autoFocus
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             value={formData.password}
//             onChange={handleInputChange}
//             autoComplete="current-password"
//             type={showPassword ? 'text' : 'password'}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
//                     <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Stack>

//         <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
//           <FormControlLabel
//             control={<Checkbox value="remember" color="primary" />}
//             label="Remember me"
//           />
//           <Link to="/forget-password" variant="body2" underline="hover" component={RouterLink}>
//             Forgot password?
//           </Link>
//         </Stack>

//         <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading}>
//           Sign In
//         </LoadingButton>
//       </form>
//     </>
//   );

//   return (
//     <Box
//       sx={{
//         ...bgGradient({
//           color: alpha(theme.palette.background.default, 0.9),
//           imgUrl: bg4,
//         }),
//         height: 1,
//       }}
//     >
//       <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
//         <Card
//           sx={{
//             p: 5,
//             width: 1,
//             maxWidth: 420,
//           }}
//         >
//           <Typography variant="h5">Sign in to proceed</Typography>

//           <Typography variant="body2" sx={{ mb: 3, mt: 1 }}>
//             Dont't have an account? {''}
//             <Link to="/register" variant="subtitle2" component={RouterLink}>
//               Get Started
//             </Link>
//           </Typography>

//           <Divider sx={{ my: 3 }}></Divider>

//           {renderForm}
//         </Card>
//       </Stack>
//     </Box>
//   );
// }



































import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Card } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import useResponsive from 'src/hooks/useResponsive';
import RegisterForm from './RegForm';
import signUp from '../../../assets/illustration.png';
import LoginForm from './LoginForm';


const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  // boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 500,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function SignIn() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <Stack alignItems="center" justifyContent="center">
              <Card
                sx={{
                  p: 5,
                  width: 1,
                  maxWidth: 510,
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Register as a user{' '}
                </Typography>

                <Typography variant="body2" sx={{ mb: 3 }}>
                  Not here? {''}
                  <Link to="/" variant="subtitle2" component={RouterLink}>
                    Go back
                  </Link>
                </Typography>

                <Divider sx={{ my: 3 }}></Divider>

                <LoginForm />
              </Card>
            </Stack>
          </StyledContent>
        </Container>
        {mdUp && (
          <StyledSection>
            <Typography variant="h5" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, You're Welcome!
            </Typography>
            <img src={signUp} alt="Sign-up" />
          </StyledSection>
        )}
      </StyledRoot>
    </>
  );
}
