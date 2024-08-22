'use client';

import { Button, Checkbox, Input } from '@nextui-org/react';
import { useGraphQLForm } from '../../hooks/useGraphQLForm';
import { useSDLAsURL } from '../../hooks/useSDLAsURL';
import CodeMirrorBoard from './components/CodeMirror/CodeMirrorBoard';

export function GraphQLForm() {
  const { register, watch, setValue, handleSubmit, errors, onSubmit } =
    useGraphQLForm();

  const { handleSDLChange, isSDLAsURL, URLValue, SDLValue } = useSDLAsURL({
    watch,
    setValue,
  });

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            isRequired
            type="text"
            label="URL"
            placeholder="Enter your URL"
            {...register('URL')}
            errorMessage={errors.URL?.message}
          />
          <Input
            disabled={isSDLAsURL}
            value={isSDLAsURL ? `${URLValue}?sdl` : SDLValue || ''}
            label="SDL"
            placeholder="Enter your SDL"
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
            URL and SDL are the same
          </Checkbox>
          <h4>Passe your queries</h4>
          <CodeMirrorBoard register={register} setValue={setValue} />
          <div className="flex gap-2 justify-end">
            <Button fullWidth color="primary" type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
