'use client';

import useRegister from '@/hooks/auth/useRegister';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../UI/Button';
import {
  Form,
  FormControl,
  FormField,
  FormInputWrapper,
  FormItem,
  FormLabel,
} from '../UI/Form';
import { Input } from '../UI/Input';
import { RegisterType, registerFormSchema } from './formSchema';

interface RegisterFormProps {
  defaultValues: RegisterType;
}

export default function RegisterForm({ defaultValues }: RegisterFormProps) {
  const form = useForm<RegisterType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues,
  });

  const { mutate, isPending } = useRegister();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => mutate(data))}
        className="space-y-6"
      >
        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>first name</FormLabel>

                <FormControl>
                  <FormInputWrapper>
                    <Input {...field} />
                  </FormInputWrapper>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>last name</FormLabel>

                <FormControl>
                  <FormInputWrapper>
                    <Input {...field} />
                  </FormInputWrapper>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>address email</FormLabel>

              <FormControl>
                <FormInputWrapper>
                  <Input {...field} />
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
                  <Input {...field} type="password" />
                </FormInputWrapper>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>confirm password</FormLabel>

              <FormControl>
                <FormInputWrapper>
                  <Input {...field} type="password" />
                </FormInputWrapper>
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          className="flex w-full items-center justify-center"
          type="submit"
          disabled={isPending}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
