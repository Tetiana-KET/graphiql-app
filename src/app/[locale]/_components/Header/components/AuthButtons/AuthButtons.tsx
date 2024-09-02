'use client';

import { Button, NavbarContent, NavbarItem } from '@nextui-org/react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { logout } from '@/firebase';
import { useContext } from 'react';
import { AuthContext } from '@/components/AuthProvider';
import styles from './AuthButtons.module.scss';

function AuthButtons() {
  const { t } = useTranslation();
  const { isLoggedIn } = useContext(AuthContext) ?? {};

  return (
    <NavbarContent justify="end">
      <NavbarItem
        className={`${styles.buttonWrap} ${isLoggedIn ? 'hidden' : ''}`}
      >
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
      <NavbarItem
        className={`${styles.buttonWrap} ${isLoggedIn ? 'hidden' : ''}`}
      >
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

      <NavbarItem
        className={`${styles.buttonWrap} ${!isLoggedIn ? 'hidden' : ''}`}
      >
        <Button
          as={Link}
          color="default"
          href="/"
          variant="flat"
          radius="sm"
          className="lg:flex"
        >
          {t('layout:main')}
        </Button>
      </NavbarItem>

      <NavbarItem
        className={`${styles.buttonWrap} ${!isLoggedIn ? 'hidden' : ''}`}
      >
        <Button
          color="default"
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
