import { GraphQLFormData } from '@/models/FormInterfaces';
import { useCallback, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { prettifyCode } from '@/utils/prettifyCode';

interface UseCodeMirrorBoardProps {
  setValue: UseFormSetValue<GraphQLFormData>;
}

export const useCodeMirrorBoard = ({ setValue }: UseCodeMirrorBoardProps) => {
  const [query, setQuery] = useState('');

  const handleBoardValue = (value: string) => {
    setQuery(value);
    setValue('query', value);
  };

  const prettify = useCallback(() => {
    try {
      const prettified = prettifyCode(query);
      setQuery(prettified);
      setValue('query', prettified);
    } catch (error) {
      console.error('Failed to prettify the code:', error);
    }
  }, [query, setValue]);

  return { query, handleBoardValue, prettify };
};
