import { GraphQLFormData } from '@/models/FormInterfaces';
import { Button, Input } from '@nextui-org/react';
import { Control, useFieldArray, UseFormRegister } from 'react-hook-form';

interface RequestHeadersProps {
  control: Control<GraphQLFormData>;
  register: UseFormRegister<GraphQLFormData>;
}
export function RequestHeaders({ control, register }: RequestHeadersProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'headers',
  });

  const addVariable = () => {
    append({ key: '', value: '' });
  };

  const removeVariable = () => {
    remove(fields.length - 1);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <h4 className="m-1">Variables</h4>
        <div className="flex gap-2">
          <Button color="primary" type="button" size="sm" onClick={addVariable}>
            Add variable
          </Button>
          <Button
            color="primary"
            type="button"
            size="sm"
            onClick={removeVariable}
          >
            Remove the last
          </Button>
        </div>
      </div>

      {fields.map((field, index) => (
        <div className="flex gap-2" key={field.id}>
          <Input
            size="sm"
            type="text"
            label="Key"
            placeholder="Ex. id"
            {...register(`headers.${index}.key`)}
          />
          <Input
            size="sm"
            type="text"
            label="Value"
            placeholder="Ex. 1"
            {...register(`headers.${index}.value`)}
          />
        </div>
      ))}
    </div>
  );
}
