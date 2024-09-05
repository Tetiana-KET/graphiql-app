import { GraphQLFormData } from '@/models/GraphQLFormData';
import { prettifyCode } from '@/utils/prettifyCode';
import { enqueueSnackbar } from 'notistack';
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

  const prettify = useCallback(() => {
    try {
      const prettified = prettifyCode(query);
      setQuery(prettified);
      setValue('query', prettified);
    } catch (error) {
      enqueueSnackbar(`Failed to prettify the code: ${error}`, {
        variant: 'info',
      });
    }
  }, [query, setValue]);

  return { query, handleBoardValue, prettify };
};
