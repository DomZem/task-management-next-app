'use client';

import useLogin from '@/hooks/auth/useLogin';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LuLoader2 } from 'react-icons/lu';
import { Button } from '../UI/Button';
import {
  Form,
  FormControl,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
} from '../UI/Form';
import { Login, loginFormSchema } from './formSchema';

const defaultValues: Login = {
  email: '',
  password: '',
};

export default function LoginForm() {
  const form = useForm<Login>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });

  const { mutate, isPending } = useLogin();

  return (
    <Form {...form}>
      <form
        method="post"
        onSubmit={form.handleSubmit((data) => mutate(data))}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>address email</FormLabel>

              <FormControl>
                <FormInput {...field} />
                <FormMessage />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>

              <FormControl>
                <FormInput type="password" {...field} />
                <FormMessage />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          className="flex w-full items-center justify-center"
          type="submit"
          disabled={isPending}
          large
        >
          {isPending && (
            <LuLoader2 className="mr-2 animate-spin text-base font-bold" />
          )}
          {isPending ? 'Loading ...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
