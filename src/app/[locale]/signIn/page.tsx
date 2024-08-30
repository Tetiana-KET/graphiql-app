'use client';

import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { redirect } from 'next/navigation';

import { auth, logInWithEmailAndPassword, signInWithGoogle } from '@/firebase';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInFormInputs } from '@/models/AuthInterfaces';
import { createSignInSchema } from '@/validation/signInSchema';
import styles from './page.module.scss';

export default function SignIn() {
  const [user, loading, error] = useAuthState(auth);
  const { t } = useTranslation();
  const signInSchema = createSignInSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInFormInputs>({
    resolver: zodResolver(signInSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      await logInWithEmailAndPassword(data.email, data.password);
    } catch (err) {
      console.error(err);
    }
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
          disabled={!isValid}
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
