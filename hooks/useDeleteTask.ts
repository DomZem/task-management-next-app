import { axiosInstance } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const deleteTask = async (taskId: number) => {
  const response = await axiosInstance.delete(`/tasks/${taskId}`, {
    withCredentials: true,
  });

  return response.data;
};

export default function useDeleteTask(taskId: number, statusId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      toast.promise(deleteTask(taskId), {
        loading: 'Deleting task ...',
        success: 'Task has been deleted',
        error: 'Something went wrong',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', statusId] });
    },
  });
}
