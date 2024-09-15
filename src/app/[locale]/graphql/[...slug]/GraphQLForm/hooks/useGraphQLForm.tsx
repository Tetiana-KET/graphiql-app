import { GraphQLFormData } from '@/models/GraphQLFormData';

import {
  DEFAULT_GRAPHQL_QUERY,
  DEFAULT_GRAPHQL_URL,
  DEFAULT_GRAPHQL_VARIABLES,
} from '@/consts/defaultFormData';
import { RequestType } from '@/enums/RequestType';
import { SerializerService } from '@/services/serializer';
import { checkErrorInstance } from '@/utils/checkErrorInstance';
import { createGraphQLSchema } from '@/validation/createGraphQLSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export function useGraphQLForm(defaultFormData: GraphQLFormData | null) {
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
    defaultValues: defaultFormData || {},
    resolver: zodResolver(graphQLSchema),
    mode: 'all',
  });

  const router = useRouter();

  const setExampleFormData = () => {
    setValue('url', DEFAULT_GRAPHQL_URL);
    setValue('query', DEFAULT_GRAPHQL_QUERY);
    setValue('variables', DEFAULT_GRAPHQL_VARIABLES);
  };

  const onSubmit = async (formData: GraphQLFormData) => {
    try {
      router.push(SerializerService.serialize(RequestType.GraphQL, formData));
    } catch (error) {
      checkErrorInstance(
        Error(`${t('common:FailedSerialize')} ${error?.toString()}`),
      );
    }
  };

  return {
    setExampleFormData,
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
