import { Task } from '@/components/TaskForm/formSchema';
import { axiosInstance } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

const getTasks = async (
  statusId: number,
): Promise<Omit<Task, 'subtasks'>[]> => {
  const response = await axiosInstance.get(`/tasks?statusId=${statusId}`, {
    withCredentials: true,
  });

  return response.data;
};

export default function useTasks(statusId: number) {
  return useQuery({
    queryFn: () => getTasks(statusId),
    queryKey: ['tasks', statusId],
  });
}
