import { RequestType } from '@/enums/RequestType';
import { RequestHistoryRecord } from '@/models/RequestHistoryRecord';
import { SerializerService } from '@/services/serializer';
import { checkErrorInstance } from '@/utils/checkErrorInstance';
import { Button, Card, CardBody, Chip } from '@nextui-org/react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

interface HistoryRecordProps {
  record: RequestHistoryRecord;
}

export function HistoryRecord({ record }: HistoryRecordProps) {
  const { t } = useTranslation();

  const { date, type, time } = record;
  let link: string | null = null;

  try {
    link = SerializerService.serialize(type, record.formData);
  } catch (error) {
    checkErrorInstance(
      Error(`${t('common:FailedSerialize')} ${error?.toString()}`),
    );
  }

  return (
    <Card className="flex">
      <CardBody className="flex flex-col gap-2 mt-1 ">
        <h2>
          <strong>{t('history:requestType')}: </strong>
          <Chip color={type === RequestType.Rest ? 'primary' : 'success'}>
            {type.toUpperCase()}
          </Chip>
        </h2>
        <h2>
          <strong>{t('common:URL')}:</strong> {record.formData.url}
        </h2>
        <h2>
          <strong>{t('history:requestTime')}:</strong> {time}ms (
          {new Date(date).toLocaleDateString(undefined, {
            year: 'numeric',
            day: '2-digit',
            month: 'short',
          })}
          )
        </h2>

        {link && (
          <div className="flex self-end">
            <Link href={link}>
              <Button color="secondary" size="sm">
                {t('history:restore')}
              </Button>
            </Link>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
