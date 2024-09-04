import { checkErrorInstance } from '@/utils/checkErrorInstance';
import { Spinner } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import JsonView from 'react18-json-view';
import 'react18-json-view/src/style.css';

interface RequestDocumentationProps {
  documentationResponse: Response | null | undefined;
  isBusy: boolean;
}

export function RequestDocumentation({
  documentationResponse,
  isBusy,
}: RequestDocumentationProps) {
  const [documentation, setDocumentation] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const parseSchema = async () => {
      if (documentationResponse) {
        try {
          const result = await documentationResponse.json();
          // eslint-disable-next-line no-underscore-dangle
          if (result.data.__schema) {
            setDocumentation(result);
          } else {
            setDocumentation(null);
          }
        } catch (err) {
          checkErrorInstance(err);
        }
      }
    };
    parseSchema();
  }, [documentationResponse]);
  if (!documentationResponse) {
    return (
      <div className="flex flex-col w-full h-1/2">
        <h2>{t('common:doc')}</h2>
        <h2> {t('graphQL:docResponse')}</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full">
        <div>
          <h2>{t('common:doc')} </h2>
          <div className="flex max-h-96 overflow-scroll">
            {documentation && !isBusy && <JsonView src={documentation} />}
            {!documentation && !isBusy && <h2>{t('graphQL:docResponse')}</h2>}
          </div>
        </div>
      </div>

      {isBusy && <Spinner color="secondary" />}
    </div>
  );
}
