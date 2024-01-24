import { Board } from '@/components/BoardForm/formSchema';
import { axiosInstance } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const createBoard = async (board: Board) => {
  const response = await axiosInstance.post('/boards', board, {
    withCredentials: true,
  });

  return response.data;
};

export default function useBoardMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (board: Board) =>
      toast.promise(createBoard(board), {
        loading: 'Creating board ...',
        success: 'Board has been created',
        error: 'Something went wrong',
      }),
    onSuccess: ({ id }: Omit<Board, 'statuses'>) => {
      queryClient.invalidateQueries({ queryKey: ['boards'] });
      router.push(`/boards/${id}`);
    },
  });
}
