import { GraphQLFormData } from '@/models/FormInterfaces';
import { Button, Input } from '@nextui-org/react';
import { Control, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRequestHeaders } from './hooks/useRequestVariables';

interface RequestHeadersProps {
  control: Control<GraphQLFormData>;
  register: UseFormRegister<GraphQLFormData>;
}
export function RequestHeaders({ control, register }: RequestHeadersProps) {
  const { fields, addVariable, removeVariable } = useRequestHeaders({
    control,
  });
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <h4 className="m-1"> {t('common:Headers')}</h4>
        <div className="flex gap-2">
          <Button color="primary" type="button" size="sm" onClick={addVariable}>
            {t('common:addHeader')}
          </Button>
        </div>
      </div>

      {fields.map((field, index) => (
        <div className="flex gap-2 items-center" key={field.id}>
          <Input
            size="sm"
            type="text"
            label="Header Key"
            placeholder="Ex. Authorization"
            {...register(`headers.${index}.key`)}
          />
          <Input
            size="sm"
            type="text"
            label="Header Value"
            placeholder="Ex. Bearer token"
            {...register(`headers.${index}.value`)}
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
