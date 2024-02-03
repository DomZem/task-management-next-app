import { BoardNoStatuses } from '@/components/BoardForm/formSchema';
import BoardTitle from '@/components/BoardTitle';
import { TestQueryProvider } from '@/helpers/TestQueryProvider';
import { API_URL } from '@/lib/axios';
import { server } from '@/mocks/server';
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';

let boardId = 1;

jest.mock('next/navigation', () => ({
  usePathname() {
    return `/boards/${boardId}`;
  },
}));

describe('BoardTitle component', () => {
  describe('Unit', () => {
    afterEach(() => {
      boardId++;
    });

    it('should render "Platform Launch" text when response is success', async () => {
      server.use(
        rest.get(`${API_URL}/boards/:id`, (req, res, ctx) => {
          return res(
            ctx.json<BoardNoStatuses>({
              id: boardId,
              name: 'Platform Launch',
            }),
          );
        }),
      );

      render(
        <TestQueryProvider>
          <BoardTitle />
        </TestQueryProvider>,
      );

      await waitFor(() => {
        expect(screen.getByText('Platform Launch')).toBeInTheDocument();
      });
    });

    it('should render "Skeleton" when request is loading', async () => {
      server.use(
        rest.get(`${API_URL}/boards/:id`, (req, res, ctx) => {
          return res(ctx.delay(300));
        }),
      );

      render(
        <TestQueryProvider>
          <BoardTitle />
        </TestQueryProvider>,
      );

      expect(screen.getByTestId('loading')).toBeInTheDocument();
    });
  });
});
