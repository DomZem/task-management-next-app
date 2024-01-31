'use client';

import { axiosInstance } from '@/lib/axios';
import { User } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LuLoader2 } from 'react-icons/lu';
import * as z from 'zod';
import { Button } from './UI/Button';
import {
  Form,
  FormControl,
  FormField,
  FormInput,
  FormInputWrapper,
  FormItem,
  FormLabel,
} from './UI/Form';

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: 'Required' }),
});

export type Login = z.infer<typeof loginFormSchema>;

const defaultValues: Login = {
  email: '',
  password: '',
};

const login = async (data: Login): Promise<User> => {
  const response = await axiosInstance.post('/auth/login', data, {
    withCredentials: true,
  });

  return response.data;
};

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<Login>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: ({ firstName, lastName }) => {
      localStorage.setItem('user_name', `${firstName} ${lastName}`);
      router.push('/boards');
    },
    onError: (err: Error | AxiosError) => {},
  });

  const onSubmit: SubmitHandler<Login> = (data) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form
        method="post"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>address email</FormLabel>

              <FormControl>
                <FormInputWrapper>
                  <FormInput {...field} />
                </FormInputWrapper>
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
                <FormInputWrapper>
                  <FormInput type="password" {...field} />
                </FormInputWrapper>
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
