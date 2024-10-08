/* eslint-disable no-underscore-dangle */

'use client';

import { ApiResponse } from '@/models/ApiResponse';
import { checkErrorInstance } from '@/utils/checkErrorInstance';
import { json } from '@codemirror/lang-json';
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import CodeMirror from '@uiw/react-codemirror';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface RequestDocumentationProps {
  response: ApiResponse;
}

export function RequestDocumentation({ response }: RequestDocumentationProps) {
  const [documentation, setDocumentation] = useState<object | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const { data, error } = response;
    const documentationData = data as { data: { __schema?: string } };
    if (documentationData?.data?.__schema) {
      setDocumentation(
        documentationData.data.__schema ? documentationData.data : null,
      );
    }

    if (error) {
      checkErrorInstance(error);
    }
  }, [response]);

  if (!response) {
    return (
      <div className="flex flex-col w-full h-1/2">
        <h2>{t('common:doc')}</h2>
        <h2> {t('graphQL:docResponse')}</h2>
      </div>
    );
  }

  return (
    <Card className="flex p-1 sm:p-2 w-full h-full">
      <CardHeader>{t('common:doc')}</CardHeader>

      <Divider />

      <CardBody className=" p-1 sm:p-3">
        {documentation ? (
          <CodeMirror
            value={JSON.stringify(documentation, null, 2)}
            extensions={[json()]}
            readOnly
            height="auto"
            className="overflow-auto"
          />
        ) : (
          <h2>{t('graphQL:docResponse')}</h2>
        )}
      </CardBody>
    </Card>
  );
}
