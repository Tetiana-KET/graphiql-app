import { NavbarContent, NavbarItem } from '@nextui-org/react';

import { navigationList } from '@/consts/navigationList';
import Link from 'next/link';
import styles from './NavBarLinks.module.css';

interface NavigationListItem {
  id: string;
  title: string;
  path: string;
}

function NavBarLinks() {
  return (
    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      {navigationList.map((item: NavigationListItem) => {
        return (
          <NavbarItem key={item.id} className={styles.navLink}>
            <Link href={item.path} aria-current="page">
              {item.title}
            </Link>
          </NavbarItem>
        );
      })}
    </NavbarContent>
  );
}
export default NavBarLinks;
