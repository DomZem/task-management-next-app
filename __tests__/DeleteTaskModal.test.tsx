import DeleteTaskModal from '@/components/DeleteTaskModal';
import Toaster from '@/components/UI/Toaster';
import { TestQueryProvider } from '@/helpers/TestQueryProvider';
import { API_URL } from '@/lib/axios';
import { server } from '@/mocks/server';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import toast from 'react-hot-toast';

describe('DeleteTaskModal component', () => {
  describe('Unit', () => {
    it('should render "Build UI For Search" text in description when taskTitle prop is "Build UI For Search"', async () => {
      render(
        <TestQueryProvider>
          <DeleteTaskModal
            taskTitle="Build UI For Search"
            taskId={1}
            statusId={1}
          />
        </TestQueryProvider>,
      );

      // open AlertDialogContent
      const alertDialogTrigger = screen.getByRole('button', {
        name: /Delete task/i,
      });
      await userEvent.click(alertDialogTrigger);

      expect(
        screen.getByText('Build UI For Search', { exact: false }),
      ).toBeInTheDocument();
    });

    it('should close "AlertDialogContent" after click "AlertDialogCancel" when "AlertDialogContent" is already rendered', async () => {
      render(
        <TestQueryProvider>
          <DeleteTaskModal
            taskTitle="Build UI For Search"
            taskId={1}
            statusId={1}
          />
        </TestQueryProvider>,
      );

      // open AlertDialogContent
      const alertDialogTrigger = screen.getByRole('button', {
        name: /Delete task/i,
      });
      await userEvent.click(alertDialogTrigger);

      const alertDialogCancel = screen.getByRole('button', {
        name: /Cancel/i,
      });
      expect(alertDialogCancel).toBeInTheDocument();

      // close AlertDialogContent
      await userEvent.click(alertDialogCancel);

      expect(alertDialogCancel).not.toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('should render "Task has been deleted" text and close "AlertDialogContent" when request is success ', async () => {
      toast.remove();

      render(
        <TestQueryProvider>
          <DeleteTaskModal
            taskTitle="Build UI For Search"
            taskId={1}
            statusId={1}
          />
          <Toaster />
        </TestQueryProvider>,
      );

      // open AlertDialogContent
      const alertDialogTrigger = screen.getByRole('button', {
        name: /Delete task/i,
      });
      await userEvent.click(alertDialogTrigger);

      // delete task
      const alertDialogAction = screen.getByRole('button', {
        name: /Delete/i,
      });
      await userEvent.click(alertDialogAction);

      expect(screen.getByRole('status')).toHaveTextContent(
        'Task has been deleted',
      );
      expect(alertDialogAction).not.toBeInTheDocument();
    });

    it('should render "Something went wrong" text when request is failed', async () => {
      toast.remove();

      server.use(
        rest.delete(`${API_URL}/tasks/:id`, (req, res, ctx) => {
          return res(ctx.status(403));
        }),
      );

      render(
        <TestQueryProvider>
          <DeleteTaskModal
            taskTitle="Build UI For Search"
            taskId={1}
            statusId={1}
          />
          <Toaster />
        </TestQueryProvider>,
      );

      // open AlertDialogContent
      const alertDialogTrigger = screen.getByRole('button', {
        name: /Delete task/i,
      });
      await userEvent.click(alertDialogTrigger);

      // delete task
      const alertDialogAction = screen.getByRole('button', {
        name: /Delete/i,
      });
      await userEvent.click(alertDialogAction);

      expect(screen.getByRole('status')).toHaveTextContent(
        'Something went wrong',
      );
    });

    it('should render "Deleting task ..." text and disable button when request is loading', async () => {
      toast.remove();

      server.use(
        rest.delete(`${API_URL}/tasks/:id`, (req, res, ctx) => {
          return res(ctx.delay(300));
        }),
      );

      render(
        <TestQueryProvider>
          <DeleteTaskModal
            taskTitle="Build UI For Search"
            taskId={1}
            statusId={1}
          />
          <Toaster />
        </TestQueryProvider>,
      );

      // open AlertDialogContent
      const alertDialogTrigger = screen.getByRole('button', {
        name: /Delete task/i,
      });
      await userEvent.click(alertDialogTrigger);

      // delete task
      const alertDialogAction = screen.getByRole('button', {
        name: /Delete/i,
      });
      await userEvent.click(alertDialogAction);

      expect(screen.getByRole('status')).toHaveTextContent('Deleting task ...');
    });
  });
});
