import React, { createContext, useEffect, useState } from 'react';
import {
  browserLocalPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useQueryClient } from '@tanstack/react-query';
// import { setStoredUser } from 'src/Storage';
import { db } from '../Firebase';
import { setStoredUser } from '../Storage';
// import { db } from 'src/Firebase';

export const AuthContext = createContext({
  user: '',
  email: '',
  token: '',
  role: '',
  isAuthenticated: false,
  loading: true,
  authenticate: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState('');
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);

  const queryClient = useQueryClient();
  const auth = getAuth();

  async function logout() {
    try {
      await auth.signOut();
      setUser(null);
      setAuthToken(null);
      setStoredUser(null);
      localStorage.clear();
      queryClient.invalidateQueries();
      window.location.reload();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).then(() => {});

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      try {
        if (firebaseUser) {
          const token = await firebaseUser.getIdToken();
          setAuthToken(token);

          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({ ...firebaseUser, ...userData });
            setStoredUser({ ...firebaseUser, ...userData });
            localStorage.setItem('user', JSON.stringify({ ...firebaseUser, ...userData })); // Store user data in local storage
          } else {
            console.log('No user document found');
            setUser(firebaseUser);
            setStoredUser(firebaseUser);
            localStorage.setItem('user', JSON.stringify(firebaseUser)); // Store user data in local storage
          }
        } else {
          setUser(null);
          setAuthToken(null);
        }
      } catch (error) {
        console.error('Error in onAuthStateChanged:', error);
        setUser(null);
        setAuthToken(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user'); // Retrieve user data from local storage
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function authenticate(token) {
    setAuthToken(token);
  }

  const value = {
    user: user,
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
