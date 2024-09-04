'use client';

import { GraphQLRequestHistoryRecord } from '@/models/FormInterfaces';
import { getRequestHistory } from '@/utils/getRequestHistory';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyHistory } from './components/EmptyHistory/EmptyHistory';
import { HistoryRecord } from './components/HistoryRecord/HistoryRecord';

export default function HistoryPage() {
  const { t } = useTranslation();
  const [requestsHistory, setRequestsHistory] = useState<
    GraphQLRequestHistoryRecord[]
  >([]);

  useEffect(() => {
    const history = getRequestHistory();
    setRequestsHistory(history);
  }, []);

  if (requestsHistory.length === 0) {
    return <EmptyHistory />;
  }

  return (
    <div className="flex flex-col gap-4 mt-4">
      <h2 className="self-center text-lg">{t('history:requestsHistory')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {requestsHistory.map((record) => (
          <HistoryRecord key={record.requestTime} record={record} />
        ))}
      </div>
    </div>
  );
}
