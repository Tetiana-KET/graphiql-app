import Link from 'next/link';
import initTranslations from '../i18n';
import WelcomeContent from './_components/Welcome/Welcome';

const i18nNamespaces = ['welcome'];

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t } = await initTranslations(locale, i18nNamespaces);

  return (
    <div>
      <div>{t('mainHeader')}</div>
      <p>{'  '}</p>
      <WelcomeContent />
      <Link href="/GRAPHQL" className="button">
        {t('LinkToGraph')}
      </Link>
    </div>
  );
}
