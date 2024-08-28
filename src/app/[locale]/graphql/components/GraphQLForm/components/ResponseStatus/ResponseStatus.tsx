import Loader from '@/app/[locale]/_components/Loader/Loader';
import { Divider } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import JsonView from 'react18-json-view';
import 'react18-json-view/src/style.css';

interface ResponseStatusProps {
  response: Response | null;
  isBusy: boolean;
}

export function ResponseStatus({ response, isBusy }: ResponseStatusProps) {
  const [data, setData] = useState({});

  useEffect(() => {
    const parseResponse = async () => {
      if (response) {
        const result = await response.json();
        setData(result);
      }
    };

    parseResponse();
  }, [response]);

  if (!response) {
    return (
      <div className="flex flex-col w-full h-1/2">
        <h2>Response:</h2>
        <h2>There will be placed response result</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-1/2  ">
      <h2>Response:</h2>
      {!isBusy && (
        <div>
          <h2>Response Status: {response.status}</h2>
          <h3>Response Body:</h3>
          <Divider orientation="horizontal" className="m-2" />
          <div
            className="flex max-h-96 
   overflow-scroll"
          >
            <JsonView src={data} />
          </div>
          <Divider orientation="horizontal" className="m-2" />
        </div>
      )}

      {isBusy && <Loader />}
    </div>
  );
}
