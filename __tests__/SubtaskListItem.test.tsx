import SubtaskListItem from '@/components/SubtaskListItem';
import Toaster from '@/components/UI/Toaster';
import { TestQueryProvider } from '@/helpers/TestQueryProvider';
import { API_URL } from '@/lib/axios';
import { server } from '@/mocks/server';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import toast from 'react-hot-toast';

jest.mock('next/navigation', () => ({
  usePathname() {
    return 'boards/1';
  },
}));

describe('SubtaskListItem component', () => {
  describe('Unit', () => {
    it('should render "Checkbox" as checked when isComplete prop is true', () => {
      render(
        <TestQueryProvider>
          <SubtaskListItem
            subtask={{
              id: 1,
              title: 'Collect usability testing feedback data',
              isComplete: true,
            }}
          />
        </TestQueryProvider>,
      );

      expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('should render "Checkbox" as unchecked when isComplete prop is false', () => {
      render(
        <TestQueryProvider>
          <SubtaskListItem
            subtask={{
              id: 1,
              title: 'Collect usability testing feedback data',
              isComplete: false,
            }}
          />
        </TestQueryProvider>,
      );

      expect(screen.getByRole('checkbox')).not.toBeChecked();
    });
  });

  describe('Integration', () => {
    beforeEach(() => {
      toast.remove();
    });

    it('should render "Subtask has been updated" text when response is success', async () => {
      render(
        <TestQueryProvider>
          <SubtaskListItem
            subtask={{
              id: 1,
              title: 'Collect usability testing feedback data',
              isComplete: true,
            }}
          />
          <Toaster />
        </TestQueryProvider>,
      );

      const checkbox = screen.getByRole('checkbox');
      await userEvent.click(checkbox);

      expect(screen.getByRole('status')).toHaveTextContent(
        'Subtask has been updated',
      );
    });

    it('should render "Something went wrong" text when response is failed', async () => {
      server.use(
        rest.patch(`${API_URL}/subtasks/:id`, (req, res, ctx) => {
          return res(ctx.status(403));
        }),
      );

      render(
        <TestQueryProvider>
          <SubtaskListItem
            subtask={{
              id: 1,
              title: 'Collect usability testing feedback data',
              isComplete: true,
            }}
          />
          <Toaster />
        </TestQueryProvider>,
      );

      const checkbox = screen.getByRole('checkbox');
      await userEvent.click(checkbox);

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('should render "Updating subtask ..." text and disable "Checkbox" when request is loading', async () => {
      server.use(
        rest.patch(`${API_URL}/subtasks/:id`, (req, res, ctx) => {
          return res(ctx.delay(300));
        }),
      );

      render(
        <TestQueryProvider>
          <SubtaskListItem
            subtask={{
              id: 1,
              title: 'Collect usability testing feedback data',
              isComplete: true,
            }}
          />
          <Toaster />
        </TestQueryProvider>,
      );

      const checkbox = screen.getByRole('checkbox');
      await userEvent.click(checkbox);

      expect(screen.getByText('Updating subtask ...')).toBeInTheDocument();
    });
  });
});
