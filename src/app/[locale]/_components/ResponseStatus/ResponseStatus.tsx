import { Spinner } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import JsonView from 'react18-json-view';
import 'react18-json-view/src/style.css';

interface ResponseStatusProps {
  graphQLResponse: Response | undefined;
  isBusy: boolean;
}

export function ResponseStatus({
  graphQLResponse,
  isBusy,
}: ResponseStatusProps) {
  const [data, setData] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const parseResponse = async () => {
      if (graphQLResponse) {
        const result = await graphQLResponse.json();

        setData(result);
      }
    };

    parseResponse();
  }, [graphQLResponse]);

  if (!graphQLResponse) {
    return (
      <div className="flex flex-col w-full h-1/2">
        <h2>{t('common:response')}</h2>
        <h2>{t('common:responseText')}</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full">
        <h2>{t('common:response')}</h2>
        {!isBusy && (
          <div>
            <h2>
              {t('common:responseStatus')} {graphQLResponse.status}
            </h2>
            <div
              className="flex max-h-96 w-full
   overflow-scroll"
            >
              {data && (
                <div
                  className="flex max-h-96 w-full
   overflow-scroll"
                >
                  <JsonView src={data} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {isBusy && <Spinner color="secondary" />}
    </div>
  );
}
