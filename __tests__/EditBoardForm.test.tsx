import EditBoardForm from '@/components/BoardForm/EditBoardForm';
import { Status } from '@/components/BoardForm/formSchema';
import { DialogTrigger } from '@/components/UI/Dialog';
import Toaster from '@/components/UI/Toaster';
import { colors } from '@/data/colors';
import { TestQueryProvider } from '@/helpers/TestQueryProvider';
import { API_URL } from '@/lib/axios';
import { server } from '@/mocks/server';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import toast from 'react-hot-toast';

const statuses: Status[] = [
  {
    id: 1,
    color: colors[0].value,
    name: 'Todo',
  },
];

const openEditBoardForm = async () => {
  const dialogTrigger = screen.getByRole('button', {
    name: /open form/i,
  });
  await userEvent.click(dialogTrigger);
};

const submitEditBoard = async () => {
  const submitButton = screen.getByRole('button', {
    name: /save changes/i,
  });
  await userEvent.click(submitButton);
};

describe('EditBoardForm component', () => {
  describe('Unit', () => {
    it('should render "edit board" text inside DialogTitle', async () => {
      render(
        <TestQueryProvider>
          <EditBoardForm
            boardId={1}
            boardName="Platform Launch"
            statuses={statuses}
          >
            <DialogTrigger>open form</DialogTrigger>
          </EditBoardForm>
        </TestQueryProvider>,
      );

      await openEditBoardForm();

      expect(screen.getByText('edit board')).toBeInTheDocument();
    });

    it('should render "save changes" text inside submit button', async () => {
      render(
        <TestQueryProvider>
          <EditBoardForm
            boardId={1}
            boardName="Platform Launch"
            statuses={statuses}
          >
            <DialogTrigger>open form</DialogTrigger>
          </EditBoardForm>
        </TestQueryProvider>,
      );

      await openEditBoardForm();

      expect(screen.getByText('save changes')).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    beforeEach(() => {
      toast.remove();
    });

    it('should render "Board has been updated" text and not clear inputs when respond is success', async () => {
      render(
        <TestQueryProvider>
          <EditBoardForm
            boardId={1}
            boardName="Platform Launch"
            statuses={statuses}
          >
            <DialogTrigger>open form</DialogTrigger>
          </EditBoardForm>
          <Toaster />
        </TestQueryProvider>,
      );

      await openEditBoardForm();

      // modify board name
      const boardName = screen.getByLabelText('board name');
      await userEvent.clear(boardName);
      await userEvent.type(boardName, 'Roadmap');

      await submitEditBoard();

      expect(screen.getByText('Board has been updated')).toBeInTheDocument();
      expect(boardName).toHaveValue('Roadmap');
    });

    it('should render "Something went wrong" text and not clear inputs when respond is failed', async () => {
      server.use(
        rest.put(`${API_URL}/boards/:id`, (req, res, ctx) => {
          return res(ctx.status(400));
        }),
      );

      render(
        <TestQueryProvider>
          <EditBoardForm
            boardId={1}
            boardName="Platform Launch"
            statuses={statuses}
          >
            <DialogTrigger>open form</DialogTrigger>
          </EditBoardForm>
          <Toaster />
        </TestQueryProvider>,
      );

      await openEditBoardForm();

      // modify board name
      const boardName = screen.getByLabelText('board name');
      await userEvent.clear(boardName);
      await userEvent.type(boardName, 'Roadmap');

      await submitEditBoard();

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(boardName).toHaveValue('Roadmap');
    });

    it('should render "Updating board ..." text and disable submit button when request is loading', async () => {
      server.use(
        rest.put(`${API_URL}/boards/:id`, (req, res, ctx) => {
          return res(ctx.delay(300));
        }),
      );

      render(
        <TestQueryProvider>
          <EditBoardForm
            boardId={1}
            boardName="Platform Launch"
            statuses={statuses}
          >
            <DialogTrigger>open form</DialogTrigger>
          </EditBoardForm>
          <Toaster />
        </TestQueryProvider>,
      );

      await openEditBoardForm();

      const submitButton = screen.getByRole('button', {
        name: /save changes/i,
      });
      await userEvent.click(submitButton);

      expect(screen.getByText('Updating board ...')).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });
  });
});
