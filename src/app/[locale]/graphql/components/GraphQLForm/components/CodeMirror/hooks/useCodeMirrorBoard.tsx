import { GraphQLFormData } from '@/models/FormInterfaces';
import { useCallback, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';

interface UseCodeMirrorBoardProps {
  setValue: UseFormSetValue<GraphQLFormData>;
}

export const useCodeMirrorBoard = ({ setValue }: UseCodeMirrorBoardProps) => {
  const [query, setQuery] = useState('');

  const handleBoardValue = (value: string) => {
    setQuery(value);
  };

  const customPrettifyGQL = (gqlQuery: string): string => {
    let indentLevel = 0;
    const indentSize = 2;

    return gqlQuery
      .split('\n')
      .map((line) => line.trim())
      .map((line) => {
        if (line.startsWith('}')) {
          indentLevel -= 1;
        }

        const formattedLine = ' '.repeat(indentLevel * indentSize) + line;

        if (line.endsWith('{')) {
          indentLevel += 1;
        }

        return formattedLine;
      })
      .join('\n');
  };

  const prettifyCode = useCallback(() => {
    try {
      const prettified = customPrettifyGQL(query);
      setQuery(prettified);
      setValue('query', prettified);
    } catch (error) {
      console.error('Failed to prettify the code:', error);
    }
  }, [query, setValue]);

  return { query, handleBoardValue, prettifyCode };
};
