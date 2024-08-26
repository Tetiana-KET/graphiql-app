import initTranslations from '@/app/i18n';
import styles from './Footer.module.scss';

const i18nNamespaces = ['layout'];

async function Footer({ locale }: { locale: string }) {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return (
    <footer className={styles.footer} data-testid="footer">
      <div className={styles.footerContainer}>
        <h2>{t('footerHeader')} 🐾</h2>
      </div>
    </footer>
  );
}
export default Footer;
