'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { RestFormData } from '@/models/RestFormData';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { RestMethod } from '@/models/RestMethod.enum';
import { RequestKeyValuePairs } from '@/app/[locale]/_components/RequestKeyValuePairs/RequestKeyValuePairs';
import RestBody from '@/app/[locale]/rest/components/RestBody';

export default function RestForm() {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<RestFormData>({
    defaultValues: {
      headers: [{ key: '', value: '' }],
      variables: [{ key: '', value: '' }],
    },
  });

  const onSubmit: SubmitHandler<RestFormData> = (data) => console.warn(data);

  return (
    <form
      className="flex flex-col justify-between flex-wrap md:flex-nowrap gap-4 flex-1"
      onSubmit={handleSubmit(onSubmit)}
    >
      <section className="flex gap-2">
        <Select
          isRequired
          label="Method"
          {...register('method')}
          errorMessage={errors.method?.message}
          className="flex-none w-32"
        >
          {Object.values(RestMethod).map((method) => (
            <SelectItem key={method}>{method}</SelectItem>
          ))}
        </Select>

        <Input
          isRequired
          type="text"
          label="Endpoint URL"
          {...register('url')}
          errorMessage={errors.url?.message}
          className="flex-1"
        />
      </section>

      <section>
        <RequestKeyValuePairs
          type="headers"
          control={control}
          register={register}
          errors={errors}
        />
      </section>

      <section>
        <RequestKeyValuePairs
          type="variables"
          control={control}
          register={register}
          errors={errors}
        />
      </section>

      <section>
        <RestBody
          register={register}
          getValues={getValues}
          setValue={setValue}
          errorMessage={errors.body?.message}
        />
      </section>

      <footer className="flex justify-center">
        <Button fullWidth color="primary" type="submit">
          Send
        </Button>
      </footer>
    </form>
  );
}
