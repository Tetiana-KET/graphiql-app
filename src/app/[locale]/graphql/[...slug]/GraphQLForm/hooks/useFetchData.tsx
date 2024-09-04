import { GraphQLFormData } from '@/models/FormInterfaces';
import { checkErrorInstance } from '@/utils/checkErrorInstance';
import { fetchDocumentation } from '@/utils/fetchDocumentation';
import { fetchGraphQLData } from '@/utils/fetchGraphQlData';
import { saveGraphQLToLocalStorage } from '@/utils/saveGraphQLToLocalStorage';
import { urlToGraphQLFormData } from '@/utils/urlToGraphQLFormData';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { UseFormReset } from 'react-hook-form';

interface UseFetchDataProps {
  reset: UseFormReset<GraphQLFormData>;
}

export const useFetchData = ({ reset }: UseFetchDataProps) => {
  const URL = usePathname();
  const hasFetchedData = useRef(false);

  const [graphQLResponse, setGraphQLResponse] = useState<
    Response | null | undefined
  >(null);
  const [documentation, setDocumentation] = useState<
    Response | null | undefined
  >(null);
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    const fetchGQLData = async () => {
      if (hasFetchedData.current) {
        return;
      }
      hasFetchedData.current = true;

      try {
        setIsBusy(true);

        const decodedFormData = urlToGraphQLFormData(URL);

        if (decodedFormData) {
          reset(decodedFormData);

          const newGraphQLResponse = await fetchGraphQLData();
          setGraphQLResponse(newGraphQLResponse);
          saveGraphQLToLocalStorage({
            formData: decodedFormData,
          });

          const newDocumentation = await fetchDocumentation();
          setDocumentation(newDocumentation);
        }

        setIsBusy(false);
      } catch (error) {
        checkErrorInstance(error);
        setIsBusy(false);
      }
    };

    fetchGQLData();
  }, [URL, reset]);

  return { isBusy, graphQLResponse, documentation };
};
