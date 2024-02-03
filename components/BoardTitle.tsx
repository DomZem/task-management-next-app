'use client';

import useBoard from '@/hooks/board/useBoard';
import { handleError } from '@/lib/axios';
import { notFound } from 'next/navigation';

export default function BoardTitle() {
  const { data: board, isLoading, error } = useBoard();

  if (isLoading) {
    return <h2 className="text-heading-l">loading ...</h2>;
  }

  if (error) {
    handleError(error);
  }

  if (!board) {
    return notFound();
  }

  return <h2 className="text-heading-l">{board.name}</h2>;
}
