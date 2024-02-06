import CreateTaskForm from '@/components/TaskForm/CreateTaskForm';
import Toaster from '@/components/UI/Toaster';
import { TestQueryProvider } from '@/helpers/TestQueryProvider';
import { API_URL } from '@/lib/axios';
import { server } from '@/mocks/server';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import toast from 'react-hot-toast';
import { getStatusesSuccess, typeValues } from './TaskFormTemplate.test';

jest.mock('next/navigation', () => ({
  usePathname() {
    return `/boards/1`;
  },
}));

export const waitForAddNewTaskDialogTrigger = async () => {
  await waitFor(() => {
    expect(
      screen.getByRole('button', {
        name: /add new task/i,
      }),
    );
  });
};

export const openAddNewTaskForm = async () => {
  const addNewTaskDialogTrigger = screen.getByRole('button', {
    name: /add new task/i,
  });
  await userEvent.click(addNewTaskDialogTrigger);
};

export const submitCreateTask = async () => {
  const createTaskButton = screen.getByRole('button', {
    name: /create task/i,
  });
  await userEvent.click(createTaskButton);
};

describe('CreateTaskForm component', () => {
  describe('Unit', () => {
    it('should render two DialogTrigger', async () => {
      getStatusesSuccess();

      render(
        <TestQueryProvider>
          <CreateTaskForm />
        </TestQueryProvider>,
      );

      await waitFor(() => {
        expect(
          screen.getByRole('button', {
            name: /add new task/i,
          }),
        );
      });

      expect(
        screen.getByRole('button', {
          name: '',
        }),
      );
    });

    it('should render "add new task" text inside DialogTitle', async () => {
      getStatusesSuccess();

      render(
        <TestQueryProvider>
          <CreateTaskForm />
        </TestQueryProvider>,
      );

      await waitForAddNewTaskDialogTrigger();

      await openAddNewTaskForm();

      expect(
        screen.getByRole('heading', {
          name: /add new task/i,
        }),
      ).toBeInTheDocument();
    });

    it('should render "create task" text inside submit button', async () => {
      getStatusesSuccess();

      render(
        <TestQueryProvider>
          <CreateTaskForm />
        </TestQueryProvider>,
      );

      await waitForAddNewTaskDialogTrigger();

      await openAddNewTaskForm();

      expect(
        screen.getByRole('button', {
          name: /create task/i,
        }),
      ).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    beforeEach(() => {
      toast.remove();
    });

    it('should render "Task has been created" text and clear inputs when respond is success', async () => {
      getStatusesSuccess();

      render(
        <TestQueryProvider>
          <CreateTaskForm />
          <Toaster />
        </TestQueryProvider>,
      );

      await waitForAddNewTaskDialogTrigger();

      await openAddNewTaskForm();

      const { titleInput, subtaskTitle } = await typeValues();

      await submitCreateTask();

      expect(screen.getByText('Task has been created')).toBeInTheDocument();
      expect(titleInput).toHaveTextContent('');
      expect(subtaskTitle).toHaveTextContent('');
    });

    it('should render "Something went wrong" text and not clear inputs when respond is failed', async () => {
      server.use(
        rest.post(`${API_URL}/tasks`, (req, res, ctx) => {
          return res(ctx.status(403));
        }),
      );

      getStatusesSuccess();

      render(
        <TestQueryProvider>
          <CreateTaskForm />
          <Toaster />
        </TestQueryProvider>,
      );

      await waitForAddNewTaskDialogTrigger();

      await openAddNewTaskForm();

      await typeValues();

      await submitCreateTask();

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('should render "Creating task ..." text and disable submit button when request is loading', async () => {
      getStatusesSuccess();

      server.use(
        rest.post(`${API_URL}/tasks`, (req, res, ctx) => {
          return res(ctx.delay(300));
        }),
      );

      render(
        <TestQueryProvider>
          <CreateTaskForm />
          <Toaster />
        </TestQueryProvider>,
      );

      await waitForAddNewTaskDialogTrigger();

      await openAddNewTaskForm();

      await typeValues();

      await submitCreateTask();

      expect(screen.getByText('Creating task ...')).toBeInTheDocument();
    });
  });
});
