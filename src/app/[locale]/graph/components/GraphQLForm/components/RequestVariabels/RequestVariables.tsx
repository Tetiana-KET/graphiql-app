import { GraphQLFormData } from '@/models/FormInterfaces';
import { Button, Input } from '@nextui-org/react';
import { Control, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRequestVariables } from './hooks/useRequestVariables';

interface RequestVariablesProps {
  control: Control<GraphQLFormData>;
  register: UseFormRegister<GraphQLFormData>;
}
export function RequestVariables({ control, register }: RequestVariablesProps) {
  const { fields, addVariable, removeVariable } = useRequestVariables({
    control,
  });
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <h4 className="m-1"> {t('common:variables')}</h4>
        <div className="flex gap-2">
          <Button color="primary" type="button" size="sm" onClick={addVariable}>
            {t('common:addVariable')}
          </Button>
        </div>
      </div>

      {fields.map((field, index) => (
        <div className="flex gap-2 items-center" key={field.id}>
          <Input
            size="sm"
            type="text"
            label="Key"
            placeholder="Ex. id"
            {...register(`variables.${index}.key`)}
          />
          <Input
            size="sm"
            type="text"
            label="Value"
            placeholder="Ex. 1"
            {...register(`variables.${index}.value`)}
          />
          <Button
            color="danger"
            type="button"
            size="sm"
            onClick={() => removeVariable(index)}
          >
            {t('common:remove')}
          </Button>
        </div>
      ))}
    </div>
  );
}
