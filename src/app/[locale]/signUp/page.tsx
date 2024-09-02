'use client';

import { signInWithGoogle } from '@/firebase';
import { useHandleSignUp } from '@/hooks/useHandleSignUp';
import { Spinner } from '@nextui-org/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '@/components/AuthProvider';
import styles from './page.module.scss';

export default function SignUp() {
  const { isLoggedIn, loading } = useContext(AuthContext) ?? {};
  const { t } = useTranslation();
  const { register, handleSubmit, onSubmit, errors, isValid } =
    useHandleSignUp(t);

  useEffect(() => {
    if (!loading && isLoggedIn) {
      redirect('/');
    }
  }, [isLoggedIn, loading]);

  if (loading) {
    return <Spinner color="secondary" />;
  }

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
