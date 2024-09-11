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
    <NavbarContent justify="end" data-testid="navbarContent">
      <NavbarItem
        data-testid="signIn"
        className={`${styles.buttonWrap} ${isLoggedIn ? 'hidden' : ''}`}
      >
        <Button
          as={Link}
          color="default"
          href="/signIn"
          variant="flat"
          radius="sm"
          className="text-xs px-2 sm:text-base sm:px-4"
        >
          {t('layout:signIn')}
        </Button>
      </NavbarItem>
      <NavbarItem
        data-testid="signUp"
        className={`${styles.buttonWrap} ${isLoggedIn ? 'hidden' : ''}`}
      >
        <Button
          as={Link}
          color="default"
          href="/signUp"
          variant="flat"
          radius="sm"
          className="text-xs px-2 sm:text-base sm:px-4"
        >
          {t('layout:signUp')}
        </Button>
      </NavbarItem>

      <NavbarItem
        data-testid="toMain"
        className={`${styles.buttonWrap} ${!isLoggedIn ? 'hidden' : ''}`}
      >
        <Button
          as={Link}
          color="default"
          href="/"
          variant="flat"
          radius="sm"
          className="lg:flex text-xs px-2 sm:text-base sm:px-4"
        >
          {t('layout:main')}
        </Button>
      </NavbarItem>

      <NavbarItem
        data-testid="signOut"
        className={`${styles.buttonWrap} ${!isLoggedIn ? 'hidden' : ''}`}
      >
        <Button
          color="default"
          variant="flat"
          radius="sm"
          className="lg:flex text-xs px-2 sm:text-base sm:px-4"
          onClick={logout}
        >
          {t('layout:signOut')}
        </Button>
      </NavbarItem>
    </NavbarContent>
  );
}
export default AuthButtons;
