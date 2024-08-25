import Link from 'next/link';
import TranslationsProvider from '@/components/TranslationsProvider';
import WelcomeContent from './_components/Welcome/Welcome';
import initTranslations from '../i18n';

const i18nNamespaces = ['welcome'];

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <div>
        <div>{t('mainHeader')}</div>
        <p>{'  '}</p>
        <WelcomeContent />
        <Link href="/graph" className="button">
          {t('LinkToGraph')}
        </Link>
      </div>
    </TranslationsProvider>
  );
}
