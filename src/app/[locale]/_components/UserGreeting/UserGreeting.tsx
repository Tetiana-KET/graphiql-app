'use client';

import { useFetchUserName } from '@/hooks/useFetchUserName';
import { capitalizeUserName } from '@/utils/capitalizeUserName';
import { Spinner } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';

function UserGreeting() {
  const { name, loading, user } = useFetchUserName();
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="flex gap-4">
        <Spinner color="secondary" />
      </div>
    );
  }

  return (
    <h1 className="text-2xl">
      {user ? (
        <>
          {t('common:welcome')}{' '}
          <span className="font-semibold">{capitalizeUserName(name)}</span>!
        </>
      ) : (
        <span className="font-semibold text-secondary">
          {t('welcome:greeting')}
        </span>
      )}
    </h1>
  );
}
export default UserGreeting;
