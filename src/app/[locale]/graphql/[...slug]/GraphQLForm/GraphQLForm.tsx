'use client';

import { RequestKeyValuePairs } from '@/app/[locale]/_components/RequestKeyValuePairs/RequestKeyValuePairs';
import { GraphQLFormData } from '@/models/GraphQLFormData';
import { Button, Checkbox, Input } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import CodeMirrorBoard from './components/CodeMirror/CodeMirrorBoard';
import { useGraphQLForm } from './hooks/useGraphQLForm';
import { useSDLAsURL } from './hooks/useSDLAsURL';

interface GraphQLFormProps {
  formData?: GraphQLFormData | null;
}

export function GraphQLForm({ formData }: GraphQLFormProps) {
  const { t } = useTranslation();

  const {
    setExampleFormData,
    getValues,
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    errors,
    onSubmit,
  } = useGraphQLForm(formData || null);

  const { handleSDLChange, isSDLAsURL, URLValue, SDLValue } = useSDLAsURL({
    watch,
    setValue,
  });

  return (
    <form
      className="flex flex-col justify-between gap-4 flex-1 sm:h-full "
      onSubmit={handleSubmit(onSubmit)}
    >
      <main className="flex flex-col flex-wrap md:flex-nowrap gap-4 ">
        <Input
          value={URLValue}
          isRequired
          type="text"
          label="URL"
          placeholder={t('common:urlPlaceholderText')}
          {...register('url')}
          isInvalid={errors.url?.message !== undefined}
          errorMessage={errors.url?.message}
        />

        <Input
          disabled={isSDLAsURL}
          value={isSDLAsURL ? `${URLValue}?sdl` : SDLValue || ''}
          label="SDL"
          placeholder={t('common:SDLPlaceholderText')}
          type="text"
          {...register('sdl')}
          isInvalid={errors.sdl?.message !== undefined}
          errorMessage={errors.sdl?.message}
        />

        <Checkbox
          defaultSelected
          size="sm"
          isSelected={isSDLAsURL}
          onChange={handleSDLChange}
        >
          {t('graphQL:sdlAsUrl')}
        </Checkbox>

        <RequestKeyValuePairs
          type="headers"
          control={control}
          register={register}
          errors={errors}
        />

        <RequestKeyValuePairs
          type="variables"
          control={control}
          register={register}
          errors={errors}
        />

        <CodeMirrorBoard
          getValues={getValues}
          errorMessage={errors.query?.message}
          register={register}
          setValue={setValue}
        />
      </main>

      <footer className="flex gap-1 sm:gap-4">
        <Button onClick={setExampleFormData} color="warning">
          {t('common:FillExampleData')}
        </Button>

        <Button
          color="primary"
          type="submit"
          className="flex-1"
          data-testid="send-button"
        >
          {t('common:Send')}
        </Button>
      </footer>
    </form>
  );
}
