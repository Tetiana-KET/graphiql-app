import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export function EmptyHistory() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4 mt-4 w-full flex-1">
      <h2 className="self-center text-lg">
        {t('history:emptyHistoryMessage')}
      </h2>

      <div className="flex gap-6 justify-center">
        <Button as={Link} href="/graphql" color="secondary" size="lg">
          GraphQl
        </Button>
        <Button as={Link} href="/rest" color="secondary" size="lg">
          Rest
        </Button>
      </div>
    </div>
  );
}
