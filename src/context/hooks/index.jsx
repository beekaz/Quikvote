import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { storage, db } from '../../Firebase';
// import { storage, db } from 'src/Firebase';
// import { errorAlert } from 'src/utils';

// Get the currently signed-in user
export function getAuthenticated() {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;

      return { user, uid, isSuccess: true };
    } else {
      return { isSuccess: false };
    }
  });
}

export function getProfile() {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user !== null) {
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
    const uid = user.uid;

    return { user, displayName, email, photoURL, emailVerified, uid, isSuccess: true };
  } else {
    return { isSuccess: false };
  }
}

export async function updateMe(formData) {
  const auth = getAuth();
  const { displayName, photo, ...otherData } = formData;

  let photoURL = '';
  if (photo) {
    const photoRef = ref(storage, `photos/${auth.currentUser.uid}`);
    await uploadBytes(photoRef, photo);
    photoURL = await getDownloadURL(photoRef);
  }

  try {
    await updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });

    // Update user data in Firestore
    const userDoc = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(userDoc, {
      ...otherData,
      photo: photoURL,
    });

    console.log('Profile updated!');
  } catch (error) {
    console.error('Error updating profile:', error);
  }
}

// currently signed-in user by using the currentUser property
export function getMe() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const uid = user.uid;
    const email = user.email;
    const displayName = user.displayName;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;

    return { user, uid, email, displayName, photoURL, emailVerified, isSuccess: true };
  } else {
    return { isSuccess: false };
  }
}

export async function getUsers() {
  const snapshot = await db.collection('users').get();
  snapshot.forEach((doc) => {
    // console.log(doc.id, '=>', doc.data());

    return { snapshot, doc };
  });
}

// export async function getCandidates() {
//   const snapshot = await db.collection('candidates').get();
//   snapshot.forEach((doc) => {
//     // console.log(doc.id, '=>', doc.data());

//     return { snapshot, doc };
//   });
// }

// export async function getCandidates() {
//   const [allCandidates, setAllCandidates] = useState([]);

//   const candidatesCollection = collection(db, 'candidates');
//   const snapshot = await getDocs(candidatesCollection);
//   const candidates = snapshot.docs.map((doc) => doc.data());

//   function useFetchCandidates() {
//     useEffect(() => {
//       getCandidates()
//         .then((candidates) => {
//           setAllCandidates(candidates);
//         })
//         .catch((error) => {
//           errorAlert('Error fetching candidates:', error);
//         });
//     }, []);
//   }

//   return candidates;

// }

export function useFetchCandidates() {
  const [allCandidates, setAllCandidates] = useState([]);

  useEffect(() => {
    async function getCandidates() {
      try {
        const candidatesCollection = collection(db, 'candidates');
        const snapshot = await getDocs(candidatesCollection);
        const candidates = snapshot.docs.map((doc) => doc.data());
        setAllCandidates(candidates);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    }

    getCandidates();
  }, []);

  return allCandidates;
}

export function useFetchUsers() {
  const [allCandidates, setAllCandidates] = useState([]);

  useEffect(() => {
    async function getCandidates() {
      try {
        const candidatesCollection = collection(db, 'users');
        const snapshot = await getDocs(candidatesCollection);
        const candidates = snapshot.docs.map((doc) => doc.data());
        setAllCandidates(candidates);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    getCandidates();
  }, []);

  return allCandidates;
}

export function useFetchVotes() {
  const [allCandidates, setAllCandidates] = useState([]);

  useEffect(() => {
    async function getCandidates() {
      try {
        const candidatesCollection = collection(db, 'votes');
        const snapshot = await getDocs(candidatesCollection);
        const candidates = snapshot.docs.map((doc) => doc.data());
        setAllCandidates(candidates);
      } catch (error) {
        console.error('Error fetching votes:', error);
      }
    }

    getCandidates();
  }, []);

  return allCandidates;
}


export function useFetchPolls() {
  const [allCandidates, setAllCandidates] = useState([]);

  useEffect(() => {
    async function getCandidates() {
      try {
        const candidatesCollection = collection(db, 'poll_result');
        const snapshot = await getDocs(candidatesCollection);
        const candidates = snapshot.docs.map((doc) => doc.data());
        setAllCandidates(candidates);
      } catch (error) {
        console.error('Error fetching votes:', error);
      }
    }

    getCandidates();
  }, []);

  return allCandidates;
}
