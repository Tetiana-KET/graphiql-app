'use client';

import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { redirect } from 'next/navigation';

import { auth, logInWithEmailAndPassword, signInWithGoogle } from '@/firebase';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import styles from './page.module.scss';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const { t } = useTranslation();

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
    <div className={styles.login}>
      <div className={styles.loginContainer}>
        <input
          type="text"
          className={styles.loginTextBox}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('auth:mail')}
        />
        <input
          type="password"
          className={styles.loginTextBox}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('auth:pass')}
        />
        <button
          type="button"
          className={styles.loginBtn}
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          {t('layout:signIn')}
        </button>
        <button
          type="button"
          className={`${styles.loginGoogle} ${styles.loginBtn}`}
          onClick={signInWithGoogle}
        >
          {t('layout:signIn')} {t('common:withGoogle')}
        </button>
        <div>
          {t('auth:noAcc')}{' '}
          <Link href="/signUp" className="font-black hover:underline">
            {t('layout:signUp')}
          </Link>
        </div>
      </div>
    </div>
  );
}
