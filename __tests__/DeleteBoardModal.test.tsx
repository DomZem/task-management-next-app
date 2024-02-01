import DeleteBoardModal from '@/components/DeleteBoardModal';
import Toaster from '@/components/UI/Toaster';
import { TestQueryProvider } from '@/helpers/TestQueryProvider';
import { API_URL } from '@/lib/axios';
import { server } from '@/mocks/server';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import toast from 'react-hot-toast';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('DeleteBoardModal component', () => {
  describe('Unit', () => {
    it('should render "Platform Launch" text in description when boardName prop is "Platform Launch"', async () => {
      render(
        <TestQueryProvider>
          <DeleteBoardModal boardId={1} boardName="Platform Launch" />
        </TestQueryProvider>,
      );

      // open AlertDialogContent
      const alertDialogTrigger = screen.getByRole('button', {
        name: /Delete board/i,
      });
      await userEvent.click(alertDialogTrigger);

      expect(
        screen.getByText('Platform Launch', { exact: false }),
      ).toBeInTheDocument();
    });

    it('should close "AlertDialogContent" after click "AlertDialogCancel" when "AlertDialogContent" is already rendered', async () => {
      render(
        <TestQueryProvider>
          <DeleteBoardModal boardId={1} boardName="Platform Launch" />
        </TestQueryProvider>,
      );

      // open AlertDialogContent
      const alertDialogTrigger = screen.getByRole('button', {
        name: /Delete board/i,
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
    beforeEach(() => {
      toast.remove();
    });

    it('should render "Board has been deleted" text and close "AlertDialogContent" when request is success', async () => {
      render(
        <TestQueryProvider>
          <DeleteBoardModal boardId={1} boardName="Platform Launch" />
          <Toaster />
        </TestQueryProvider>,
      );

      // open AlertDialogContent
      const alertDialogTrigger = screen.getByRole('button', {
        name: /Delete board/i,
      });
      await userEvent.click(alertDialogTrigger);

      // delete board
      const alertDialogAction = screen.getByRole('button', {
        name: /Delete/i,
      });
      await userEvent.click(alertDialogAction);

      expect(screen.getByRole('status')).toHaveTextContent(
        'Board has been deleted',
      );
      expect(alertDialogAction).not.toBeInTheDocument();
    });

    it('should render "Something went wrong" text when request is failed', async () => {
      server.use(
        rest.delete(`${API_URL}/boards/:id`, (req, res, ctx) => {
          return res(ctx.status(403));
        }),
      );

      render(
        <TestQueryProvider>
          <DeleteBoardModal boardId={1} boardName="Platform Launch" />
          <Toaster />
        </TestQueryProvider>,
      );

      // open AlertDialogContent
      const alertDialogTrigger = screen.getByRole('button', {
        name: /Delete board/i,
      });
      await userEvent.click(alertDialogTrigger);

      // delete board
      const alertDialogAction = screen.getByRole('button', {
        name: /Delete/i,
      });
      await userEvent.click(alertDialogAction);

      expect(screen.getByRole('status')).toHaveTextContent(
        'Something went wrong',
      );
    });

    it('should render "Deleting board ..." text and disable button when request is loading', async () => {
      server.use(
        rest.delete(`${API_URL}/boards/:id`, (req, res, ctx) => {
          return res(ctx.delay(300));
        }),
      );

      render(
        <TestQueryProvider>
          <DeleteBoardModal boardId={1} boardName="Platform Launch" />
          <Toaster />
        </TestQueryProvider>,
      );

      // open AlertDialogContent
      const alertDialogTrigger = screen.getByRole('button', {
        name: /Delete board/i,
      });
      await userEvent.click(alertDialogTrigger);

      // delete board
      const alertDialogAction = screen.getByRole('button', {
        name: /Delete/i,
      });
      await userEvent.click(alertDialogAction);

      expect(screen.getByRole('status')).toHaveTextContent(
        'Deleting board ...',
      );
    });
  });
});
