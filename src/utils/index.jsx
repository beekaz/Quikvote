import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { getLoginToken } from '../Storage';
// import { AxiosError } from "axios";

const SERVER_ERROR = 'An unexpected error occurred. Please try again.';

const LoginError = 'Invalid Email or Password';
const UPDATE_PROFILE_ERROR = 'Please update your profile with a valid address and phone number.';

const DELETE_USER = 'User deleted successfully';

export const getDecodedJWT = () => {
  try {
    const token = getLoginToken();
    const decoded = jwtDecode(token);
    return decoded;
  } catch (e) {
    return null;
  }
};

export const isAuthenticated = () => {
  try {
    const token = getLoginToken();
    if (token) {
      const decode = getDecodedJWT(token);
      if (decode) {
        const { exp } = decode;
        const currentTime = Date.now() / 1000;
        return exp > currentTime;
      }
    }
    return false;
  } catch (e) {
    return false;
  }
};


const toastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const successAlert = (msg) => {
  toast.success(msg || 'Successfully created', toastOptions);
};



export const errorAlert = (error) => {
  console.log('Error Response:', error.response);

  let err = SERVER_ERROR;

  if (error?.response?.data?.error) {
    const errorData = error.response.data.error;

    if (errorData.message === 'EMAIL_EXISTS') {
      err = 'Email already exists';
    } else if (errorData.errors) {
      const emailExistsError = errorData.errors.find((err) => err.message === 'EMAIL_EXISTS');
      if (emailExistsError) {
        err = 'Email already exists';
      } else {
        err = errorData.message || SERVER_ERROR;
      }
    } else {
      err = errorData.message || SERVER_ERROR;
    }
  }

  toast.error(err, toastOptions);
};

export const errorProfile = (error) => {
  const err =
    error?.response?.data?.detail || error?.response?.data
      ? error?.response?.data?.detail || error?.response?.data?.error
      : UPDATE_PROFILE_ERROR;
  toast.error(err, toastOptions);
};

export const deleteUser = (error) => {
  const success =
    error?.response?.data?.detail || error?.response?.data
      ? error?.response?.data?.detail || error?.response?.data?.error
      : DELETE_USER;
  toast.success(success, toastOptions);
};

export const LoginErr = (error) => {
  const err = error?.data?.detail || error?.data ? error?.data?.detail || error?.data : LoginError;
  toast.error(err, toastOptions);
};

// STUB: convert image to base64
export function dataURLtoFile(dataurl, filename) {
  var arr = dataurl?.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}
