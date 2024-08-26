'use client';

import { Button, NavbarContent, NavbarItem } from '@nextui-org/react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import styles from './AuthButtons.module.scss';

function AuthButtons() {
  const { t } = useTranslation();
  const [isHidden, setIsHidden] = useState();
  return (
    <NavbarContent justify="end">
      <NavbarItem className={styles.buttonWrap}>
        <Button
          as={Link}
          color="default"
          href="/auth"
          variant="flat"
          radius="sm"
        >
          {t('signIn')}
        </Button>
      </NavbarItem>

      <NavbarItem className={styles.buttonWrap}>
        <Button
          as={Link}
          color="default"
          href="/"
          variant="flat"
          radius="sm"
          className="lg:flex"
        >
          {t('signOut')}
        </Button>
      </NavbarItem>
    </NavbarContent>
  );
}
export default AuthButtons;
