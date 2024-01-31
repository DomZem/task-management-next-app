import { Login } from '@/components/LoginForm/formSchema';
import { axiosInstance } from '@/lib/axios';
import { User } from '@/types';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const login = async (data: Login): Promise<User> => {
  const response = await axiosInstance.post('/auth/login', data, {
    withCredentials: true,
  });

  return response.data;
};

export default function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: ({ firstName, lastName }) => {
      localStorage.setItem('user_name', `${firstName} ${lastName}`);
      router.push('/boards');
    },
    onError: (error: Error | AxiosError) => {
      let message = 'Something went wrong. You have not been logged in';

      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message;

        if (errorMessage) {
          toast.error(`${message}. Error: ${errorMessage}`);
          return;
        }
      }

      toast.error(message);
    },
  });
}
