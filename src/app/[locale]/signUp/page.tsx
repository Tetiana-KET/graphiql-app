'use client';

import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from '@/firebase';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { createSignUpSchema } from '@/validation/signUpSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpFormInputs } from '@/models/AuthInterfaces';
import styles from './page.module.scss';

export default function SignUp() {
  const [user, loading, error] = useAuthState(auth);
  const { t } = useTranslation();
  const signUpSchema = createSignUpSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: {
    email: string;
    password: string;
    name: string;
  }) => {
    try {
      registerWithEmailAndPassword(data.name, data.email, data.password);
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
    <div className={styles.register}>
      <form
        className={styles.registerContainer}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.registerTextBoxWrap}>
          <input
            type="text"
            className={styles.registerTextBox}
            {...register('name')}
            placeholder={t('auth:name')}
          />
          <p className={styles.validationError}>
            {errors.name && errors.name.message}
          </p>
          <input
            type="text"
            className={styles.registerTextBox}
            {...register('email')}
            placeholder={t('auth:mail')}
          />
          <p className={styles.validationError}>
            {errors.email && errors.email.message}
          </p>

          <input
            type="password"
            className={styles.registerTextBox}
            {...register('password')}
            placeholder={t('auth:pass')}
          />

          <p className={styles.validationError}>
            {errors.password && errors.password.message}
          </p>
        </div>
        <button
          type="submit"
          className={styles.registerBtn}
          disabled={!isValid}
        >
          {t('layout:signUp')}
        </button>
        <button
          disabled={!isValid}
          type="button"
          className={`${styles.registerGoogle} ${styles.registerBtn}`}
          onClick={signInWithGoogle}
        >
          {t('layout:signUp')} {t('common:withGoogle')}
        </button>
        <div>
          {t('auth:haveAcc')}{' '}
          <Link href="/signIn" className="font-black hover:underline">
            {t('layout:signIn')}
          </Link>{' '}
        </div>
      </form>
    </div>
  );
}
