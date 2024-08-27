import { GraphQLFormData } from '@/models/FormInterfaces';
import { Button, Input } from '@nextui-org/react';
import { Control, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRequestKeyValuePairs } from './hooks/useRequestKeyValuePairs';

interface RequestKeyValuePairsProps {
  type: 'headers' | 'variables';
  control: Control<GraphQLFormData>;
  register: UseFormRegister<GraphQLFormData>;
}
export function RequestKeyValuePairs({
  type,
  control,
  register,
}: RequestKeyValuePairsProps) {
  const { fields, addField, removeField } = useRequestKeyValuePairs({
    control,
    type,
  });

  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <h4 className="m-1"> {t(`common:${type}`)}</h4>
        <Button color="primary" type="button" size="sm" onClick={addField}>
          {t('common:add')}
        </Button>
      </div>

      {fields.map((field, index) => (
        <div className="flex gap-2 items-center" key={field.id}>
          <Input
            isRequired
            size="sm"
            type="text"
            label={t('common:key')}
            placeholder="id"
            {...register(`${type}.${index}.key`)}
          />
          <Input
            isRequired
            size="sm"
            type="text"
            label={t('common:value')}
            placeholder="1"
            {...register(`${type}.${index}.value`)}
          />
          <Button
            color="danger"
            type="button"
            size="sm"
            onClick={() => removeField(index)}
          >
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
}
