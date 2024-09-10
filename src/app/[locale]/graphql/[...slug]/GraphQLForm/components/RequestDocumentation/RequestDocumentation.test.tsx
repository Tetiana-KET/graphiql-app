import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { mockEmptyDocumentationResponse } from '../../../../../../../../__tests__/msw/mock';
import { RequestDocumentation } from './RequestDocumentation';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('../CodeMirror/CodeMirrorBoard', () => ({
  __esModule: true,
  default: () => <div>CodeMirror Mock</div>,
}));

vi.mock('@/utils/checkErrorInstance', () => ({
  checkErrorInstance: vi.fn(),
}));

describe('RequestDocumentation Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  // Разобраться как рендарить code mirror в тестах, чтобы проверить с респонсом
  it('show special text when there are no documentation schema', () => {
    render(<RequestDocumentation response={mockEmptyDocumentationResponse} />);

    expect(screen.getByText('graphQL:docResponse')).toBeInTheDocument();
  });
});
