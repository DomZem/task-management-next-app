import { Task, TaskNoSubtasks } from '@/components/TaskForm/formSchema';
import { axiosInstance } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const updateTask = async (task: Task): Promise<TaskNoSubtasks> => {
  const response = await axiosInstance.put(`/tasks/${task.id}`, task, {
    withCredentials: true,
  });

  return response.data;
};

export default function useUpdateTask(statusId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: Task) =>
      toast.promise(updateTask(task), {
        loading: 'Updating task ...',
        success: 'Task has been updated',
        error: 'Something went wrong',
      }),
    onSuccess: ({ id: taskId, statusId: updatedStatusId }) => {
      // Refetch previous and current tasks list after update, user might update task status by form
      queryClient.invalidateQueries({ queryKey: ['tasks', statusId] });
      queryClient.invalidateQueries({ queryKey: ['tasks', updatedStatusId] });

      queryClient.invalidateQueries({ queryKey: ['subtasks', taskId] });
    },
  });
}
