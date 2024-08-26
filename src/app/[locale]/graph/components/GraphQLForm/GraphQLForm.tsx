'use client';

import { RequestKeyValuePairs } from '@/app/[locale]/_components/RequestKeyValuePairs/RequestKeyValuePairs';
import { Button, Checkbox, Divider, Input } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { useGraphQLForm } from '../../hooks/useGraphQLForm';
import { useSDLAsURL } from '../../hooks/useSDLAsURL';
import CodeMirrorBoard from './components/CodeMirror/CodeMirrorBoard';

export function GraphQLForm() {
  const { t } = useTranslation();

  const { register, control, watch, setValue, handleSubmit, errors, onSubmit } =
    useGraphQLForm();

  const { handleSDLChange, isSDLAsURL, URLValue, SDLValue } = useSDLAsURL({
    watch,
    setValue,
  });

  return (
    <div className="flex w-full flex-col">
      <h1 className="self-center mb-3">Make GraphQL request</h1>
      <div className="flex w-1/2  flex-wrap md:flex-nowrap gap-4">
        <form
          className="flex w-full flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            isRequired
            type="text"
            label="URL"
            placeholder={t('common:urlPlaceholderText')}
            {...register('URL')}
            errorMessage={errors.URL?.message}
          />
          <Input
            disabled={isSDLAsURL}
            value={isSDLAsURL ? `${URLValue}?sdl` : SDLValue || ''}
            label="SDL"
            placeholder={t('common:SDLPlaceholderText')}
            type="text"
            {...register('SDL')}
            errorMessage={errors.SDL?.message}
          />
          <Checkbox
            defaultSelected
            size="sm"
            isSelected={isSDLAsURL}
            onChange={handleSDLChange}
          >
            {t('graphQL:URLAndSDLAreTheSame')}
          </Checkbox>
          <CodeMirrorBoard register={register} setValue={setValue} />
          <RequestKeyValuePairs
            type="headers"
            control={control}
            register={register}
          />
          <Divider orientation="horizontal" />
          <RequestKeyValuePairs
            type="variables"
            control={control}
            register={register}
          />
          <div className="flex gap-2">
            <Button color="primary" type="submit">
              {t('common:save')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
