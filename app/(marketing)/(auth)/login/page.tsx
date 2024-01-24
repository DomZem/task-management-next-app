import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <section className="w-full max-w-lg rounded-lg bg-white p-6 shadow-md dark:bg-primaryDarkGrey">
      <h2 className="mb-6 text-heading-xl">Login</h2>

      <LoginForm />
    </section>
  );
}
