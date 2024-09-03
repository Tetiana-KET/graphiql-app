'use client';

import { json } from '@codemirror/lang-json';
import { Button } from '@nextui-org/react';
import CodeMirror from '@uiw/react-codemirror';
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRestBody } from '@/app/[locale]/rest/hooks/useRestBody';
import { RestFormData } from '@/models/RestFormData';

export interface RestBodyProps {
  getValues: UseFormGetValues<RestFormData>;
  register: UseFormRegister<RestFormData>;
  setValue: UseFormSetValue<RestFormData>;
  errorMessage?: string;
}

export default function RestBody({
  getValues,
  register,
  setValue,
  errorMessage,
}: RestBodyProps) {
  const { handleValue, prettify } = useRestBody({
    setValue,
  });
  const { t } = useTranslation();

  return (
    <div>
      <h4>{t('common:body')}</h4>
      <CodeMirror
        value={getValues('body')}
        {...register('body')}
        extensions={[json()]}
        height="200px"
        onChange={handleValue}
      />

      <div>{errorMessage || ''}</div>

      <div className="flex gap-2">
        <Button
          className="mt-2"
          type="button"
          size="sm"
          color="primary"
          onClick={prettify}
        >
          {t('common:prettifyCode')}
        </Button>
      </div>
    </div>
  );
}
