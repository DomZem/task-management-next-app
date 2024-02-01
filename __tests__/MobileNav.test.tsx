import MobileNav from '@/components/MobileNav';
import { TestQueryProvider } from '@/helpers/TestQueryProvider';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('MobileNav component', () => {
  describe('Unit', () => {
    it('should render "DialogContent" after click "DialogTrigger"', async () => {
      render(
        <TestQueryProvider>
          <MobileNav />
        </TestQueryProvider>,
      );

      const dialogTriggerButton = screen.getByRole('button');
      await userEvent.click(dialogTriggerButton);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should not render "DialogContnet" after click "DialogOverlay" when "DialogContent" is already rendered', async () => {
      render(
        <TestQueryProvider>
          <MobileNav />
        </TestQueryProvider>,
      );

      const dialogTriggerButton = screen.getByRole('button');
      await userEvent.click(dialogTriggerButton);

      const dialogContent = screen.getByRole('dialog');
      expect(dialogContent).toBeInTheDocument();

      const dialogOverlay = screen.getByTestId('dialog-overlay');
      await userEvent.click(dialogOverlay);

      expect(dialogContent).not.toBeInTheDocument();
    });
  });
});
