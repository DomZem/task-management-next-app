import StatusListItem from '@/components/StatusListItem';
import { TaskNoSubtasks } from '@/components/TaskForm/formSchema';
import { colors } from '@/data/colors';
import { TestQueryProvider } from '@/helpers/TestQueryProvider';
import { API_URL } from '@/lib/axios';
import { server } from '@/mocks/server';
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';

describe('StatusListItem component', () => {
  describe('Unit', () => {
    it('should render "todo (2)" text when status prop has name field set on "todo" and tasks array has two elements', async () => {
      server.use(
        rest.get(`${API_URL}/tasks`, (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json<TaskNoSubtasks[]>([
              {
                id: 1,
                title: 'Build Settings UI',
                description: '',
                statusId: 1,
              },
              {
                id: 2,
                title: 'Build UI For Search',
                description: '',
                statusId: 1,
              },
            ]),
          );
        }),
      );

      render(
        <TestQueryProvider>
          <StatusListItem
            status={{
              id: 1,
              name: 'todo',
              color: colors[0].value,
            }}
          />
        </TestQueryProvider>,
      );

      await waitFor(() => {
        expect(screen.getByText('todo (2)')).toBeInTheDocument();
      });
    });

    it('should render "todo (0)" text when status prop has name field set on "todo" and tasks array is empty', async () => {
      render(
        <TestQueryProvider>
          <StatusListItem
            status={{
              id: 2,
              name: 'todo',
              color: colors[0].value,
            }}
          />
        </TestQueryProvider>,
      );

      await waitFor(() => {
        expect(screen.getByText('todo (0)')).toBeInTheDocument();
      });
    });

    it('should render "TaskList" when tasks array is no empty', async () => {
      server.use(
        rest.get(`${API_URL}/tasks`, (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json<TaskNoSubtasks[]>([
              {
                id: 1,
                title: 'Build Settings UI',
                description: '',
                statusId: 3,
              },
            ]),
          );
        }),
      );

      render(
        <TestQueryProvider>
          <StatusListItem
            status={{
              id: 3,
              name: 'todo',
              color: colors[0].value,
            }}
          />
        </TestQueryProvider>,
      );

      await waitFor(() => {
        screen.getByText('todo (1)');
      });

      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('should not render "TaskList" when tasks array is empty', async () => {
      render(
        <TestQueryProvider>
          <StatusListItem
            status={{
              id: 4,
              name: 'todo',
              color: colors[0].value,
            }}
          />
        </TestQueryProvider>,
      );

      await waitFor(() => {
        screen.getByText('todo (0)');
      });

      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

    it('should render "Something went wrong during fetch tasks" text when response is failed', async () => {
      server.use(
        rest.get(`${API_URL}/tasks`, (req, res, ctx) => {
          return res(ctx.status(403));
        }),
      );

      render(
        <TestQueryProvider>
          <StatusListItem
            status={{
              id: 5,
              name: 'todo',
              color: colors[0].value,
            }}
          />
        </TestQueryProvider>,
      );

      await waitFor(() => {
        expect(
          screen.getByText('Something went wrong during fetch tasks'),
        ).toBeInTheDocument();
      });
    });

    it('should render "StatusListItemSkeleton" when request is loading', () => {
      server.use(
        rest.get(`${API_URL}/tasks`, (req, res, ctx) => {
          return res(ctx.delay(300));
        }),
      );

      render(
        <TestQueryProvider>
          <StatusListItem
            status={{
              id: 6,
              name: 'todo',
              color: colors[0].value,
            }}
          />
        </TestQueryProvider>,
      );

      expect(
        screen.getByTestId('status-list-item-skeleton'),
      ).toBeInTheDocument();
    });
  });
});
