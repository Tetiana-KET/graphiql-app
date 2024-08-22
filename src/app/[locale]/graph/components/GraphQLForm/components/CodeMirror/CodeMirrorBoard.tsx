'use client';

import { GraphQLFormData } from '@/models/FormInterfaces';
import { javascript } from '@codemirror/lang-javascript';
import { Button } from '@nextui-org/react';
import CodeMirror from '@uiw/react-codemirror';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { useCodeMirrorBoard } from '../../hooks/useCodeMirrorBoard';

export interface CodeMirrorBoardProps {
  register: UseFormRegister<GraphQLFormData>;
  setValue: UseFormSetValue<GraphQLFormData>;
}

function CodeMirrorBoard({ register, setValue }: CodeMirrorBoardProps) {
  const { query, handleBoardValue, prettifyCode } = useCodeMirrorBoard({
    setValue,
  });

  return (
    <div>
      <CodeMirror
        {...register('query')}
        value={query}
        extensions={[javascript({ jsx: true })]}
        onChange={handleBoardValue}
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
