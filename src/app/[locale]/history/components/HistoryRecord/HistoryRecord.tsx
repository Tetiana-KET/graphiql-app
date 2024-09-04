import { GraphQLRequestHistoryRecord } from '@/models/FormInterfaces';
import { Button, Card, CardBody } from '@nextui-org/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface HistoryRecordProps {
  record: GraphQLRequestHistoryRecord;
}

export function HistoryRecord({ record }: HistoryRecordProps) {
  const { t } = useTranslation();

  const { URL, requestTime, type } = record;
  const [link, setLink] = useState('');

  useEffect(() => {
    if (type === 'graphql') {
      // Here will be generated same link as it generating in the form after submit,
      // GraphQL/Rest page should get form data from it.
      setLink('graphql');
    } else {
      setLink('rest');
    }
  }, [type]);

  return (
    <Card className="flex">
      <CardBody className="flex flex-col gap-2 mt-1 ">
        <h2>
          {t('history:requestType')}: {type}
        </h2>
        <h2>
          {t('common:URL')}: {URL}
        </h2>
        <h2>
          {t('history:requestTime')}: {requestTime}
        </h2>
        <div className="flex self-end">
          <Link href={link}>
            <Button color="secondary" size="sm">
              {t('history:retry')}
            </Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}
