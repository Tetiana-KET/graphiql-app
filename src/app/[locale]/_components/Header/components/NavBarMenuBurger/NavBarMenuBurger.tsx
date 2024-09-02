'use client';

import { usePathname } from 'next/navigation';
import { navigationList } from '@/consts/navigationList';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { NavbarMenu, NavbarMenuItem } from '@nextui-org/react';
import { NavigationListItem } from '@/models/NavigationListItem';
import { useContext } from 'react';
import { AuthContext } from '@/components/AuthProvider';
import styles from './NavBarMenuBurger.module.scss';
import LanguageDropDown from '../../../LanguageDropDown/LanguageDropDown';

interface NavBarMenuBurgerProps {
  setIsMenuOpen: (open: boolean) => void;
  isMenuOpen: boolean;
}

function NavBarMenuBurger({
  setIsMenuOpen,
  isMenuOpen,
}: NavBarMenuBurgerProps) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext?.isLoggedIn;

  return (
    <NavbarMenu className={`${styles.navBarMenuBurger} pt-8 gap-0`}>
      {navigationList.map((item: NavigationListItem) => {
        const isActive = pathname === item.path;
        return (
          <NavbarMenuItem
            onClick={() => {
              setIsMenuOpen(isMenuOpen);
            }}
            key={item.id}
            className={`h-[var(--navbar-height)] ${
              isActive
                ? `${styles.navBurgerLink} ${styles.active}`
                : styles.navBurgerLink
            } 
                ${!isLoggedIn ? 'hidden' : ''}`}
          >
            <Link
              href={item.path}
              aria-current={isActive ? 'page' : undefined}
              className="w-full"
            >
              {t(`layout:${item.title}`)}
            </Link>
          </NavbarMenuItem>
        );
      })}
      <LanguageDropDown />
    </NavbarMenu>
  );
}
export default NavBarMenuBurger;
