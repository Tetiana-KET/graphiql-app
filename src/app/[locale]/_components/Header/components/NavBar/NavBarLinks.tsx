'use client';

import { NavbarContent, NavbarItem } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import { navigationList } from '@/consts/navigationList';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import styles from './NavBarLinks.module.scss';
import LanguageDropDown from '../../../LanguageDropDown/LanguageDropDown';

interface NavigationListItem {
  id: string;
  title: string;
  path: string;
}

function NavBarLinks() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [isLogged] = useState(false);

  return (
    <NavbarContent className="hidden sm:flex gap-0" justify="center">
      {navigationList.map((item: NavigationListItem) => {
        const isActive = pathname === item.path;
        return (
          <NavbarItem
            key={item.id}
            className={`${isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
              ${!isLogged ? 'hidden' : ''}`}
          >
            <Link href={item.path} aria-current={isActive ? 'page' : undefined}>
              {t(`layout:${item.title}`)}
            </Link>
          </NavbarItem>
        );
      })}
      <LanguageDropDown />
    </NavbarContent>
  );
}
export default NavBarLinks;
