import { GraphQLFormData } from '@/models/FormInterfaces';
import { Control, useFieldArray } from 'react-hook-form';

interface UseRequestKeyValuePairsProps {
  type: 'headers' | 'variables';
  control: Control<GraphQLFormData>;
}
export const useRequestKeyValuePairs = ({
  control,
  type,
}: UseRequestKeyValuePairsProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: type,
  });

  const addField = () => {
    append({ key: '', value: '' });
  };

  const removeField = (index: number) => {
    remove(index);
  };
  return { fields, addField, removeField };
};
