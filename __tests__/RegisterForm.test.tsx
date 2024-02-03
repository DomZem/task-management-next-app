import RegisterForm from '@/components/RegisterForm/RegisterForm';
import { RegisterType } from '@/components/RegisterForm/formSchema';
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

const defaultValues: RegisterType = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const filledDefaultValues: RegisterType = {
  firstName: 'Alan',
  lastName: 'Walker',
  email: 'alan.walker@gmail.com',
  password: 'zaq1@WSX',
  confirmPassword: 'zaq1@WSX',
};

describe('RegisterForm component', () => {
  describe('Unit', () => {
    beforeEach(() => {
      render(
        <TestQueryProvider>
          <RegisterForm defaultValues={defaultValues} />
        </TestQueryProvider>,
      );
    });

    it('should render "Required" error message after click submit button when no value in first name input', async () => {
      const submitBtn = screen.getByRole('button', {
        name: /Submit/i,
      });

      await userEvent.click(submitBtn);

      const firstNameErrorMessage = screen.getByTestId(
        'first-name-error-message',
      );

      expect(firstNameErrorMessage).toHaveTextContent('Required');
    });

    it('should render "Required" error message after click submit button when no value in last name input', async () => {
      const submitBtn = screen.getByRole('button', {
        name: /Submit/i,
      });
      await userEvent.click(submitBtn);

      const lastNameErrorMessage = screen.getByTestId(
        'last-name-error-message',
      );

      expect(lastNameErrorMessage).toHaveTextContent('Required');
    });

    it('should render "Invalid email" error message after click submit button when no value in address email input', async () => {
      const submitBtn = screen.getByRole('button', {
        name: /Submit/i,
      });

      await userEvent.click(submitBtn);

      const addressEmailErrorMessage = screen.getByTestId(
        'address-email-error-message',
      );

      expect(addressEmailErrorMessage).toHaveTextContent('Invalid email');
    });

    it('should render "Invalid email" error message after click submit button when value in address email doesn`t contain "@" character', async () => {
      const submitBtn = screen.getByRole('button', {
        name: /Submit/i,
      });

      // Type incorrect value into address email input
      const addressEmailInput = screen.getByLabelText('address email');
      await userEvent.type(addressEmailInput, 'anakin.com');

      await userEvent.click(submitBtn);

      const addressEmailErrorMessage = screen.getByTestId(
        'address-email-error-message',
      );

      expect(addressEmailErrorMessage).toHaveTextContent('Invalid email');
    });

    it(`should render "Passwords don't match" error message when confirm password input doesn't have the same value as password input`, async () => {
      const submitBtn = screen.getByRole('button', {
        name: 'Submit',
      });

      const passwordInput = screen.getByLabelText('password');
      await userEvent.type(passwordInput, 'zaq1@WSX');

      const confirmPasswordInput = screen.getByLabelText('confirm password');
      await userEvent.type(confirmPasswordInput, 'zaq1@WS');

      await userEvent.click(submitBtn);

      const confirmPasswordErrorMessage = screen.getByTestId(
        'confirm-password-error-message',
      );

      expect(confirmPasswordErrorMessage).toHaveTextContent(
        "Passwords don't match",
      );
    });

    describe('Password Input', () => {
      it('should display "Password must contains at least one uppercase character" error message after click submit button', async () => {
        const submitBtn = screen.getByRole('button', {
          name: /Submit/i,
        });

        const passwordInput = screen.getByLabelText('password');
        await userEvent.type(passwordInput, 'z');

        await userEvent.click(submitBtn);

        const passwordErrorMessage = screen.getByTestId(
          'password-error-message',
        );

        expect(passwordErrorMessage).toHaveTextContent(
          'Password must contains at least one uppercase character',
        );
      });

      it('should display "Password must contains at least one lowercase character" error message after click submit button', async () => {
        const submitBtn = screen.getByRole('button', {
          name: /Submit/i,
        });

        const passwordInput = screen.getByLabelText('password');
        await userEvent.type(passwordInput, 'Z');

        await userEvent.click(submitBtn);

        const passwordErrorMessage = screen.getByTestId(
          'password-error-message',
        );

        expect(passwordErrorMessage).toHaveTextContent(
          'Password must contains at least one lowercase character',
        );
      });

      it('should display "Password must contains at least one number" error message after click submit button', async () => {
        const submitBtn = screen.getByRole('button', {
          name: /Submit/i,
        });

        const passwordInput = screen.getByLabelText('password');
        await userEvent.type(passwordInput, 'zA');

        await userEvent.click(submitBtn);

        const passwordErrorMessage = screen.getByTestId(
          'password-error-message',
        );

        expect(passwordErrorMessage).toHaveTextContent(
          'Password must contains at least one number',
        );
      });

      it('should display "Password must contains at least one special character" error message after click submit button', async () => {
        const submitBtn = screen.getByRole('button', {
          name: /Submit/i,
        });

        const passwordInput = screen.getByLabelText('password');
        await userEvent.type(passwordInput, 'zA1');

        await userEvent.click(submitBtn);

        const passwordErrorMessage = screen.getByTestId(
          'password-error-message',
        );

        expect(passwordErrorMessage).toHaveTextContent(
          'Password must contains at least one special character',
        );
      });

      it('should display "Password must be at least 8 characters in length" error message after click submit button', async () => {
        const submitBtn = screen.getByRole('button', {
          name: /Submit/i,
        });

        const passwordInput = screen.getByLabelText('password');
        await userEvent.type(passwordInput, 'zaq1@W');

        await userEvent.click(submitBtn);

        const passwordErrorMessage = screen.getByTestId(
          'password-error-message',
        );

        expect(passwordErrorMessage).toHaveTextContent(
          'Password must be at least 8 characters in length',
        );
      });
    });
  });

  describe('Integration', () => {
    beforeEach(() => {
      toast.remove();
    });

    it('should render "Account has been created 🔥" text and call push function from router when request is success', async () => {
      render(
        <TestQueryProvider>
          <RegisterForm defaultValues={filledDefaultValues} />
          <Toaster />
        </TestQueryProvider>,
      );

      const submitButton = screen.getByRole('button', {
        name: /Submit/i,
      });
      await userEvent.click(submitButton);

      expect(screen.getByRole('status')).toHaveTextContent(
        'Account has been created 🔥',
      );
      expect(mockPush).toHaveBeenCalled();
    });

    it(`should render "Something went wrong. Account hasn't been created" text when response if failed`, async () => {
      server.use(
        rest.post(`${API_URL}/auth/register`, (req, res, ctx) => {
          return res(ctx.status(400));
        }),
      );

      render(
        <TestQueryProvider>
          <RegisterForm defaultValues={filledDefaultValues} />
          <Toaster />
        </TestQueryProvider>,
      );

      const submitButton = screen.getByRole('button', {
        name: /Submit/i,
      });
      await userEvent.click(submitButton);

      expect(screen.getByRole('status')).toHaveTextContent(
        "Something went wrong. Account hasn't been created",
      );
    });

    it(`should render "Something went wrong. Account hasn't been created. Error: Duplicate of email" text when response if failed and contains message`, async () => {
      server.use(
        rest.post(`${API_URL}/auth/register`, (req, res, ctx) => {
          return res(
            ctx.status(409),
            ctx.json({
              message: 'Duplicate of email',
            }),
          );
        }),
      );

      render(
        <TestQueryProvider>
          <RegisterForm defaultValues={filledDefaultValues} />
          <Toaster />
        </TestQueryProvider>,
      );

      const submitButton = screen.getByRole('button', {
        name: /Submit/i,
      });
      await userEvent.click(submitButton);

      expect(screen.getByRole('status')).toHaveTextContent(
        "Something went wrong. Account hasn't been created. Error: Duplicate of email",
      );
    });

    it('should render "Creating account ..." text when request is loading', async () => {
      server.use(
        rest.post(`${API_URL}/auth/register`, (req, res, ctx) => {
          return res(ctx.delay(300));
        }),
      );

      render(
        <TestQueryProvider>
          <RegisterForm defaultValues={filledDefaultValues} />
          <Toaster />
        </TestQueryProvider>,
      );

      const submitButton = screen.getByRole('button', {
        name: /Submit/i,
      });
      await userEvent.click(submitButton);

      expect(screen.getByRole('status')).toHaveTextContent(
        'Creating account ...',
      );
    });
  });
});
