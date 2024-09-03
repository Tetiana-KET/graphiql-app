import { GraphQLFormData } from '@/models/FormInterfaces';

import {
  DEFAULT_GRAPHQL_QUERY,
  DEFAULT_GRAPHQL_URL,
} from '@/models/GraphQLFormDefaultData';
import { saveGraphQLToLocalStorage } from '@/utils/saveGraphQLToLocalStorage';
import { createGraphQLSchema } from '@/validation/graphQLSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { usePassGraphQLToURL } from './usePassGraphQLToURL';

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
    resolver: zodResolver(graphQLSchema),
    mode: 'all',
  });

  const { passGraphQLToURL } = usePassGraphQLToURL();

  const getExampleFormData = () => {
    setValue('URL', DEFAULT_GRAPHQL_URL);
    setValue('query', DEFAULT_GRAPHQL_QUERY);
  };

  const onSubmit = async (formData: GraphQLFormData) => {
    saveGraphQLToLocalStorage(formData);
    await passGraphQLToURL(formData);
  };

  return {
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
