import { Navbar, NavbarBrand } from '@nextui-org/react';
import Link from 'next/link';
import styles from './Header.module.scss';
import LanguageChanger from '../LanguageChanger/LanguageChanger';
import NavBarLinks from './components/NavBar/NavBarLinks';
import { Logo } from './components/Logo';
import ClientHeaderWrapper from './components/ClientHeaderWrapper/ClientHeaderWrapper';
import AuthButtons from './components/AuthButtons/AuthButtons';

function Header() {
  return (
    <ClientHeaderWrapper>
      <Navbar isBordered className={styles.header} data-testid="header">
        <NavbarBrand>
          <Link href="/">
            <Logo />
          </Link>
        </NavbarBrand>
        <NavBarLinks />
        <AuthButtons />
        <LanguageChanger />
      </Navbar>
    </ClientHeaderWrapper>
  );
}
export default Header;
