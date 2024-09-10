import { GraphQLFormData } from '@/models/GraphQLFormData';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';
import CodeMirrorBoard from './CodeMirrorBoard';

const mockGetValues: UseFormGetValues<GraphQLFormData> = vi
  .fn()
  .mockReturnValue('some query');
const mockRegister: UseFormRegister<GraphQLFormData> = vi.fn();
const mockSetValue: UseFormSetValue<GraphQLFormData> = vi.fn();
const mockPrettify = vi.fn();

vi.mock('./hooks/useCodeMirrorBoard', () => ({
  useCodeMirrorBoard: () => ({
    handleBoardValue: vi.fn(),
    prettify: mockPrettify,
  }),
}));

vi.mock('@uiw/react-codemirror', () => ({
  __esModule: true,
  default: () => <div>CodeMirror Mock</div>,
}));

describe('CodeMirrorBoard', () => {
  it('Renders the CodeMirrorBoard component correctly', () => {
    render(
      <CodeMirrorBoard
        getValues={mockGetValues}
        register={mockRegister}
        setValue={mockSetValue}
        errorMessage=""
      />,
    );

    const headingElement = screen.getByText(/queries/i);
    expect(headingElement).toBeInTheDocument();
  });
  it('Prettify code button is calling related function', () => {
    render(
      <CodeMirrorBoard
        getValues={mockGetValues}
        register={mockRegister}
        setValue={mockSetValue}
        errorMessage=""
      />,
    );

    const prettifyCodeButton = screen.getByText('common:prettifyCode');
    fireEvent.click(prettifyCodeButton);
    expect(mockPrettify).toBeCalled();
  });
});
