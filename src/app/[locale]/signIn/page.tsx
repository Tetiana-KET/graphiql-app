'use client';

import { redirect } from 'next/navigation';
import { useContext, useEffect } from 'react';

import { signInWithGoogle } from '@/firebase';
import { useHandleSignIn } from '@/hooks/useHandleSignIn';
import { Spinner } from '@nextui-org/react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '@/components/AuthProvider';
import styles from './page.module.scss';

export default function SignIn() {
  const { isLoggedIn, loading } = useContext(AuthContext) ?? {};
  const { t } = useTranslation();
  const { register, handleSubmit, onSubmit, errors, isValid } =
    useHandleSignIn(t);

  useEffect(() => {
    if (!loading && isLoggedIn) {
      redirect('/');
    }
  }, [isLoggedIn, loading]);

  if (loading) {
    return <Spinner color="secondary" />;
  }

  return (
    <div className={styles.login} data-testid="signInPage">
      <form className={styles.loginContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.loginTextBoxWrap}>
          <input
            type="text"
            className={styles.loginTextBox}
            {...register('email')}
            placeholder={t('auth:mail')}
            data-testid="loginTextBox"
          />
          <p className={styles.validationError}>
            {errors.email && errors.email.message}
          </p>

          <input
            type="password"
            className={styles.loginTextBox}
            {...register('password')}
            placeholder={t('auth:pass')}
            data-testid="loginPass"
          />

          <p className={styles.validationError}>
            {errors.password && errors.password.message}
          </p>
        </div>

        <button
          type="submit"
          className={styles.loginBtn}
          disabled={!isValid}
          data-testid="loginBtn"
        >
          {t('layout:signIn')}
        </button>
        <button
          type="button"
          className={`${styles.loginGoogle} ${styles.loginBtn}`}
          onClick={signInWithGoogle}
          data-testid="signInWithGoogle"
        >
          {t('layout:signIn')} {t('common:withGoogle')}
        </button>
        <div>
          {t('auth:noAcc')}{' '}
          <Link
            href="/signUp"
            className="font-black hover:underline"
            data-testid="signInLink"
          >
            {t('layout:signUp')}
          </Link>
        </div>
      </form>
    </div>
  );
}
