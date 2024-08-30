import { GraphQLFormData } from '@/models/FormInterfaces';
import {
  DEFAULT_GRAPHQL_QUERY,
  DEFAULT_GRAPHQL_URL,
} from '@/models/GraphQLFormDefaultData';
import { fetchDocumentation } from '@/utils/fetchDocumentation';
import { fetchGraphQLData } from '@/utils/fetchGraphQlData';
import { graphQLDataToURL } from '@/utils/graphQLDataToURL';
import { saveGraphQLToLocalStorage } from '@/utils/saveGraphQLToLocalStorage';
import { createGraphQLSchema } from '@/validation/graphQLSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export function useGraphQLForm() {
  const { t } = useTranslation();
  const graphQLSchema = createGraphQLSchema(t);
  const {
    register,
    getValues,
    control,
    watch,
    setValue,
    handleSubmit,

    formState: { errors },
  } = useForm<GraphQLFormData>({
    defaultValues: {
      URL: DEFAULT_GRAPHQL_URL,
      query: DEFAULT_GRAPHQL_QUERY,
    },
    resolver: zodResolver(graphQLSchema),
    mode: 'all',
  });
  const [isBusy, setIsBusy] = useState(false);

  const [graphQLResponse, setGraphQLResponse] = useState<Response | null>(null);
  const [documentation, setDocumentation] = useState<Response | null>(null);

  const onSubmit = async (formData: GraphQLFormData) => {
    setIsBusy(true);
    saveGraphQLToLocalStorage(formData);
    const result = await fetchGraphQLData(graphQLDataToURL(formData));
    const documentationResponse = await fetchDocumentation(formData.SDL);
    setDocumentation(documentationResponse);
    setGraphQLResponse(result);
    setIsBusy(false);
  };

  return {
    register,
    getValues,
    control,
    watch,
    setValue,
    handleSubmit,
    errors,
    onSubmit,
    graphQLResponse,
    documentation,
    isBusy,
  };
}
