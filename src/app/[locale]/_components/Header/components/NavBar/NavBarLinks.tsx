'use client';

import { NavbarContent, NavbarItem } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import { navigationList } from '@/consts/navigationList';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { AuthContext } from '@/components/AuthProvider';
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
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext?.isLoggedIn;

  return (
    <NavbarContent
      className="hidden sm:flex gap-0"
      justify="center"
      data-testid="navBarLinks"
    >
      {navigationList.map((item: NavigationListItem) => {
        const isActive = pathname.includes(item.path);
        return (
          <NavbarItem
            data-testid={item.title}
            key={item.id}
            className={`${isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
              ${!isLoggedIn ? 'hidden' : ''}`}
          >
            <Link
              href={item.path}
              aria-current={isActive ? 'page' : undefined}
              className="h-full w-full flex items-center justify-center"
            >
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
