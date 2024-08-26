import { GraphQLFormData } from '@/models/FormInterfaces';
import { Control, useFieldArray } from 'react-hook-form';

interface UseRequestVariablesProps {
  control: Control<GraphQLFormData>;
}
export const useRequestVariables = ({ control }: UseRequestVariablesProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variables',
  });

  const addVariable = () => {
    append({ key: '', value: '' });
  };

  const removeVariable = (index: number) => {
    remove(index);
  };
  return { fields, addVariable, removeVariable };
};
