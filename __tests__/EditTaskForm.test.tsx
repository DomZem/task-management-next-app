import EditTaskForm from '@/components/TaskForm/EditTaskForm';
import { Subtask, TaskNoSubtasks } from '@/components/TaskForm/formSchema';
import Toaster from '@/components/UI/Toaster';
import { TestQueryProvider } from '@/helpers/TestQueryProvider';
import { API_URL } from '@/lib/axios';
import { server } from '@/mocks/server';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import toast from 'react-hot-toast';
import { getStatusesSuccess } from './TaskFormTemplate.test';

jest.mock('next/navigation', () => ({
  usePathname() {
    return '/boards/1';
  },
}));

const task: TaskNoSubtasks = {
  id: 1,
  title: 'Build UI for search',
  description: '',
  statusId: 1,
};

const subtasks: Subtask[] = [
  {
    id: 1,
    title: 'Research UI design patterns for onboarding flow',
    isComplete: false,
  },
];

const waitForEditTaskDialogTrigger = async () => {
  await waitFor(() => {
    expect(
      screen.getByRole('button', {
        name: /edit task/i,
      }),
    );
  });
};

const openEditTaskForm = async () => {
  const editTaskDialogTrigger = screen.getByRole('button', {
    name: /edit task/i,
  });
  await userEvent.click(editTaskDialogTrigger);
};

const submitEditTask = async () => {
  const saveChangesButton = screen.getByRole('button', {
    name: /save changes/i,
  });
  await userEvent.click(saveChangesButton);
};

describe('EditTaskForm component', () => {
  describe('Unit', () => {
    beforeEach(() => {
      getStatusesSuccess();
    });

    it('should render "edit task" text inside DialogTrigger', async () => {
      render(
        <TestQueryProvider>
          <EditTaskForm task={task} subtasks={subtasks} />
          <Toaster />
        </TestQueryProvider>,
      );

      await waitFor(() => {
        expect(
          screen.getByRole('button', {
            name: /edit task/i,
          }),
        );
      });
    });

    it('should render "edit task" text inside DialogTitle', async () => {
      render(
        <TestQueryProvider>
          <EditTaskForm task={task} subtasks={subtasks} />
          <Toaster />
        </TestQueryProvider>,
      );

      await waitForEditTaskDialogTrigger();

      await openEditTaskForm();

      expect(
        screen.getByRole('heading', {
          name: /edit task/i,
        }),
      ).toBeInTheDocument();
    });

    it('should render "save changes" text inside submit button', async () => {
      render(
        <TestQueryProvider>
          <EditTaskForm task={task} subtasks={subtasks} />
          <Toaster />
        </TestQueryProvider>,
      );

      await waitForEditTaskDialogTrigger();

      await openEditTaskForm();

      expect(
        screen.getByRole('button', {
          name: /save changes/i,
        }),
      ).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    beforeEach(() => {
      toast.remove();

      getStatusesSuccess();
    });

    it('should render "Task has been updated" text and not clear inputs when respond is success', async () => {
      render(
        <TestQueryProvider>
          <EditTaskForm task={task} subtasks={subtasks} />
          <Toaster />
        </TestQueryProvider>,
      );

      await waitForEditTaskDialogTrigger();

      await openEditTaskForm();

      await submitEditTask();

      expect(screen.getByText('Task has been updated')).toBeInTheDocument();
      // todo: check if inputs are not clear
    });

    it('should render "Something went wrong" text and not clear inputs when respond is failed', async () => {
      server.use(
        rest.put(`${API_URL}/tasks/:id`, (req, res, ctx) => {
          return res(ctx.status(400));
        }),
      );

      render(
        <TestQueryProvider>
          <EditTaskForm task={task} subtasks={subtasks} />
          <Toaster />
        </TestQueryProvider>,
      );

      await waitForEditTaskDialogTrigger();

      await openEditTaskForm();

      await submitEditTask();

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      // todo: check if inputs are not clear
    });

    it('should render "Updating task ..." text and disable submit button when request is loading', async () => {
      server.use(
        rest.put(`${API_URL}/tasks/:id`, (req, res, ctx) => {
          return res(ctx.delay(300));
        }),
      );

      render(
        <TestQueryProvider>
          <EditTaskForm task={task} subtasks={subtasks} />
          <Toaster />
        </TestQueryProvider>,
      );

      await waitForEditTaskDialogTrigger();

      await openEditTaskForm();

      await submitEditTask();

      expect(screen.getByText('Updating task ...')).toBeInTheDocument();
      expect(
        screen.getByRole('button', {
          name: /save changes/i,
        }),
      ).toBeDisabled();
    });
  });
});
