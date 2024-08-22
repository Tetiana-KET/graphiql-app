'use client';

import { GraphQLFormData } from '@/models/FormInterfaces';
import { javascript } from '@codemirror/lang-javascript';
import { Button } from '@nextui-org/react';
import CodeMirror from '@uiw/react-codemirror';
import { useCallback, useState } from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface CodeMirrorBoardProps {
  register: UseFormRegister<GraphQLFormData>;
  setValue: UseFormSetValue<GraphQLFormData>;
}

const DEFAULT_GRAPHQL_QUERY = `
    query GetUser {
      user(id: "1") {
        id
        name
        email
      }
    }
  `;

function CodeMirrorBoard({ register, setValue }: CodeMirrorBoardProps) {
  const [query, setQuery] = useState(DEFAULT_GRAPHQL_QUERY);

  const onChange = useCallback(
    (value: string) => {
      setQuery(value);
      setValue('query', JSON.stringify(query));
    },
    [query, setValue],
  );

  const manualPrettify = (qglQuery: string): string => {
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
      const prettified = manualPrettify(query);
      setQuery(prettified);
      setValue('query', prettified);
    } catch (error) {
      console.error('Failed to prettify the code:', error);
    }
  }, [query, setValue]);

  return (
    <div>
      <CodeMirror
        {...register('query')}
        value={query}
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
      />
      <div className="flex gap-2">
        <Button
          className="mt-2"
          type="button"
          size="sm"
          color="primary"
          onClick={prettifyCode}
        >
          Prettify Code
        </Button>
      </div>
    </div>
  );
}

export default CodeMirrorBoard;
