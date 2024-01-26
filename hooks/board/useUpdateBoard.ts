import { Board } from '@/components/BoardForm/formSchema';
import { axiosInstance } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const updateBoard = async (board: Board): Promise<Omit<Board, 'statuses'>> => {
  const response = await axiosInstance.put(`/boards/${board.id}`, board, {
    withCredentials: true,
  });

  return response.data;
};

export default function useUpdateBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (board: Board) =>
      toast.promise(updateBoard(board), {
        loading: 'Updating board ...',
        success: 'Board has been updated',
        error: 'Something went wrong',
      }),
    onSuccess: (board) => {
      queryClient.invalidateQueries({ queryKey: ['boards'] });
      queryClient.invalidateQueries({ queryKey: ['boardDetails', board.id] });
    },
  });
}
