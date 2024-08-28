'use client';

import { Button, NavbarContent, NavbarItem } from '@nextui-org/react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import styles from './AuthButtons.module.scss';

function AuthButtons() {
  const { t } = useTranslation();
  const [isLogged] = useState(false);

  return (
    <NavbarContent justify="end">
      <NavbarItem
        className={`${styles.buttonWrap} ${isLogged ? styles.buttonWrapHidden : ''}`}
      >
        <Button
          as={Link}
          color="default"
          href="/auth"
          variant="flat"
          radius="sm"
        >
          {t('layout:signIn')}
        </Button>
      </NavbarItem>

      <NavbarItem
        className={`${styles.buttonWrap} ${!isLogged ? styles.buttonWrapHidden : ''}`}
      >
        <Button
          as={Link}
          color="default"
          href="/"
          variant="flat"
          radius="sm"
          className="lg:flex"
        >
          {t('layout:signOut')}
        </Button>
      </NavbarItem>
    </NavbarContent>
  );
}
export default AuthButtons;
