import { fetchDocumentation } from '@/utils/fetchDocumentation';
import { fetchGraphQLData } from '@/utils/fetchGraphQlData';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useFetchData = () => {
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
      setIsBusy(true);
      const newGraphQLResponse = await fetchGraphQLData();
      setGraphQLResponse(newGraphQLResponse);
      const newDocumentation = await fetchDocumentation();
      setDocumentation(newDocumentation);
      setIsBusy(false);
    };
    fetchGQLData();
  }, [URL]);

  return { isBusy, graphQLResponse, documentation };
};
