'use client';

import { RequestKeyValuePairs } from '@/app/[locale]/_components/RequestKeyValuePairs/RequestKeyValuePairs';
import { ResponseStatus } from '@/app/[locale]/_components/ResponseStatus/ResponseStatus';
import { Button, Checkbox, Divider, Input } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import CodeMirrorBoard from './components/CodeMirror/CodeMirrorBoard';
import { RequestDocumentation } from './components/RequestDocumentation/RequestDocumentation';
import { useFetchData } from './hooks/useFetchData';
import { useGraphQLForm } from './hooks/useGraphQLForm';
import { useSDLAsURL } from './hooks/useSDLAsURL';

export function GraphQLForm() {
  const { t } = useTranslation();

  const {
    getExampleFormData,
    getValues,
    register,
    control,
    watch,
    reset,
    setValue,
    handleSubmit,
    errors,
    onSubmit,
  } = useGraphQLForm();

  const { isBusy, documentation, graphQLResponse } = useFetchData({ reset });

  const { handleSDLChange, isSDLAsURL, URLValue, SDLValue } = useSDLAsURL({
    watch,
    setValue,
  });

  return (
    <div className="flex w-full gap-4">
      <div className="flex w-1/2 h-full flex-wrap md:flex-nowrap gap-4 ">
        <form
          className="flex w-full flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            value={URLValue}
            isRequired
            type="text"
            label="URL"
            placeholder={t('common:urlPlaceholderText')}
            {...register('URL')}
            isInvalid={errors.URL?.message !== undefined}
            errorMessage={errors.URL?.message}
          />
          <Input
            disabled={isSDLAsURL}
            value={isSDLAsURL ? `${URLValue}?sdl` : SDLValue || ''}
            label="SDL"
            placeholder={t('common:SDLPlaceholderText')}
            type="text"
            {...register('SDL')}
            isInvalid={errors.SDL?.message !== undefined}
            errorMessage={errors.SDL?.message}
          />
          <Checkbox
            defaultSelected
            size="sm"
            isSelected={isSDLAsURL}
            onChange={handleSDLChange}
          >
            {t('graphQL:sdlAsUrl')}
          </Checkbox>
          <div className="flex gap-2">
            <Button onClick={getExampleFormData} color="warning" size="sm">
              {t('graphQL:GetURLQueryExample')}
            </Button>
          </div>

          <CodeMirrorBoard
            getValues={getValues}
            errorMessage={errors.query?.message}
            register={register}
            setValue={setValue}
          />
          <RequestKeyValuePairs
            type="headers"
            control={control}
            register={register}
            errors={errors}
          />
          <Divider orientation="horizontal" />
          <RequestKeyValuePairs
            type="variables"
            control={control}
            register={register}
            errors={errors}
          />
          <div className="flex gap-2">
            <Button color="primary" type="submit" disabled={isBusy}>
              {t('common:save')}
            </Button>
          </div>
        </form>
      </div>
      <div className="flex w-1/2 h-full flex-col  gap-4">
        <ResponseStatus
          graphQLResponse={graphQLResponse?.clone()}
          isBusy={isBusy}
        />
        <Divider orientation="horizontal" className="m-2" />
        <RequestDocumentation
          documentationResponse={documentation}
          isBusy={isBusy}
        />
      </div>
    </div>
  );
}
