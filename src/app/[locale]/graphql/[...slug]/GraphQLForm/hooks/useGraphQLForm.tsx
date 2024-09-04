import { GraphQLFormData } from '@/models/FormInterfaces';

import {
  DEFAULT_GRAPHQL_QUERY,
  DEFAULT_GRAPHQL_URL,
} from '@/models/GraphQLFormDefaultData';
import { graphQLToURL } from '@/utils/graphQLToURL';
import { createGraphQLSchema } from '@/validation/graphQLSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export function useGraphQLForm() {
  const { t } = useTranslation();
  const graphQLSchema = createGraphQLSchema(t);
  const {
    reset,
    register,
    getValues,
    control,
    watch,
    setValue,
    handleSubmit,

    formState: { errors },
  } = useForm<GraphQLFormData>({
    resolver: zodResolver(graphQLSchema),
    mode: 'all',
  });
  const router = useRouter();

  const getExampleFormData = () => {
    setValue('URL', DEFAULT_GRAPHQL_URL);
    setValue('query', DEFAULT_GRAPHQL_QUERY);
  };

  const onSubmit = async (formData: GraphQLFormData) => {
    const URL = graphQLToURL(formData);
    router.push(URL);
  };

  return {
    reset,
    getExampleFormData,
    register,
    getValues,
    control,
    watch,
    setValue,
    handleSubmit,
    errors,
    onSubmit,
  };
}
