import { GraphQLFormData } from '@/models/FormInterfaces';
import {
  DEFAULT_GRAPHQL_URL,
  DEFAULT_SCHEMA_QUERY,
} from '@/models/GraphQLFormDefaultData';
import { executeGraphQLRequest } from '@/utils/executeGraphQLRequest';
import { graphQLToUrl } from '@/utils/graphQLToUrl';
import { graphQLSchema } from '@/validation/graphQLSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function useGraphQLForm() {
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
      query: DEFAULT_SCHEMA_QUERY,
      variables: [{ key: 'first', value: '1' }],
    },
    resolver: zodResolver(graphQLSchema),
    mode: 'all',
  });

  const [response, setResponse] = useState<Response | null>(null);

  const onSubmit = async (formData: GraphQLFormData) => {
    const url = graphQLToUrl(formData);
    const result = await executeGraphQLRequest(url);
    setResponse(result);
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
    response,
  };
}
