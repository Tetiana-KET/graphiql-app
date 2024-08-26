'use client';

import { NavbarContent, NavbarItem } from '@nextui-org/react';
import { usePathname } from 'next/navigation'; // Updated import for Next.js 13+
import { navigationList } from '@/consts/navigationList';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import styles from './NavBarLinks.module.css';

interface NavigationListItem {
  id: string;
  title: string;
  path: string;
}

function NavBarLinks() {
  const { t } = useTranslation();
  const pathname = usePathname(); // Use usePathname instead of useRouter

  return (
    <NavbarContent className="hidden sm:flex gap-0" justify="center">
      {navigationList.map((item: NavigationListItem) => {
        const isActive = pathname === item.path;
        return (
          <NavbarItem
            key={item.id}
            className={
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            <Link href={item.path} aria-current={isActive ? 'page' : undefined}>
              {t(`layout:${item.title}`)}
            </Link>
          </NavbarItem>
        );
      })}
    </NavbarContent>
  );
}
export default NavBarLinks;
