import { useEffect, useState } from 'react';
import JsonView from 'react18-json-view';
import 'react18-json-view/src/style.css';

interface ResponseStatusProps {
  response: Response | null;
}

export function ResponseStatus({ response }: ResponseStatusProps) {
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
      <div className="flex flex-col">
        <h2>Response:</h2>
        <h2>There will be placed response result</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <h2>Response:</h2>
      <h2>Response Status: {response.status}</h2>
      <div>
        <h3>Response Body:</h3>
        <div
          className="flex max-h-96
   overflow-scroll"
        >
          <JsonView src={data} />
        </div>
      </div>
    </div>
  );
}
