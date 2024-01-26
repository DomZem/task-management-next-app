import { Task } from '@/components/TaskForm/formSchema';
import { axiosInstance } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const updateTask = async (task: Task): Promise<Task> => {
  const response = await axiosInstance.put(`/tasks/${task.id}`, task, {
    withCredentials: true,
  });

  return response.data;
};

export default function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: Task) =>
      toast.promise(updateTask(task), {
        loading: 'Updating task ...',
        success: 'Task has been updated',
        error: 'Something went wrong',
      }),
    onSuccess: () => {
      // Todo: use appropiate key to invalidate
      queryClient.invalidateQueries({ queryKey: [] });
    },
  });
}
