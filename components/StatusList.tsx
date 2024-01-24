'use client';

import { default as useBoardQuery } from '@/hooks/useBoardQuery';
import useStatusesQuery from '@/hooks/useStatusesQuery';
import StatusListItem from './StatusListItem';
import Loading from './UI/Loading';

export default function StatusList() {
  const {
    data: board,
    isLoading: isBoardLoading,
    error: boardError,
  } = useBoardQuery();

  const { data: statuses, isLoading, error } = useStatusesQuery();

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
    return <div>board empty</div>;
  }

  return (
    <ul className="flex min-h-full min-w-fit justify-start gap-x-4">
      {statuses.map((status) => (
        <StatusListItem status={status} key={status.id} />
      ))}

      {/* Edit board future */}
    </ul>
  );
}
