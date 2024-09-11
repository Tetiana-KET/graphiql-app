import { BaseFormData } from '@/models/BaseFormData';
import { Control, useFieldArray } from 'react-hook-form';

interface UseRequestKeyValuePairsProps {
  type: keyof BaseFormData;
  control: Control<BaseFormData>;
}
export function useRequestKeyValuePairs({
  control,
  type,
}: UseRequestKeyValuePairsProps) {
  const { fields, append, remove } = useFieldArray({
    control: control as unknown as Control<BaseFormData>,
    name: type,
  });

  const addField = () => {
    append({ key: '', value: '' });
  };

  const removeField = (index: number) => {
    remove(index);
  };

  return { fields, addField, removeField };
}
