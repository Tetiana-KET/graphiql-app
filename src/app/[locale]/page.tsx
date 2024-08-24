import Link from 'next/link';
import WelcomeContent from './_components/Welcome/Welcome';

export default async function WelcomePage() {
  return (
    <div>
      <div> I am MAIN DEFAULT page, laying in [locale]</div>
      <p>{'  '}</p>
      <WelcomeContent />
      <Link href="/graph" className="button">
        {' '}
        Graph
      </Link>
    </div>
  );
}
