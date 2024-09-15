import { GraphQLFormData } from '@/models/GraphQLFormData';
import { fireEvent, render, screen } from '@testing-library/react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';
import { RequestKeyValuePairs } from './RequestKeyValuePairs';

const mockType = 'variables';
const mockRegister: UseFormRegister<GraphQLFormData> = vi.fn();
const mockControl = {
  _subjects: {},
  _removeUnmounted: vi.fn(),
  _names: {},
  _state: {},
} as unknown as Control<GraphQLFormData>;
const mockErrors: FieldErrors<GraphQLFormData> = {};

const appendMock = vi.fn();
const removeMock = vi.fn();

vi.mock('react-hook-form', () => ({
  useFieldArray: () => ({
    fields: [
      { id: '1', key: 'id', value: '1' },
      { id: '2', key: 'id', value: '2' },
    ],
    append: appendMock,
    remove: removeMock,
  }),
}));

describe('CodeMirrorBoard', () => {
  it('Renders the CodeMirrorBoard component correctly', () => {
    render(
      <RequestKeyValuePairs
        errors={mockErrors}
        type={mockType}
        register={mockRegister}
        control={mockControl}
      />,
    );

    const header = screen.getByText('common:variables');
    const allFields = screen.getAllByText('common:value');
    expect(allFields.length).toBe(2);
    expect(header).toBeInTheDocument();
  });

  it('should call add function on click on related button', () => {
    render(
      <RequestKeyValuePairs
        errors={mockErrors}
        type={mockType}
        register={mockRegister}
        control={mockControl}
      />,
    );

    const addButton = screen.getByText('common:add');
    fireEvent.click(addButton);
    expect(appendMock).toBeCalled();
  });
});
