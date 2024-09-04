import { GraphQLRequestHistoryRecord } from '@/models/FormInterfaces';
import { graphQLToURL } from '@/utils/graphQLToURL';
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
      const graphQLURL = graphQLToURL(record);
      setLink(graphQLURL);
    } else {
      setLink('rest');
    }
  }, [type, record]);

  return (
    <Card className="flex">
      <CardBody className="flex flex-col gap-2 mt-1 ">
        <h2>
          {t('history:requestType')}: {type.toUpperCase()}
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
              {t('history:restore')}
            </Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}
