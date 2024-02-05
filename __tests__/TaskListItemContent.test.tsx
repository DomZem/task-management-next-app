import TaskListItemContent from '@/components/TaskListItemContent';
import { Dialog, DialogTrigger } from '@/components/UI/Dialog';
import { TestQueryProvider } from '@/helpers/TestQueryProvider';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('next/navigation', () => ({
  usePathname() {
    return '/boards/1';
  },
}));

describe('TaskListItemContent component', () => {
  describe('Unit', () => {
    it('should render "EditTaskForm" button and "DeleteTaskModal" button after click "PopoverTrigger"', async () => {
      render(
        <TestQueryProvider>
          <Dialog>
            {/* helper */}
            <DialogTrigger>open</DialogTrigger>
            <TaskListItemContent
              task={{
                id: 1,
                title: 'Build UI For Search',
                description: '',
                statusId: 1,
              }}
              subtasks={[]}
            />
          </Dialog>
        </TestQueryProvider>,
      );

      const dialogTrigger = screen.getByRole('button', {
        name: /open/i,
      });
      await userEvent.click(dialogTrigger);

      const popoverTrigger = screen.getByRole('button');
      await userEvent.click(popoverTrigger);

      expect(
        screen.getByRole('button', {
          name: 'edit task',
        }),
      ).toBeInTheDocument();

      expect(
        screen.getByRole('button', {
          name: 'delete task',
        }),
      ).toBeInTheDocument();
    });

    it('should render "DialogDescription" when task prop has no empty description', async () => {
      const description =
        "Through thorough research and analysis, we've successfully explored the market landscape. This task provided us with valuable insights into potential opportunities.";

      render(
        <TestQueryProvider>
          <Dialog>
            <DialogTrigger>open</DialogTrigger>

            <TaskListItemContent
              task={{
                id: 1,
                title: 'Research The Market',
                description,
                statusId: 1,
              }}
              subtasks={[]}
            />
          </Dialog>
        </TestQueryProvider>,
      );

      const dialogTrigger = screen.getByRole('button', {
        name: /open/i,
      });
      await userEvent.click(dialogTrigger);

      expect(screen.getByText(description)).toBeInTheDocument();
    });

    it('should not render "DialogDescription" when task prop has empty description', async () => {
      render(
        <TestQueryProvider>
          <Dialog>
            <DialogTrigger>open</DialogTrigger>

            <TaskListItemContent
              task={{
                id: 1,
                title: 'Research The Market',
                description: '',
                statusId: 1,
              }}
              subtasks={[]}
            />
          </Dialog>
        </TestQueryProvider>,
      );

      const dialogTrigger = screen.getByRole('button', {
        name: /open/i,
      });
      await userEvent.click(dialogTrigger);

      expect(
        screen.queryByTestId('task-list-item-description'),
      ).not.toBeInTheDocument();
    });

    it('should render "SubtaskList" when subtasks prop has no empty array', async () => {
      render(
        <TestQueryProvider>
          <Dialog>
            <DialogTrigger>open</DialogTrigger>

            <TaskListItemContent
              task={{
                id: 1,
                title: 'Research The Market',
                description: '',
                statusId: 1,
              }}
              subtasks={[
                {
                  id: 1,
                  title: 'Research competitor pricing and business models',
                  isComplete: true,
                },
              ]}
            />
          </Dialog>
        </TestQueryProvider>,
      );

      const dialogTrigger = screen.getByRole('button', {
        name: /open/i,
      });
      await userEvent.click(dialogTrigger);

      expect(screen.getAllByRole('listitem')).toHaveLength(1);
    });

    it('should not render "SubtaskList" when subtasks prop has empty array', async () => {
      render(
        <TestQueryProvider>
          <Dialog>
            <DialogTrigger>open</DialogTrigger>

            <TaskListItemContent
              task={{
                id: 1,
                title: 'Research The Market',
                description: '',
                statusId: 1,
              }}
              subtasks={[]}
            />
          </Dialog>
        </TestQueryProvider>,
      );

      const dialogTrigger = screen.getByRole('button', {
        name: /open/i,
      });
      await userEvent.click(dialogTrigger);

      expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    });
  });
});
