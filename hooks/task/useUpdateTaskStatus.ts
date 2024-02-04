import { TaskNoSubtasks } from '@/components/TaskForm/formSchema';
import { axiosInstance } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const updateTaskStatus = async (
  taskId: number,
  statusId: number,
): Promise<TaskNoSubtasks> => {
  const response = await axiosInstance.patch(
    `/tasks/${taskId}`,
    {
      statusId,
    },
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export default function useUpdateTaskStatus(
  taskId: number,
  currentStatusId: number,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (statusId: number) =>
      toast.promise(updateTaskStatus(taskId, statusId), {
        loading: 'Updating task status ...',
        success: 'Task status has been updated',
        error: 'Something went wrong',
      }),
    onSuccess: ({ statusId }) => {
      // refetch previous and current tasks list after update
      queryClient.invalidateQueries({ queryKey: ['tasks', statusId] });
      queryClient.invalidateQueries({ queryKey: ['tasks', currentStatusId] });
    },
  });
}
