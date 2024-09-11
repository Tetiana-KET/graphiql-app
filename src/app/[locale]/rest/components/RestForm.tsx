'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { RestFormData } from '@/models/RestFormData';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { RestMethod } from '@/enums/RestMethod';
import { RequestKeyValuePairs } from '@/app/[locale]/_components/RequestKeyValuePairs/RequestKeyValuePairs';
import RestBody from '@/app/[locale]/rest/components/RestBody';
import { zodResolver } from '@hookform/resolvers/zod';
import { createRestSchema } from '@/validation/restSchema';
import { useTranslation } from 'react-i18next';
import { SerializerService } from '@/services/serializer';
import { RequestType } from '@/enums/RequestType';
import { useRouter } from 'next/navigation';
import {
  DEFAULT_REST_BODY,
  DEFAULT_REST_METHOD,
  DEFAULT_REST_URL,
  DEFAULT_REST_VARIABLES,
} from '@/consts/defaultFormData';
import { checkErrorInstance } from '@/utils/checkErrorInstance';

interface RestFormProps {
  formData?: RestFormData | null;
}

export default function RestForm({ formData }: RestFormProps) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RestFormData>({
    defaultValues: formData || {},
    resolver: zodResolver(createRestSchema(t)),
    mode: 'all',
  });

  const router = useRouter();
  const urlValue = watch('url') || '';
  const methodValue = watch('method') || '';

  const onSubmit: SubmitHandler<RestFormData> = (data) => {
    try {
      router.push(SerializerService.serialize(RequestType.Rest, data));
    } catch (error) {
      checkErrorInstance(
        Error(`${t('common:FailedSerialize')} ${error?.toString()}`),
      );
    }
  };

  const setExampleFormData = () => {
    setValue('method', DEFAULT_REST_METHOD);
    setValue('url', DEFAULT_REST_URL);
    setValue('variables', DEFAULT_REST_VARIABLES);
    setValue('body', DEFAULT_REST_BODY);
  };

  return (
    <form
      className="flex flex-col justify-between gap-4 flex-1 h-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <main className="flex flex-col flex-wrap md:flex-nowrap gap-4 flex-1">
        <section className="flex gap-2">
          <Select
            selectedKeys={[methodValue]}
            isRequired
            label="Method"
            {...register('method')}
            isInvalid={!!errors.method}
            errorMessage={errors.method?.message}
            className="flex-none w-32"
          >
            {Object.values(RestMethod).map((method) => (
              <SelectItem key={method} value={method}>
                {method}
              </SelectItem>
            ))}
          </Select>

          <Input
            value={urlValue}
            isRequired
            type="text"
            label="Endpoint URL"
            {...register('url')}
            isInvalid={!!errors.url}
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
      </main>

      <footer className="flex gap-4">
        <Button onClick={setExampleFormData} color="warning">
          {t('common:FillExampleData')}
        </Button>

        <Button color="primary" type="submit" className="flex-1">
          {t('common:Send')}
        </Button>
      </footer>
    </form>
  );
}
