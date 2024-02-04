import { Task, TaskNoSubtasks } from '@/components/TaskForm/formSchema';
import { axiosInstance } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const createTask = async (task: Task): Promise<TaskNoSubtasks> => {
  const response = await axiosInstance.post('tasks', task, {
    withCredentials: true,
  });

  return response.data;
};

export default function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: Task) =>
      toast.promise(createTask(task), {
        loading: 'Creating task ...',
        success: 'Task has been created',
        error: 'Something went wrong',
      }),
    onSuccess: ({ statusId }) => {
      queryClient.invalidateQueries({ queryKey: ['tasks', statusId] });
    },
  });
}
