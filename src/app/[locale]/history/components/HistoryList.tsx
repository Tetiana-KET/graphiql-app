'use client';

import { useTranslation } from 'react-i18next';
import { HistoryService } from '@/services/history';
import { Button } from '@nextui-org/react';
import { RequestHistoryRecord } from '@/models/RequestHistoryRecord';
import { useState } from 'react';
import { EmptyHistory } from './EmptyHistory/EmptyHistory';
import { HistoryRecord } from './HistoryRecord/HistoryRecord';

export default function HistoryList() {
  const { t } = useTranslation();
  const [history, setHistory] = useState<RequestHistoryRecord[]>(
    HistoryService.get(),
  );

  if (!history.length) {
    return <EmptyHistory />;
  }

  const clearHandler = () => {
    HistoryService.clear();
    setHistory([]);
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex gap-2">
        <Button onClick={clearHandler} color="warning">
          {t('common:Clear')}
        </Button>
        <h2 className="self-center text-lg flex-1 flex justify-center">
          {t('history:requestsHistory')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {history
          .sort((a, b) => (a.time < b.time ? -1 : 1))
          .map((record) => (
            <HistoryRecord key={record.id} record={record} />
          ))}
      </div>
    </div>
  );
}
