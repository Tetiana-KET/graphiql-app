import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import {
  mockDocumentationResponse,
  mockEmptyDocumentationResponse,
} from '../../../../../../../../__tests__/msw/mock';
import { RequestDocumentation } from './RequestDocumentation';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('@uiw/react-codemirror', () => ({
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

  it('Show special text when there are no documentation schema', () => {
    render(<RequestDocumentation response={mockEmptyDocumentationResponse} />);

    expect(screen.getByText('graphQL:docResponse')).toBeInTheDocument();
  });

  it('Render as expected with documentation schema', () => {
    render(<RequestDocumentation response={mockDocumentationResponse} />);

    expect(screen.getByText('CodeMirror Mock')).toBeInTheDocument();
  });
});
