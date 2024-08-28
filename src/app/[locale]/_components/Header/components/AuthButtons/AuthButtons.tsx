'use client';

import { Button, NavbarContent, NavbarItem } from '@nextui-org/react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '@/firebase';
import styles from './AuthButtons.module.scss';

function AuthButtons() {
  const { t } = useTranslation();
  const [user] = useAuthState(auth);

  return (
    <NavbarContent justify="end">
      <NavbarItem className={`${styles.buttonWrap} ${user ? 'hidden' : ''}`}>
        <Button
          as={Link}
          color="default"
          href="/signIn"
          variant="flat"
          radius="sm"
        >
          {t('layout:signIn')}
        </Button>
      </NavbarItem>
      <NavbarItem className={`${styles.buttonWrap} ${user ? 'hidden' : ''}`}>
        <Button
          as={Link}
          color="default"
          href="/signUp"
          variant="flat"
          radius="sm"
        >
          {t('layout:signUp')}
        </Button>
      </NavbarItem>

      <NavbarItem className={`${styles.buttonWrap} ${!user ? 'hidden' : ''}`}>
        <Button
          as={Link}
          color="default"
          href="/"
          variant="flat"
          radius="sm"
          className="lg:flex"
          onClick={logout}
        >
          {t('layout:signOut')}
        </Button>
      </NavbarItem>
    </NavbarContent>
  );
}
export default AuthButtons;
