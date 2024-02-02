import { Subtask } from '@/components/TaskForm/formSchema';
import TaskListItem from '@/components/TaskListItem';
import { TestQueryProvider } from '@/helpers/TestQueryProvider';
import { API_URL } from '@/lib/axios';
import { server } from '@/mocks/server';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

jest.mock('next/navigation', () => ({
  usePathname() {
    return 'boards/1';
  },
}));

describe('TaskListItem component', () => {
  describe('Unit', () => {
    it('should render "Build UI For Search" text when task prop has title field set on "Build UI For Search"', async () => {
      render(
        <TestQueryProvider>
          <TaskListItem
            task={{
              id: 1,
              title: 'Build UI For Search',
              description: '',
              statusId: 1,
            }}
          />
        </TestQueryProvider>,
      );

      await waitFor(() => {
        expect(screen.getByText('Build UI For Search')).toBeInTheDocument();
      });
    });

    it('should render "TaskListItemContent" when after click "DialogTrigger"', async () => {
      render(
        <TestQueryProvider>
          <TaskListItem
            task={{
              id: 1,
              title: 'Build UI For Search',
              description: '',
              statusId: 1,
            }}
          />
        </TestQueryProvider>,
      );

      await waitFor(() => {
        screen.getByText('Build UI For Search');
      });

      // open modal
      const dialogTrigger = screen.getByRole('listitem');
      await userEvent.click(dialogTrigger);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should render "0 of 0 subtasks" text when response has subtasks array is empty', async () => {
      render(
        <TestQueryProvider>
          <TaskListItem
            task={{
              id: 1,
              title: 'Build UI For Search',
              description: '',
              statusId: 1,
            }}
          />
        </TestQueryProvider>,
      );

      await waitFor(() => {
        screen.getByText('Build UI For Search');
      });

      expect(screen.getByText('0 of 0 subtasks')).toBeInTheDocument();
    });

    it('should render "2 of 3 subtasks" text when response has subtasks array which contains two completed subtasks of three', async () => {
      server.use(
        rest.get(`${API_URL}/subtasks`, (req, res, ctx) => {
          return res(
            ctx.json<Subtask[]>([
              {
                id: 1,
                title: 'Sketch UI concepts for settings page',
                isComplete: true,
              },
              {
                id: 2,
                title: 'Implement token-based authentication logic',
                isComplete: true,
              },
              {
                id: 3,
                title: 'Research competing products and services',
                isComplete: false,
              },
            ]),
          );
        }),
      );

      render(
        <TestQueryProvider>
          <TaskListItem
            task={{
              id: 2,
              title: 'Build UI For Search',
              description: '',
              statusId: 1,
            }}
          />
        </TestQueryProvider>,
      );

      await waitFor(() => {
        screen.getByText('Build UI For Search');
      });

      expect(screen.getByText('2 of 3 subtasks')).toBeInTheDocument();
    });

    it('should render "2 of 2 subtasks" text when response has subtasks array which contains two completed subtasks of two', async () => {
      server.use(
        rest.get(`${API_URL}/subtasks`, (req, res, ctx) => {
          return res(
            ctx.json<Subtask[]>([
              {
                id: 1,
                title: 'Sketch UI concepts for settings page',
                isComplete: true,
              },
              {
                id: 2,
                title: 'Implement token-based authentication logic',
                isComplete: true,
              },
            ]),
          );
        }),
      );

      render(
        <TestQueryProvider>
          <TaskListItem
            task={{
              id: 3,
              title: 'Build UI For Search',
              description: '',
              statusId: 1,
            }}
          />
        </TestQueryProvider>,
      );

      await waitFor(() => {
        screen.getByText('Build UI For Search');
      });

      expect(screen.getByText('2 of 2 subtasks')).toBeInTheDocument();
    });

    it('should render "Something went wrong during fetch subtasks" text when response is failed', async () => {
      server.use(
        rest.get(`${API_URL}/subtasks`, (req, res, ctx) => {
          return res(ctx.status(403));
        }),
      );

      render(
        <TestQueryProvider>
          <TaskListItem
            task={{
              id: 4,
              title: 'Build UI For Search',
              description: '',
              statusId: 1,
            }}
          />
        </TestQueryProvider>,
      );

      await waitFor(() => {
        expect(
          screen.getByText('Something went wrong during fetch subtasks'),
        ).toBeInTheDocument();
      });
    });

    it('should render "TaskListItemSkeleton" when request is loading', async () => {
      server.use(
        rest.get(`${API_URL}/subtasks`, (req, res, ctx) => {
          return res(ctx.delay(300));
        }),
      );

      render(
        <TestQueryProvider>
          <TaskListItem
            task={{
              id: 5,
              title: 'Build UI For Search',
              description: '',
              statusId: 1,
            }}
          />
        </TestQueryProvider>,
      );

      expect(screen.getByTestId('task-list-item-skeleton')).toBeInTheDocument();
    });
  });
});
