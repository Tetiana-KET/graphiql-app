'use client';

import { useFetchUserName } from '@/hooks/useFetchUserName';
import { capitalizeUserName } from '@/utils/capitalizeUserName';
import { Spinner } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';

function UserGreeting() {
  const { name, loading, user } = useFetchUserName();
  const { t } = useTranslation();

  if (loading) {
    return <Spinner color="secondary" data-testid="spinner" />;
  }

  return (
    <h1
      className="text-base sm:text-2xl text-center"
      data-testid="userGreeting"
    >
      {user ? (
        <span className="text-secondary">
          {t('common:welcome')}{' '}
          <span data-testid="userName" className="font-semibold">
            {capitalizeUserName(name)}
          </span>
          !
        </span>
      ) : (
        <span className="font-semibold text-secondary" data-testid="greeting">
          {t('welcome:greeting')}
        </span>
      )}
    </h1>
  );
}
export default UserGreeting;
