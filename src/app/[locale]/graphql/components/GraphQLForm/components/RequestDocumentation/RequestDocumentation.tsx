import Loader from '@/app/[locale]/_components/Loader/Loader';
import { useEffect, useState } from 'react';
import JsonView from 'react18-json-view';
import 'react18-json-view/src/style.css';

interface RequestDocumentationProps {
  GraphQLResponse: Response | undefined;
  isBusy: boolean;
}

export function RequestDocumentation({
  GraphQLResponse,
  isBusy,
}: RequestDocumentationProps) {
  const [schema, setSchema] = useState(null);

  useEffect(() => {
    const parseResponse = async () => {
      if (GraphQLResponse) {
        try {
          const result = await GraphQLResponse.json();
          // eslint-disable-next-line no-underscore-dangle
          if (result.data?.__schema) {
            setSchema(result);
          } else {
            setSchema(null);
          }
        } catch (error) {
          console.error('Failed to parse GraphQL response:', error);
          setSchema(null);
        }
      }
    };

    parseResponse();
  }, [GraphQLResponse]);

  if (!GraphQLResponse) {
    return (
      <div className="flex flex-col w-full h-1/2">
        <h2>Documentation:</h2>
        <h2>There will be placed GraphQL schema</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full">
        <div>
          <h2>Documentation: </h2>
          <div className="flex max-h-96 overflow-scroll">
            {schema && <JsonView src={schema} />}
            {!schema && !isBusy && (
              <h2>
                There will be placed GraphQL schema for success SDL request
              </h2>
            )}
          </div>
        </div>
      </div>

      {isBusy && <Loader />}
    </div>
  );
}
