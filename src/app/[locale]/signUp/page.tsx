'use client';

import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from '@/firebase';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import styles from './page.module.scss';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, loading, error] = useAuthState(auth);

  const register = () => {
    if (!name) {
      // TODO: some notification
    }
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) {
      // TODO trigger a loading screen
      return;
    }

    if (user) {
      redirect('/');
    }

    if (error) {
      // TODO: some error notification
      console.error(error);
    }
  }, [user, loading, error]);

  return (
    <div className={styles.register}>
      <div className={styles.registerContainer}>
        <input
          type="text"
          className={styles.registerTextBox}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className={styles.registerTextBox}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className={styles.registerTextBox}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="button" className={styles.registerBtn} onClick={register}>
          Sign up
        </button>
        <button
          type="button"
          className={`${styles.registerGoogle} ${styles.registerBtn}`}
          onClick={signInWithGoogle}
        >
          Sign up with Google
        </button>
        <div>
          Already have an account? <Link href="/signIn">Sign in</Link> now.
        </div>
      </div>
    </div>
  );
}
