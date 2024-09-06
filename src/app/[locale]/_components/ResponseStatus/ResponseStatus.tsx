'use client';

import { useTranslation } from 'react-i18next';
import { json } from '@codemirror/lang-json';
import CodeMirror from '@uiw/react-codemirror';
import { useEffect } from 'react';
import { RequestType } from '@/enums/RequestType';
import { GraphQLFormData } from '@/models/GraphQLFormData';
import { RestFormData } from '@/models/RestFormData';
import { ApiResponse } from '@/models/ApiResponse';
import { checkErrorInstance } from '@/utils/checkErrorInstance';
import { Card, CardBody, CardHeader, Chip, Divider } from '@nextui-org/react';
import { getStatusColor } from '@/utils/getStatusColor';
import { useHistory } from '@/hooks/useHistory';

interface ResponseStatusProps {
  response: ApiResponse;
  formData: GraphQLFormData | RestFormData | null;
  type: RequestType;
}

export function ResponseStatus({
  response,
  formData,
  type,
}: ResponseStatusProps) {
  const { t } = useTranslation();
  const { status, data, error } = response;
  const { add } = useHistory();

  useEffect(() => {
    if (formData) {
      add(type, formData, response);
    }

    if (error) {
      checkErrorInstance(error);
    }
  }, [type, formData, response, error, add]);

  return (
    <Card className="flex p-2 w-full h-full">
      <CardHeader className="flex justify-between">
        <strong>{t('common:response')}</strong>{' '}
        <Chip color={getStatusColor(status)}>{status || ''}</Chip>
      </CardHeader>

      <Divider />

      <CardBody>
        {data ? (
          <CodeMirror
            value={JSON.stringify(data, null, 2)}
            extensions={[json()]}
            readOnly
            height="auto"
            className="overflow-auto rounded-md"
            theme="dark"
          />
        ) : (
          <h2>{t('common:responseText')}</h2>
        )}
      </CardBody>
    </Card>
  );
}
