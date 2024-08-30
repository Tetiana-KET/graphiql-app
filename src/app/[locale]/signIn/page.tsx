'use client';

import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { redirect } from 'next/navigation';

import { auth, signInWithGoogle } from '@/firebase';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useHandleSignIn } from '@/hooks/useHandleSignIn';
import styles from './page.module.scss';
import Loader from '../_components/Loader/Loader';

export default function SignIn() {
  const [user, loading, error] = useAuthState(auth);
  const { t } = useTranslation();
  const { register, handleSubmit, onSubmit, errors, isValid } =
    useHandleSignIn(t);

  useEffect(() => {
    if (user) {
      redirect('/');
    }

    if (error) {
      // TODO: some error notification
      console.error(error);
    }
  }, [user, error]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.login}>
      <form className={styles.loginContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.loginTextBoxWrap}>
          <input
            type="text"
            className={styles.loginTextBox}
            {...register('email')}
            placeholder={t('auth:mail')}
          />
          <p className={styles.validationError}>
            {errors.email && errors.email.message}
          </p>

          <input
            type="password"
            className={styles.loginTextBox}
            {...register('password')}
            placeholder={t('auth:pass')}
          />

          <p className={styles.validationError}>
            {errors.password && errors.password.message}
          </p>
        </div>

        <button type="submit" className={styles.loginBtn} disabled={!isValid}>
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
      </form>
    </div>
  );
}
