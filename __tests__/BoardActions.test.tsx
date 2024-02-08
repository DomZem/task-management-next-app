import BoardActions from '@/components/BoardActions';
import { BoardNoStatuses } from '@/components/BoardForm/formSchema';
import { TestQueryProvider } from '@/helpers/TestQueryProvider';
import { API_URL } from '@/lib/axios';
import { server } from '@/mocks/server';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

jest.mock('next/navigation', () => ({
  usePathname() {
    return '/boards/1';
  },
  useRouter: jest.fn(),
}));

const getBoard = () => {
  server.use(
    rest.get(`${API_URL}/boards/:id`, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json<BoardNoStatuses>({
          id: 1,
          name: 'Roadmap',
        }),
      );
    }),
  );
};

const waitForContent = async () => {
  await waitFor(() => {
    screen.getByTestId('board-actions-popover-trigger');
  });
};

describe('BoardActions component', () => {
  describe('Unit', () => {
    it('should render PopoverContent after click PopoverTrigger', async () => {
      getBoard();

      render(
        <TestQueryProvider>
          <BoardActions />
        </TestQueryProvider>,
      );

      await waitForContent();

      const popoverTrigger = screen.getByTestId(
        'board-actions-popover-trigger',
      );
      await userEvent.click(popoverTrigger);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should not render EditBoardForm when statuses response has empty array', async () => {
      getBoard();

      render(
        <TestQueryProvider>
          <BoardActions />
        </TestQueryProvider>,
      );

      await waitForContent();

      expect(
        screen.queryByRole('button', {
          name: /edit board/i,
        }),
      ).not.toBeInTheDocument();
    });

    it("should render nothing when board response doesn't have board", async () => {
      const { container } = render(
        <TestQueryProvider>
          <BoardActions />
        </TestQueryProvider>,
      );

      await waitFor(() => {
        expect(container.firstChild).toBeNull();
      });
    });

    it('should render nothing when board response is failed', async () => {
      server.use(
        rest.get(`${API_URL}/boards/:id`, (req, res, ctx) => {
          return res(ctx.status(400));
        }),
      );

      const { container } = render(
        <TestQueryProvider>
          <BoardActions />
        </TestQueryProvider>,
      );

      await waitFor(() => {
        expect(container.firstChild).toBeNull();
      });
    });

    it('should render nothing when statuses response is failed', async () => {
      server.use(
        rest.get(`${API_URL}/statuses`, (req, res, ctx) => {
          return res(ctx.status(400));
        }),
      );

      const { container } = render(
        <TestQueryProvider>
          <BoardActions />
        </TestQueryProvider>,
      );

      await waitFor(() => {
        expect(container.firstChild).toBeNull();
      });
    });

    it('should render nothing when board request is loading', async () => {
      server.use(
        rest.get(`${API_URL}/boards/:id`, (req, res, ctx) => {
          return res(ctx.delay(300));
        }),
      );

      const { container } = render(
        <TestQueryProvider>
          <BoardActions />
        </TestQueryProvider>,
      );

      await waitFor(() => {
        expect(container.firstChild).toBeNull();
      });
    });

    it('should render nothing when statuses request is loading', async () => {
      server.use(
        rest.get(`${API_URL}/statuses`, (req, res, ctx) => {
          return res(ctx.delay(300));
        }),
      );

      const { container } = render(
        <TestQueryProvider>
          <BoardActions />
        </TestQueryProvider>,
      );

      await waitFor(() => {
        expect(container.firstChild).toBeNull();
      });
    });
  });
});
