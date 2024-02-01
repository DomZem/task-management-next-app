import SubtaskList from '@/components/SubtaskList';
import { TestQueryProvider } from '@/helpers/TestQueryProvider';
import { render, screen } from '@testing-library/react';

describe('SubtaskList component', () => {
  describe('Unit', () => {
    it('should render "Subtasks (2 of 3)" when subtasks prop contains two subtasks with isComplete filed on true', () => {
      render(
        <TestQueryProvider>
          <SubtaskList
            subtasks={[
              {
                id: 1,
                title: 'Develop API endpoints for user authentication',
                isComplete: true,
              },
              {
                id: 2,
                title: 'Research competitor pricing and business models',
                isComplete: true,
              },
              {
                id: 3,
                title: 'Collect usability testing feedback data',
                isComplete: false,
              },
            ]}
          />
        </TestQueryProvider>,
      );

      expect(screen.getByTestId('completed-subtasks-count')).toHaveTextContent(
        'Subtasks (2 of 3)',
      );
    });

    it('should render "Subtasks (0 of 0)" when subtasks prop has empty array', () => {
      render(
        <TestQueryProvider>
          <SubtaskList subtasks={[]} />
        </TestQueryProvider>,
      );

      expect(screen.getByTestId('completed-subtasks-count')).toHaveTextContent(
        'Subtasks (0 of 0)',
      );
    });

    it('should render "Subtasks (0 of 2)" when all array elements in subtasks prop not contain subtasks with isComplete field on true', () => {
      render(
        <TestQueryProvider>
          <SubtaskList
            subtasks={[
              {
                id: 1,
                title: 'Develop API endpoints for user authentication',
                isComplete: false,
              },
              {
                id: 2,
                title: 'Research competitor pricing and business models',
                isComplete: false,
              },
            ]}
          />
        </TestQueryProvider>,
      );

      expect(screen.getByTestId('completed-subtasks-count')).toHaveTextContent(
        'Subtasks (0 of 2)',
      );
    });

    it('should render two "SubtaskListItem" when subtasks prop has two subtasks', () => {
      render(
        <TestQueryProvider>
          <SubtaskList
            subtasks={[
              {
                id: 1,
                title: 'Develop API endpoints for user authentication',
                isComplete: false,
              },
              {
                id: 2,
                title: 'Research competitor pricing and business models',
                isComplete: false,
              },
            ]}
          />
        </TestQueryProvider>,
      );

      expect(screen.getAllByRole('listitem')).toHaveLength(2);
    });

    it('should not render "SubtaskListItem" when subtasks prop has empty array', () => {
      render(
        <TestQueryProvider>
          <SubtaskList subtasks={[]} />
        </TestQueryProvider>,
      );

      expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    });
  });
});
