import { GraphQLFormData } from '@/models/FormInterfaces';
import { checkErrorInstance } from '@/utils/checkErrorInstance';
import { fetchDocumentation } from '@/utils/fetchDocumentation';
import { fetchGraphQLData } from '@/utils/fetchGraphQlData';
import { urlToGraphQLFormData } from '@/utils/urlToGraphQLFormData';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UseFormReset } from 'react-hook-form';

interface UseFetchDataProps {
  reset: UseFormReset<GraphQLFormData>;
}

export const useFetchData = ({ reset }: UseFetchDataProps) => {
  const URL = usePathname();

  const [graphQLResponse, setGraphQLResponse] = useState<
    Response | null | undefined
  >(null);
  const [documentation, setDocumentation] = useState<
    Response | null | undefined
  >(null);

  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    const fetchGQLData = async () => {
      try {
        setIsBusy(true);
        const encodedFormData = urlToGraphQLFormData(URL);
        if (encodedFormData) {
          reset(encodedFormData);
        }
        const newGraphQLResponse = await fetchGraphQLData();
        setGraphQLResponse(newGraphQLResponse);
        const newDocumentation = await fetchDocumentation();
        setDocumentation(newDocumentation);
        setIsBusy(false);
      } catch (error) {
        checkErrorInstance(error);
      }
    };
    fetchGQLData();
  }, [URL, reset]);

  return { isBusy, graphQLResponse, documentation };
};
