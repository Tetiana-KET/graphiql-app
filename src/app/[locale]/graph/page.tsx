import Link from 'next/link';
import { GraphQLForm } from './components/GraphQLForm/GraphQLForm';

export default function GraphPage() {
  return (
    <div className="flex">
      <GraphQLForm />
      <Link href="/" className="button">
        {' '}
        Welcome
      </Link>
    </div>
  );
}
