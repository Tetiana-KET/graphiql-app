import { GraphQLFormData } from '@/models/FormInterfaces';
import { Control, useFieldArray } from 'react-hook-form';

interface UseRequestHeadersProps {
  control: Control<GraphQLFormData>;
}
export const useRequestHeaders = ({ control }: UseRequestHeadersProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'headers',
  });

  const addVariable = () => {
    append({ key: '', value: '' });
  };

  const removeVariable = (index: number) => {
    remove(index);
  };
  return { fields, addVariable, removeVariable };
};
