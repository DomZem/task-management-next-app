import { Status } from '@/components/BoardForm/formSchema';
import TaskStatus from '@/components/TaskStatus';
import Toaster from '@/components/UI/Toaster';
import { colors } from '@/data/colors';
import { TestQueryProvider } from '@/helpers/TestQueryProvider';
import { API_URL } from '@/lib/axios';
import { server } from '@/mocks/server';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import toast from 'react-hot-toast';

jest.mock('next/navigation', () => ({
  usePathname() {
    return '/boards/1';
  },
}));

const getStatuses = () => {
  server.use(
    rest.get(`${API_URL}/statuses`, (req, res, ctx) => {
      return res(
        ctx.json<Status[]>([
          {
            id: 1,
            name: 'Todo',
            color: colors[0].value,
          },
          {
            id: 2,
            name: 'Doing',
            color: colors[1].value,
          },
        ]),
      );
    }),
  );
};

const waitForContent = async () => {
  await waitFor(() => {
    screen.getByText('current status');
  });
};

const openSelectContent = async () => {
  const selectTrigger = screen.getByRole('combobox');
  await userEvent.click(selectTrigger);
};

const selectFirstOption = async () => {
  const selectOptions = screen.getAllByRole('option');
  await userEvent.click(selectOptions[0]);
};

const selectSecondOption = async () => {
  const selectOptions = screen.getAllByRole('option');
  await userEvent.click(selectOptions[1]);
};

describe('TaskStatus component', () => {
  describe('Unit', () => {
    it('should render nothing when statuses response is empty array', async () => {
      const { container } = render(
        <TestQueryProvider>
          <TaskStatus taskId={1} statusId={1} />
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
          <TaskStatus taskId={1} statusId={1} />
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
          <TaskStatus taskId={1} statusId={1} />
        </TestQueryProvider>,
      );

      await waitFor(() => {
        expect(container.firstChild).toBeNull();
      });
    });
  });

  describe('Integration', () => {
    beforeEach(() => {
      toast.remove();

      getStatuses();
    });

    it('should render "Task status has been updated" text when response is success', async () => {
      render(
        <TestQueryProvider>
          <TaskStatus taskId={1} statusId={1} />
          <Toaster />
        </TestQueryProvider>,
      );

      await waitForContent();

      await openSelectContent();

      await selectSecondOption();

      expect(screen.getByRole('status')).toHaveTextContent(
        'Task status has been updated',
      );
    });

    it('should not render Toaster when selected option is the same as initial', async () => {
      render(
        <TestQueryProvider>
          <TaskStatus taskId={1} statusId={1} />
          <Toaster />
        </TestQueryProvider>,
      );

      await waitForContent();

      await openSelectContent();

      await selectFirstOption();

      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    it('should render "Something went wrong" text when response is failed', async () => {
      server.use(
        rest.patch(`${API_URL}/tasks/:id`, (req, res, ctx) => {
          return res(ctx.status(400));
        }),
      );

      render(
        <TestQueryProvider>
          <TaskStatus taskId={1} statusId={1} />
          <Toaster />
        </TestQueryProvider>,
      );

      await waitForContent();

      await openSelectContent();

      await selectSecondOption();

      expect(screen.getByRole('status')).toHaveTextContent(
        'Something went wrong',
      );
    });

    it('should render "Updating task status ..." text and disable SelectTrigger when request is loading', async () => {
      server.use(
        rest.patch(`${API_URL}/tasks/:id`, (req, res, ctx) => {
          return res(ctx.delay(300));
        }),
      );

      render(
        <TestQueryProvider>
          <TaskStatus taskId={1} statusId={1} />
          <Toaster />
        </TestQueryProvider>,
      );

      await waitForContent();

      const selectTrigger = screen.getByRole('combobox');
      await userEvent.click(selectTrigger);

      await selectSecondOption();

      expect(screen.getByRole('status')).toHaveTextContent(
        'Updating task status ...',
      );
      expect(selectTrigger).toBeDisabled();
    });
  });
});
