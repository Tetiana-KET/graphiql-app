import initTranslations from '../i18n';
import WelcomeContent from './_components/Welcome/Welcome';
import UserGreeting from './_components/UserGreeting/UserGreeting';
import WelcomeMainContent from './_components/WelcomeMainContent/WelcomeMainContent';

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
      <WelcomeMainContent t={t} />
      <WelcomeContent />
    </div>
  );
}
