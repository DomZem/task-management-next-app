import { BoardNoStatuses } from '@/components/BoardForm/formSchema';
import { axiosInstance } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

const getBoards = async (): Promise<BoardNoStatuses[]> => {
  const response = await axiosInstance.get('/boards', {
    withCredentials: true,
  });

  return response.data;
};

export default function useBoards() {
  return useQuery({
    queryFn: getBoards,
    queryKey: ['boards'],
  });
}
