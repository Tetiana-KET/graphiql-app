'use client';

import { useFetchUserName } from '@/hooks/useFetchUserName';
import { capitalizeUserName } from '@/utils/capitalizeUserName';
import { useTranslation } from 'react-i18next';
import Loader from '../Loader/Loader';

function UserGreeting() {
  const { name, loading, user } = useFetchUserName();
  const { t } = useTranslation();

  if (loading) {
    return <Loader />;
  }

  return (
    user && (
      <h1 className="text-lg">
        {t('common:welcome')}{' '}
        <span className="font-semibold">{capitalizeUserName(name)}</span>!
      </h1>
    )
  );
}
export default UserGreeting;
