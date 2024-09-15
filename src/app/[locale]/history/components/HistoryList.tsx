'use client';

import { useTranslation } from 'react-i18next';
import { Button, Switch } from '@nextui-org/react';
import { RequestHistoryRecord } from '@/models/RequestHistoryRecord';
import { useEffect, useState } from 'react';
import { useHistory } from '@/hooks/useHistory';
import { EmptyHistory } from './EmptyHistory/EmptyHistory';
import { HistoryRecord } from './HistoryRecord/HistoryRecord';

const sortByTime = (a: RequestHistoryRecord, b: RequestHistoryRecord) =>
  a.time < b.time ? -1 : 1;

const sortByDate = (a: RequestHistoryRecord, b: RequestHistoryRecord) =>
  a.date < b.date ? -1 : 1;

export default function HistoryList() {
  const { t } = useTranslation();
  const { get, clear } = useHistory();
  const [history, setHistory] = useState<RequestHistoryRecord[]>([]);
  const [isDate, setIsDate] = useState(true);

  useEffect(() => {
    setHistory(get());
  }, [get]);

  if (!history.length) {
    return <EmptyHistory />;
  }

  const clearHandler = () => {
    clear();
    setHistory([]);
  };

  return (
    <div className="flex flex-col gap-4 mt-4 w-full flex-1">
      <div className="flex gap-2">
        <div className="flex-1">
          <Button onClick={clearHandler} color="warning">
            {t('common:Clear')}
          </Button>
        </div>

        <h2 className="self-center text-lg flex-1 flex justify-center">
          {t('history:requestsHistory')}
        </h2>

        <div className="flex items-center justify-end gap-1 flex-1">
          {t('history:sortBy')}
          {': '}
          {isDate ? t('history:requestDate') : t('history:requestTime')}
          <Switch isSelected={isDate} onValueChange={setIsDate} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {history.sort(isDate ? sortByDate : sortByTime).map((record) => (
          <HistoryRecord key={record.id} record={record} />
        ))}
      </div>
    </div>
  );
}
