import CreateBoardForm from '@/components/BoardForm/CreateBoardForm';
import { DialogTrigger } from '@/components/UI/Dialog';
import Toaster from '@/components/UI/Toaster';
import { TestQueryProvider } from '@/helpers/TestQueryProvider';
import { API_URL } from '@/lib/axios';
import { server } from '@/mocks/server';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import toast from 'react-hot-toast';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  usePathname() {
    return `/boards/1`;
  },
  useRouter() {
    return {
      push: mockPush,
    };
  },
}));

const openCreateBoardForm = async () => {
  const dialogTrigger = screen.getByRole('button', {
    name: /open form/i,
  });
  await userEvent.click(dialogTrigger);
};

const typeBoardValues = async () => {
  const boardName = screen.getByLabelText('board name');
  await userEvent.type(boardName, 'Roadmap');

  const statusName = screen.getByLabelText('status name - 0');
  await userEvent.type(statusName, 'Todo');

  return {
    boardName,
    statusName,
  };
};

const submitCreateBoard = async () => {
  const submitButton = screen.getByRole('button', {
    name: /create new board/i,
  });
  await userEvent.click(submitButton);
};

describe('CreateBoardForm component', () => {
  describe('Unit', () => {
    it('should render "add new board" text inside DialogTitle', async () => {
      render(
        <TestQueryProvider>
          <CreateBoardForm>
            <DialogTrigger>open form</DialogTrigger>
          </CreateBoardForm>
        </TestQueryProvider>,
      );

      await openCreateBoardForm();

      expect(screen.getByText('add new board')).toBeInTheDocument();
    });

    it('should render "create new board" text inside submit button', async () => {
      render(
        <TestQueryProvider>
          <CreateBoardForm>
            <DialogTrigger>open form</DialogTrigger>
          </CreateBoardForm>
        </TestQueryProvider>,
      );

      await openCreateBoardForm();

      expect(
        screen.getByRole('button', {
          name: /create new board/i,
        }),
      ).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    beforeEach(() => {
      toast.remove();
    });

    it('should render "Board has been created" text and clear inputs and call push method from router when respond is success', async () => {
      render(
        <TestQueryProvider>
          <CreateBoardForm>
            <DialogTrigger>open form</DialogTrigger>
          </CreateBoardForm>
          <Toaster />
        </TestQueryProvider>,
      );

      await openCreateBoardForm();

      await typeBoardValues();

      await submitCreateBoard();

      expect(screen.getByText('Board has been created')).toBeInTheDocument();
      expect(mockPush).toHaveBeenCalled();
      // todo: check if inputs are cleared
    });

    it('should render "Something went wrong" text and not clear inputs when respond is failed', async () => {
      server.use(
        rest.post(`${API_URL}/boards`, (req, res, ctx) => {
          return res(ctx.status(400));
        }),
      );

      render(
        <TestQueryProvider>
          <CreateBoardForm>
            <DialogTrigger>open form</DialogTrigger>
          </CreateBoardForm>
          <Toaster />
        </TestQueryProvider>,
      );

      await openCreateBoardForm();

      await typeBoardValues();

      await submitCreateBoard();

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      // todo: check if inputs are not cleared
    });

    it('should render "Creating board ..." text and disable submit button when request is loading', async () => {
      server.use(
        rest.post(`${API_URL}/boards`, (req, res, ctx) => {
          return res(ctx.delay(300));
        }),
      );

      render(
        <TestQueryProvider>
          <CreateBoardForm>
            <DialogTrigger>open form</DialogTrigger>
          </CreateBoardForm>
          <Toaster />
        </TestQueryProvider>,
      );

      await openCreateBoardForm();

      await typeBoardValues();

      const submitButton = screen.getByRole('button', {
        name: /create new board/i,
      });
      await userEvent.click(submitButton);

      expect(screen.getByText('Creating board ...')).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });
  });
});
