import { axiosInstance } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

const getSubtasks = async (taskId: number) => {
  const response = await axiosInstance.get(`/subtasks?taskId=${taskId}`, {
    withCredentials: true,
  });

  return response.data;
};

export default function useSubtasks(taskId: number) {
  return useQuery({
    queryFn: () => getSubtasks(taskId),
    queryKey: ['subtasks', taskId],
  });
}
