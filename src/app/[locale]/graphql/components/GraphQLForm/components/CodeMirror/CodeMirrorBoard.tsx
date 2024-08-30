'use client';

import { GraphQLFormData } from '@/models/FormInterfaces';
import { javascript } from '@codemirror/lang-javascript';
import { Button } from '@nextui-org/react';
import CodeMirror from '@uiw/react-codemirror';
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useCodeMirrorBoard } from './hooks/useCodeMirrorBoard';

export interface CodeMirrorBoardProps {
  getValues: UseFormGetValues<GraphQLFormData>;
  register: UseFormRegister<GraphQLFormData>;
  setValue: UseFormSetValue<GraphQLFormData>;
  errorMessage?: string;
}

function CodeMirrorBoard({
  getValues,
  register,
  setValue,
  errorMessage,
}: CodeMirrorBoardProps) {
  const { handleBoardValue, prettifyCode } = useCodeMirrorBoard({
    setValue,
  });
  const { t } = useTranslation();

  return (
    <div>
      <h4>{t('common:queries')}</h4>
      <CodeMirror
        value={getValues('query')}
        {...register('query')}
        extensions={[javascript({ jsx: true })]}
        onChange={handleBoardValue}
      />
      <div>{errorMessage || ''}</div>
      <div className="flex gap-2">
        <Button
          className="mt-2"
          type="button"
          size="sm"
          color="primary"
          onClick={prettifyCode}
        >
          {t('common:prettifyCode')}
        </Button>
      </div>
    </div>
  );
}

export default CodeMirrorBoard;
