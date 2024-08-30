import Loader from '@/app/[locale]/_components/Loader/Loader';
import { useEffect, useState } from 'react';
import JsonView from 'react18-json-view';
import 'react18-json-view/src/style.css';

interface ResponseStatusProps {
  graphQLResponse: Response | null;
  isBusy: boolean;
}

export function ResponseStatus({
  graphQLResponse,
  isBusy,
}: ResponseStatusProps) {
  const [data, setData] = useState(null);

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
        <h2>Response:</h2>
        <h2>There will be placed response result</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full">
        <h2>Response:</h2>
        {!isBusy && (
          <div>
            <h2>Response Status: {graphQLResponse.status}</h2>
            <div
              className="flex max-h-96 
   overflow-scroll"
            >
              {data && (
                <div
                  className="flex max-h-96 
   overflow-scroll"
                >
                  <JsonView src={data} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {isBusy && <Loader />}
    </div>
  );
}
