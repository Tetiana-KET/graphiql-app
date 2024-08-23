import { GraphQLFormData } from '@/models/FormInterfaces';
import { useCallback, useEffect, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';

const DEFAULT_GRAPHQL_QUERY = `
    query GetUser {
      user(id: "1") {
        id
        name
        email
      }
    }
  `;

interface UseCodeMirrorBoardProps {
  setValue: UseFormSetValue<GraphQLFormData>;
}

export const useCodeMirrorBoard = ({ setValue }: UseCodeMirrorBoardProps) => {
  const [query, setQuery] = useState(DEFAULT_GRAPHQL_QUERY);

  useEffect(() => {
    setValue('query', query);
  }, [query, setValue]);

  const handleBoardValue = (value: string) => {
    setQuery(value);
  };

  const customPrettifyGQL = (qglQuery: string): string => {
    return qglQuery
      .split('\n')
      .map((line) => line.trim())
      .map((line) => {
        if (line.startsWith('}')) {
          return `  ${line}`;
        }
        if (line.startsWith('query') || line.startsWith('mutation')) {
          return line;
        }
        return `    ${line}`;
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
