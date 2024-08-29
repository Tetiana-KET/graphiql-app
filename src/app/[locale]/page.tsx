import WelcomeContent from './_components/Welcome/Welcome';
import initTranslations from '../i18n';
import UserGreeting from './_components/UserGreeting/UserGreeting';

const i18nNamespaces = ['welcome'];

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t } = await initTranslations(locale, i18nNamespaces);

  return (
    <div className="welcome-wrapper">
      <UserGreeting />
      <div>{t('mainHeader')}</div>
      <p>{'  '}</p>
      <WelcomeContent />
    </div>
  );
}
