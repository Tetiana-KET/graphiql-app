import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export const useFetchUserName = () => {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState('');

  const fetchUserName = useCallback(async () => {
    if (user) {
      try {
        const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
      } catch (err) {
        console.error(err);
        setName('Incognito');
      }
    }
  }, [user]);

  useEffect(() => {
    if (!loading) {
      fetchUserName();
    }
  }, [user, loading, fetchUserName]);

  return { name, loading, user };
};
