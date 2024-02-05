import { BoardNoStatuses } from '@/components/BoardForm/formSchema';
import MenuList from '@/components/MenuList';
import { TestQueryProvider } from '@/helpers/TestQueryProvider';
import { API_URL } from '@/lib/axios';
import { server } from '@/mocks/server';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
  usePathname() {
    return `/boards/1`;
  },
}));

describe('MenuList component', () => {
  describe('Unit', () => {
    it('should open "CreateBoardForm" after click "+ create new board" button', async () => {
      render(
        <TestQueryProvider>
          <MenuList />
        </TestQueryProvider>,
      );

      await waitFor(() => {
        screen.getByRole('button');
      });

      const createBoardFormButton = screen.getByRole('button');
      await userEvent.click(createBoardFormButton);

      expect(
        screen.getByRole('button', {
          name: /create new board/i,
        }),
      ).toBeInTheDocument();
    });

    it('should render "all boards (2)" text and two "MenuListItem" when response contains two boards', async () => {
      server.use(
        rest.get(`${API_URL}/boards`, (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json<BoardNoStatuses[]>([
              {
                id: 1,
                name: 'Platform Launch',
              },
              {
                id: 2,
                name: 'Roadmap',
              },
            ]),
          );
        }),
      );

      render(
        <TestQueryProvider>
          <MenuList />
        </TestQueryProvider>,
      );

      await waitFor(() => {
        expect(screen.getByText('all boards (2)')).toBeInTheDocument();
      });

      expect(screen.getAllByRole('link')).toHaveLength(2);
    });

    it('should render "all boards (0)" text and any "MenuListItem" when response contains empty array', async () => {
      server.use(
        rest.get(`${API_URL}/boards`, (req, res, ctx) => {
          return res(ctx.status(200), ctx.json<BoardNoStatuses[]>([]));
        }),
      );

      render(
        <TestQueryProvider>
          <MenuList />
        </TestQueryProvider>,
      );

      await waitFor(() => {
        expect(screen.getByText('all boards (0)')).toBeInTheDocument();
      });

      expect(screen.queryAllByRole('link')).toHaveLength(0);
    });

    it('should render "Something went wrong during fetch boards" text when response is failed', async () => {
      server.use(
        rest.get(`${API_URL}/boards`, (req, res, ctx) => {
          return res(ctx.status(403));
        }),
      );

      render(
        <TestQueryProvider>
          <MenuList />
        </TestQueryProvider>,
      );

      await waitFor(() => {
        expect(
          screen.getByText('Something went wrong during fetch boards'),
        ).toBeInTheDocument();
      });
    });

    it('should render "Loading" when request is loading', async () => {
      server.use(
        rest.get(`${API_URL}/boards`, (req, res, ctx) => {
          return res(ctx.delay(300));
        }),
      );

      render(
        <TestQueryProvider>
          <MenuList />
        </TestQueryProvider>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toBeInTheDocument();
      });
    });
  });
});
