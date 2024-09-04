import { useState, useEffect, useCallback, useContext } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase';
import { AuthContext } from '@/components/AuthProvider';
import { checkErrorInstance } from '@/utils/checkErrorInstance';

export const useFetchUserName = () => {
  const [name, setName] = useState('');
  const { user, loading } = useContext(AuthContext) ?? {};
  const fetchUserName = useCallback(async () => {
    if (user) {
      try {
        const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
      } catch (err) {
        checkErrorInstance(err);
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
