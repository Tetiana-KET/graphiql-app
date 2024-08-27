import Link from 'next/link';
import WelcomeContent from './_components/Welcome/Welcome';
import initTranslations from '../i18n';

const i18nNamespaces = ['welcome'];

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t } = await initTranslations(locale, i18nNamespaces);

  return (
    <div className="welcome-wrapper">
      <div>{t('mainHeader')}</div>
      <p>{'  '}</p>
      <WelcomeContent />
      <Link href="/graph" className="button">
        {t('LinkToGraph')}
      </Link>
    </div>
  );
}
