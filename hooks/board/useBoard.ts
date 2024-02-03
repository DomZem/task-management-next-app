import { BoardNoStatuses } from '@/components/BoardForm/formSchema';
import { axiosInstance } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import useSlug from '../useSlug';

const getBoard = async (boardId: number): Promise<BoardNoStatuses> => {
  const response = await axiosInstance.get(`/boards/${boardId}`, {
    withCredentials: true,
  });

  return response.data;
};

export default function useBoard() {
  const { slug } = useSlug();
  const boardId = parseInt(slug);

  return useQuery({
    queryFn: () => getBoard(boardId),
    queryKey: ['boardDetails', boardId],
  });
}
