'use client';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
} from '@nextui-org/react';
import Link from 'next/link';
import { useEffect, useReducer, useRef, useState } from 'react';
import styles from './Header.module.scss';
import NavBarLinks from './components/NavBar/NavBarLinks';
import { Logo } from './components/Logo';

import AuthButtons from './components/AuthButtons/AuthButtons';
import NavBarMenuBurger from './components/NavBarMenuBurger/NavBarMenuBurger';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useReducer((current) => !current, false);
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar
      isBordered
      ref={headerRef}
      className={`${styles.header} ${styles.headerWrapper} ${isSticky ? styles.stickyHeader : ''}`}
      classNames={{
        wrapper: 'max-w-[1440px]',
      }}
      data-testid="header"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/">
            <Logo />
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavBarLinks />
      <AuthButtons />
      <NavBarMenuBurger setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
    </Navbar>
  );
}
export default Header;
