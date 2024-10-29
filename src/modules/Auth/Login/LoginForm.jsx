import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { auth, db } from '../../../Firebase';
import { errorAlert, successAlert } from '../../../utils';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { setLoginToken, setStoredUser } from '../../../Storage';

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    //   const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setIsLoading(true);

    //     try {
    //       const userCredential = await createUserWithEmailAndPassword(
    //         auth,
    //         formData.email,
    //         formData.password
    //       );
    //       const user = userCredential.user;
    //       const userId = `user${Date.now()}`;

    //       const userData = {
    //         ...formData,
    //         id: userId,
    //       };

    //       await setDoc(doc(db, 'users', user.uid), userData).then(() => {
    //         setIsSuccess(true);
    //         successAlert('registration successful');
    //         navigate('/login');
    //       });
    //     } catch (error) {
    //       console.error('Error registering user:', error);
    //       errorAlert('Error registering user');
    //       setIsSuccess(false);
    //     } finally {
    //       setIsLoading(false);
    //     }
    //   };







    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            const user = userCredential.user;

            if (user) {
                setStoredUser(user);
                successAlert('Logged in successfully');
                setIsSuccess(true);
                const token = await user.getIdToken();
                setLoginToken(token);
            }
        } catch (error) {
            console.error('Error registering user:', error);
            errorAlert('Error Signing in');
            setIsSuccess(false);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={3}>

                <TextField
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    name="email"
                    type="email"
                    label="Email address"
                />

                <TextField
                    name="password"
                    label="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    type={showPassword ? 'text' : 'password'}
                    // InputProps={{
                    //     endAdornment: (
                    //         <InputAdornment position="end">
                    //             <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    //                 {/* <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} /> */}
                    //             </IconButton>
                    //         </InputAdornment>
                    //     ),
                    // }}
                />
            </Stack>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ my: 2 }}
            ></Stack>
            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading}>
                Log In
            </LoadingButton>
        </form>
    );
}
