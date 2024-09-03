import { Button, Input } from '@nextui-org/react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BaseFormData } from '@/models/BaseFormData';
import { useRequestKeyValuePairs } from './hooks/useRequestKeyValuePairs';

interface RequestKeyValuePairsProps<T extends BaseFormData> {
  type: keyof BaseFormData;
  control: Control<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  className?: string;
}

export function RequestKeyValuePairs<T extends BaseFormData>({
  type,
  control,
  register,
  errors,
  className,
}: RequestKeyValuePairsProps<T>) {
  const baseForm = {
    control: control as unknown as Control<BaseFormData>,
    register: register as unknown as UseFormRegister<BaseFormData>,
    errors: errors as unknown as FieldErrors<BaseFormData>,
  };

  const { fields, addField, removeField } = useRequestKeyValuePairs({
    control: baseForm.control,
    type,
  });

  const { t } = useTranslation();

  return (
    <div className={`flex flex-col gap-2 ${className || ''}`}>
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
            {...baseForm.register(`${type}.${index}.key`)}
            isInvalid={
              baseForm.errors?.[type]?.[index]?.key?.message !== undefined
            }
            errorMessage={baseForm.errors?.[type]?.[index]?.key?.message}
          />

          <Input
            isRequired
            size="sm"
            type="text"
            label={t('common:value')}
            {...baseForm.register(`${type}.${index}.value`)}
            isInvalid={
              baseForm.errors?.[type]?.[index]?.value?.message !== undefined
            }
            errorMessage={baseForm.errors?.[type]?.[index]?.value?.message}
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
