import Link from 'next/link';
import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/TranslationsProvider';
import { GraphQLForm } from './components/GraphQLForm/GraphQLForm';

const i18nNamespaces = ['graph', 'common'];

export default async function GraphPage({
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
      <div className="flex">
        <GraphQLForm />
        <Link href="/" className="button">
          {t('common:welcome')}
        </Link>
      </div>
    </TranslationsProvider>
  );
}
