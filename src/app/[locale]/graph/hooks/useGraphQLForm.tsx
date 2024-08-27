import { GraphQLFormData } from '@/models/FormInterfaces';
import { useForm } from 'react-hook-form';

export function useGraphQLForm() {
  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<GraphQLFormData>({
    defaultValues: {},
  });

  const onSubmit = (formData: GraphQLFormData) => {
    // eslint-disable-next-line no-console
    console.log(formData);
  };

  return {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    errors,
    onSubmit,
  };
}
