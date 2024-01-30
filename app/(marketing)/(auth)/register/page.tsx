import RegisterForm from '@/components/RegisterForm/RegisterForm';
import { RegisterType } from '@/components/RegisterForm/formSchema';

const defaultValues: RegisterType = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function RegisterPage() {
  return (
    <section className="w-full max-w-lg rounded-lg bg-white p-6 shadow-md dark:bg-primaryDarkGrey">
      <h2 className="mb-6 text-heading-xl">Register</h2>

      <RegisterForm defaultValues={defaultValues} />
    </section>
  );
}
