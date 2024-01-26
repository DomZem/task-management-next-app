'use client';

import { default as useBoardQuery } from '@/hooks/board/useBoard';
import useStatuses from '@/hooks/useStatuses';
import BoardEmpty from './BoardEmpty';
import StatusListItem from './StatusListItem';
import Loading from './UI/Loading';

export default function StatusList() {
  const {
    data: board,
    isLoading: isBoardLoading,
    error: boardError,
  } = useBoardQuery();

  const { data: statuses, isLoading, error } = useStatuses();

  if (isLoading || isBoardLoading) {
    return (
      <section className="flex h-full items-center justify-center">
        <Loading />
      </section>
    );
  }

  if (!board) {
    return <div>no board</div>;
  }

  if (error || boardError) {
    return <div>error</div>;
  }

  if (!statuses?.length) {
    return <BoardEmpty boardId={board.id} boardName={board.name} />;
  }

  return (
    <ul className="justify-satrt flex min-h-full min-w-fit gap-x-4">
      {statuses.map((status) => (
        <StatusListItem status={status} key={status.id} />
      ))}

      {/* Edit board future */}
    </ul>
  );
}
