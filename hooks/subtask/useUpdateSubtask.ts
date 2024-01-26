import { Subtask } from '@/components/TaskForm/formSchema';
import { axiosInstance } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const updateSubtaskIsComplete = async (
  id: number,
  isComplete: boolean,
): Promise<Subtask & { taskId: number }> => {
  const response = await axiosInstance.patch(
    `/subtasks/${id}`,
    {
      isComplete,
    },
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export default function useUpdateSubtask(
  subtaskId: number,
  isComplete: boolean,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      toast.promise(updateSubtaskIsComplete(subtaskId, !isComplete), {
        loading: 'Updating subtask ...',
        success: 'Subtask has been updated',
        error: 'Something went wrong',
      }),
    onSuccess: ({ taskId }) => {
      queryClient.invalidateQueries({ queryKey: ['subtasks', taskId] });
    },
  });
}
