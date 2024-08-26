import initTranslations from '@/app/i18n';
import styles from './Header.module.scss';
import LanguageChanger from '../LanguageChanger/LanguageChanger';

const i18nNamespaces = ['layout'];

async function Header({ locale }: { locale: string }) {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return (
    <header className={styles.header} data-testid="header">
      <div className={styles.headerContainer}>
        <h1>{t('headerHeader')} 🐈</h1>
        <LanguageChanger />
      </div>
    </header>
  );
}
export default Header;
