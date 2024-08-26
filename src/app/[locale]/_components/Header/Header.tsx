import initTranslations from '@/app/i18n';
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import Link from 'next/link';
import styles from './Header.module.scss';
import LanguageChanger from '../LanguageChanger/LanguageChanger';
import NavBarLinks from '../NavBar/NavBarLinks';
import { Logo } from './Logo';
import ClientHeaderWrapper from '../ClientHeaderWrapper/ClientHeaderWrapper';

const i18nNamespaces = ['common'];

async function Header({ locale }: { locale: string }) {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return (
    <ClientHeaderWrapper>
      <Navbar isBordered className={styles.header} data-testid="header">
        <NavbarBrand>
          <Link href="/">
            <Logo />
          </Link>
        </NavbarBrand>
        <NavBarLinks />
        <NavbarContent justify="end">
          <NavbarItem>
            <Button as={Link} color="primary" href="auth" variant="flat">
              {t('signIn')}
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              color="primary"
              href="auth"
              variant="flat"
              className="hidden lg:flex"
            >
              {t('signOut')}
            </Button>
          </NavbarItem>
        </NavbarContent>
        <LanguageChanger />
      </Navbar>
    </ClientHeaderWrapper>
  );
}
export default Header;
