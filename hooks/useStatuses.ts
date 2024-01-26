import { Status } from '@/components/BoardForm/formSchema';
import { axiosInstance } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import useSlug from './useSlug';

export const getStatuses = async (boardId: number): Promise<Status[]> => {
  const response = await axiosInstance.get(`/statuses?boardId=${boardId}`, {
    withCredentials: true,
  });

  return response.data;
};

export default function useStatuses() {
  const { slug } = useSlug();
  const boardId = parseInt(slug);

  return useQuery({
    queryFn: () => getStatuses(boardId),
    queryKey: ['boards', boardId],
  });
}
