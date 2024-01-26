import { axiosInstance } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const deleteBoard = async (id: number) => {
  const response = await axiosInstance.delete(`/boards/${id}`, {
    withCredentials: true,
  });

  return response.data;
};

export default function useDeleteBoard(boardId: number) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () =>
      toast.promise(deleteBoard(boardId), {
        loading: 'Deleting board ...',
        success: 'Board has been deleted',
        error: 'Something went wrong',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] });
      router.back();

      // todo: if last statuses back to /boards
    },
  });
}
