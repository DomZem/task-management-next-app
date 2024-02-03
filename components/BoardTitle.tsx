'use client';

import useBoard from '@/hooks/board/useBoard';
import { handleError } from '@/lib/axios';
import { notFound } from 'next/navigation';
import { Skeleton } from './UI/Skeleton';

export default function BoardTitle() {
  const { data: board, isLoading, error } = useBoard();

  if (isLoading) {
    return <Skeleton className="h-[15px] w-[150px]" />;
  }

  if (error) {
    handleError(error);
  }

  if (!board) {
    return notFound();
  }

  return <h2 className="text-heading-l">{board.name}</h2>;
}
