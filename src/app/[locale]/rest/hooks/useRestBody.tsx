import { prettifyCode } from '@/utils/prettifyCode';
import { useCallback, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { RestFormData } from '@/models/RestFormData';

interface UseCodeMirrorBoardProps {
  setValue: UseFormSetValue<RestFormData>;
}

export const useRestBody = ({ setValue }: UseCodeMirrorBoardProps) => {
  const [body, setBody] = useState('');

  const handleValue = (value: string) => {
    setBody(value);
    setValue('body', value);
  };

  const prettify = useCallback(() => {
    try {
      const prettified = prettifyCode(body);
      setBody(prettified);
      setValue('body', prettified);
    } catch (error) {
      console.error('Failed to prettify the code:', error);
    }
  }, [body, setValue]);

  return { handleValue, prettify };
};
