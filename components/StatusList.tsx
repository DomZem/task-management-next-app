'use client';

import useBoard from '@/hooks/board/useBoard';
import useStatuses from '@/hooks/useStatuses';
import { handleError } from '@/lib/axios';
import { notFound } from 'next/navigation';
import { MdAdd } from 'react-icons/md';
import BoardEmpty from './BoardEmpty';
import EditBoardForm from './BoardForm/EditBoardForm';
import StatusListItem from './StatusListItem';
import { DialogTrigger } from './UI/Dialog';
import Loading from './UI/Loading';

export default function StatusList() {
  const {
    data: board,
    isLoading: isBoardLoading,
    error: boardError,
  } = useBoard();

  const { data: statuses, isLoading, error } = useStatuses();

  if (isLoading || isBoardLoading) {
    return (
      <section
        className="flex h-full items-center justify-center"
        data-testid="status-list-loading"
      >
        <Loading />
      </section>
    );
  }

  if (error) {
    handleError(error);
  }

  if (boardError) {
    handleError(boardError);
  }

  if (!board) {
    return notFound();
  }

  if (!statuses?.length) {
    return <BoardEmpty boardId={board.id} boardName={board.name} />;
  }

  return (
    <ul className="flex min-h-full min-w-fit gap-6">
      {statuses.map((status) => (
        <StatusListItem status={status} key={status.id} />
      ))}

      <EditBoardForm
        boardId={board.id}
        boardName={board.name}
        statuses={statuses}
      >
        <DialogTrigger asChild>
          <li className="min-h-full w-[280px] pt-10">
            <div className="flex h-full items-center justify-center rounded-md bg-column text-primaryMediumGrey duration-200 hover:text-primaryPurple dark:bg-columnDark">
              <button className="flex h-full w-full items-center justify-center text-2xl font-bold capitalize">
                <MdAdd />
                new column
              </button>
            </div>
          </li>
        </DialogTrigger>
      </EditBoardForm>
    </ul>
  );
}
