import { Board } from '@/components/BoardForm/formSchema';
import { axiosInstance } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

const getBoards = async (): Promise<Omit<Board, 'statuses'>[]> => {
  const response = await axiosInstance.get('/boards', {
    withCredentials: true,
  });

  return response.data;
};

export default function useBoardsQuery() {
  return useQuery({
    queryFn: getBoards,
    queryKey: ['boards'],
  });
}
