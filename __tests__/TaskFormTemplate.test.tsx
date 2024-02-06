import { Status } from '@/components/BoardForm/formSchema';
import TaskFormTemplate from '@/components/TaskForm/TaskFormTemplate';
import { Task } from '@/components/TaskForm/formSchema';
import { colors } from '@/data/colors';
import { TestQueryProvider } from '@/helpers/TestQueryProvider';
import { API_URL } from '@/lib/axios';
import { createStringWithLength } from '@/lib/utils';
import { server } from '@/mocks/server';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import {
  openAddNewTaskForm,
  submitCreateTask,
  waitForAddNewTaskDialogTrigger,
} from './CreateTaskForm.test';

jest.mock('next/navigation', () => ({
  usePathname() {
    return '/boards/1';
  },
}));

export const getStatusesSuccess = () => {
  server.use(
    rest.get(`${API_URL}/statuses`, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json<Status[]>([
          {
            id: 1,
            name: 'todo',
            color: colors[0].value,
          },
        ]),
      );
    }),
  );
};

const emptyValues: Task = {
  id: 0,
  title: '',
  description: '',
  subtasks: [
    {
      id: 0,
      title: '',
      isComplete: false,
    },
  ],
  statusId: 0,
};

const mockHandleSubmit = jest.fn();

export const typeValues = async () => {
  const titleInput = screen.getByLabelText('title');
  await userEvent.type(titleInput, 'Design onboarding flow');

  const subtaskTitle = screen.getByLabelText('subtask title - 0');
  await userEvent.type(
    subtaskTitle,
    'Define API endpoints for search functionality',
  );

  return {
    titleInput,
    subtaskTitle,
  };
};

describe('TaskFormTemplate component', () => {
  describe('Unit', () => {
    it('should disable DialogTrigger with "add new task" text inside when variant prop is "create" and statuses array is empty', async () => {
      render(
        <TestQueryProvider>
          <TaskFormTemplate
            variant="create"
            defaultValues={emptyValues}
            onSubmit={mockHandleSubmit}
            isPending={false}
            isSuccess={false}
          />
        </TestQueryProvider>,
      );

      await waitFor(() => {
        expect(
          screen.getByRole('button', {
            name: /add new task/i,
          }),
        ).toBeDisabled();
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
          <TaskFormTemplate
            variant="create"
            defaultValues={emptyValues}
            onSubmit={mockHandleSubmit}
            isPending={false}
            isSuccess={false}
          />
        </TestQueryProvider>,
      );

      await waitFor(() => {
        expect(container.firstChild).toBeNull();
      });
    });

    it('should render nothing when statuses array is empty', async () => {
      server.use(
        rest.get(`${API_URL}/statuses`, (req, res, ctx) => {
          return res(ctx.status(200), ctx.json<Status[]>([]));
        }),
      );

      const { container } = render(
        <TestQueryProvider>
          <TaskFormTemplate
            variant="create"
            defaultValues={emptyValues}
            onSubmit={mockHandleSubmit}
            isPending={false}
            isSuccess={false}
          />
        </TestQueryProvider>,
      );

      await waitFor(() => {
        expect(container.firstChild).toBeNull();
      });
    });

    it('should render nothing when statuses request is failed', async () => {
      server.use(
        rest.get(`${API_URL}/statuses`, (req, res, ctx) => {
          return res(ctx.status(400));
        }),
      );

      const { container } = render(
        <TestQueryProvider>
          <TaskFormTemplate
            variant="create"
            defaultValues={emptyValues}
            onSubmit={mockHandleSubmit}
            isPending={false}
            isSuccess={false}
          />
        </TestQueryProvider>,
      );

      await waitFor(() => {
        expect(container.firstChild).toBeNull();
      });
    });

    describe('Validation', () => {
      it(`should render "Can't be empty" text when value in title input is empty`, async () => {
        getStatusesSuccess();

        render(
          <TestQueryProvider>
            <TaskFormTemplate
              variant="create"
              defaultValues={emptyValues}
              onSubmit={mockHandleSubmit}
              isPending={false}
              isSuccess={false}
            />
          </TestQueryProvider>,
        );

        await waitForAddNewTaskDialogTrigger();

        await openAddNewTaskForm();

        await submitCreateTask();

        expect(screen.getByTestId('title-error-message')).toHaveTextContent(
          "Can't be empty",
        );
      });

      it('should render "Max 100 characters" when value length in title input is grater than 50 characters', async () => {
        getStatusesSuccess();

        render(
          <TestQueryProvider>
            <TaskFormTemplate
              variant="create"
              defaultValues={{
                ...emptyValues,
                title: createStringWithLength(101),
              }}
              onSubmit={mockHandleSubmit}
              isPending={false}
              isSuccess={false}
            />
          </TestQueryProvider>,
        );

        await waitForAddNewTaskDialogTrigger();

        await openAddNewTaskForm();

        await submitCreateTask();

        expect(screen.getByTestId('title-error-message')).toHaveTextContent(
          'Max 100 characters',
        );
      });
    });
  });
});
