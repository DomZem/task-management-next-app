import { BoardNoStatuses, Status } from '@/components/BoardForm/formSchema';
import StatusList from '@/components/StatusList';
import { colors } from '@/data/colors';
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

const getStatuses = () => {
  server.use(
    rest.get(`${API_URL}/statuses`, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json<Status[]>([
          {
            id: 1,
            name: 'Todo',
            color: colors[0].value,
          },
        ]),
      );
    }),
  );
};

describe('StatusList component', () => {
  describe('Unit', () => {
    it('should render StatusList when board response is success and statuses response has at least one status', async () => {
      getBoard();
      getStatuses();

      render(
        <TestQueryProvider>
          <StatusList />
        </TestQueryProvider>,
      );

      await waitFor(() => {
        expect(screen.getByRole('list')).toBeInTheDocument();
      });
    });

    it('should open EditBoardForm after click DialogTrigger when all responses are successful', async () => {
      getBoard();
      getStatuses();

      render(
        <TestQueryProvider>
          <StatusList />
        </TestQueryProvider>,
      );

      await waitFor(() => {
        screen.getByRole('list');
      });

      const dialogTrigger = screen.getByRole('button', {
        name: /new column/i,
      });
      await userEvent.click(dialogTrigger);

      expect(
        screen.getByRole('heading', {
          name: /edit board/i,
        }),
      ).toBeInTheDocument();
    });

    it('should render BoardEmpty when board response is success and statuses response has empty array', async () => {
      getBoard();

      render(
        <TestQueryProvider>
          <StatusList />
        </TestQueryProvider>,
      );

      await waitFor(() => {
        expect(
          screen.getByText(
            'This board is empty. Create a new column to get started.',
          ),
        ).toBeInTheDocument();
      });
    });

    it('should render Loading when board request is loading', async () => {
      server.use(
        rest.get(`${API_URL}/boards/:id`, (req, res, ctx) => {
          return res(ctx.delay(300));
        }),
      );

      render(
        <TestQueryProvider>
          <StatusList />
        </TestQueryProvider>,
      );

      expect(screen.getByTestId('status-list-loading')).toBeInTheDocument();
    });

    it('should render Loading when statuses request is loading', () => {
      server.use(
        rest.get(`${API_URL}/statuses`, (req, res, ctx) => {
          return res(ctx.delay(300));
        }),
      );

      render(
        <TestQueryProvider>
          <StatusList />
        </TestQueryProvider>,
      );

      expect(screen.getByTestId('status-list-loading')).toBeInTheDocument();
    });
  });
});
