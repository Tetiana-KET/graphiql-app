import { GraphQLFormData } from '@/models/FormInterfaces';
import { customPrettifyGraphQL } from '@/utils/customPrettifyGraphQL';
import { useCallback, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';

interface UseCodeMirrorBoardProps {
  setValue: UseFormSetValue<GraphQLFormData>;
}

export const useCodeMirrorBoard = ({ setValue }: UseCodeMirrorBoardProps) => {
  const [query, setQuery] = useState('');

  const handleBoardValue = (value: string) => {
    setQuery(value);
    setValue('query', value);
  };

  const prettifyCode = useCallback(() => {
    try {
      const prettified = customPrettifyGraphQL(query);
      setQuery(prettified);
      setValue('query', prettified);
    } catch (error) {
      console.error('Failed to prettify the code:', error);
    }
  }, [query, setValue]);

  return { query, handleBoardValue, prettifyCode };
};
