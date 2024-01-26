import TaskListItemSkeleton from './TaskListItemSkeleton';
import { Skeleton } from './UI/Skeleton';

export default function StatusListItemSkeleton() {
  return (
    <li className="flex w-[280px] flex-col gap-6">
      <div className="flex gap-x-3">
        <Skeleton className="h-[15px] w-[15px] rounded-full" />
        <Skeleton className="h-[15px] w-[100px]" />
      </div>
      <ul className="flex flex-col gap-5">
        <TaskListItemSkeleton />
        <TaskListItemSkeleton />
        <TaskListItemSkeleton />
      </ul>
    </li>
  );
}
