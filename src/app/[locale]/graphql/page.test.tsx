import { render, screen } from '@testing-library/react';
import GraphPage from './page';

vi.mock(
  './[...slug]/GraphQLForm/components/CodeMirror/CodeMirrorBoard',
  () => ({
    __esModule: true,
    default: () => <div>CodeMirror Mock</div>,
  }),
);

describe('GraphPage component', () => {
  it('renders GraphPage', async () => {
    render(await GraphPage());

    expect(await screen.getByText('URL')).toBeInTheDocument();
    expect(await screen.getByText('SDL')).toBeInTheDocument();
  });
});
