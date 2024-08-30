import Loader from '@/app/[locale]/_components/Loader/Loader';
import { useEffect, useState } from 'react';
import JsonView from 'react18-json-view';
import 'react18-json-view/src/style.css';

interface ResponseStatusProps {
  GraphQLResponse: Response | undefined;
  isBusy: boolean;
}

export function ResponseStatus({
  GraphQLResponse,
  isBusy,
}: ResponseStatusProps) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const parseResponse = async () => {
      if (GraphQLResponse) {
        const result = await GraphQLResponse.json();
        // eslint-disable-next-line no-underscore-dangle
        if (!result.data.__schema) {
          setData(result);
        } else {
          setData(null);
        }
      }
    };

    parseResponse();
  }, [GraphQLResponse]);

  if (!GraphQLResponse) {
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
            <h2>Response Status: {GraphQLResponse.status}</h2>
            <div
              className="flex max-h-96 
   overflow-scroll"
            >
              {data && (
                <div
                  className="flex max-h-96 
   overflow-scroll"
                >
                  <h3>Body:</h3>
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
