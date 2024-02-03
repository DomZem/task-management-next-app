import LoginForm from '@/components/LoginForm/LoginForm';
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
  useRouter() {
    return {
      push: mockPush,
    };
  },
}));

const typeCorrectValues = async () => {
  const addressEmailInput = screen.getByLabelText('address email');
  await userEvent.type(addressEmailInput, 'anakin.skywalker@gmail.com');

  const passwordInput = screen.getByLabelText('password');
  await userEvent.type(passwordInput, 'zaq1@WSX');
};

describe('LoginForm component', () => {
  describe('Unit', () => {
    it('should render "Invalid email" when value in address email input does not contain "@" character', async () => {
      render(
        <TestQueryProvider>
          <LoginForm />
        </TestQueryProvider>,
      );

      // type inccorect value
      const addressEmailInput = screen.getByLabelText('address email');
      await userEvent.type(addressEmailInput, 'anakin.skywalker.com');

      // submit form
      const submitButton = screen.getByRole('button', {
        name: 'Submit',
      });
      await userEvent.click(submitButton);

      expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });

    it('should render "Required" when value in password input is empty', async () => {
      render(
        <TestQueryProvider>
          <LoginForm />
        </TestQueryProvider>,
      );

      // submit form
      const submitButton = screen.getByRole('button', {
        name: 'Submit',
      });
      await userEvent.click(submitButton);

      expect(screen.getByText('Required')).toBeInTheDocument();
    });

    it('should call mockPush function when response is success', async () => {
      render(
        <TestQueryProvider>
          <LoginForm />
        </TestQueryProvider>,
      );

      await typeCorrectValues();

      // submit form
      const submitButton = screen.getByRole('button', {
        name: 'Submit',
      });
      await userEvent.click(submitButton);

      expect(mockPush).toHaveBeenCalled();
    });

    it('should render "Loading ..." text in submit button and disable it when request is loading', async () => {
      server.use(
        rest.post(`${API_URL}/auth/login`, (req, res, ctx) => {
          return res(ctx.delay(300));
        }),
      );

      render(
        <TestQueryProvider>
          <LoginForm />
        </TestQueryProvider>,
      );

      await typeCorrectValues();

      // submit form
      const submitButton = screen.getByRole('button', {
        name: 'Submit',
      });
      await userEvent.click(submitButton);

      expect(submitButton).toHaveTextContent('Loading ...');
    });
  });

  describe('Integration', () => {
    beforeEach(() => {
      toast.remove();
    });

    it('should render "Something went wrong. You have not been logged in" when response is failed', async () => {
      server.use(
        rest.post(`${API_URL}/auth/login`, (req, res, ctx) => {
          return res(ctx.status(403));
        }),
      );

      render(
        <TestQueryProvider>
          <LoginForm />
          <Toaster />
        </TestQueryProvider>,
      );

      await typeCorrectValues();

      // submit form
      const submitButton = screen.getByRole('button', {
        name: 'Submit',
      });
      await userEvent.click(submitButton);

      expect(screen.getByRole('status')).toHaveTextContent(
        'Something went wrong. You have not been logged in',
      );
    });

    it('should render "Something went wrong. You have not been logged in. Error: User does not exist" when response is failed and contains message', async () => {
      server.use(
        rest.post(`${API_URL}/auth/login`, (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              message: 'User does not exist',
            }),
          );
        }),
      );

      render(
        <TestQueryProvider>
          <LoginForm />
          <Toaster />
        </TestQueryProvider>,
      );

      await typeCorrectValues();

      // submit form
      const submitButton = screen.getByRole('button', {
        name: 'Submit',
      });
      await userEvent.click(submitButton);

      expect(screen.getByRole('status')).toHaveTextContent(
        'Something went wrong. You have not been logged in. Error: User does not exist',
      );
    });
  });
});
