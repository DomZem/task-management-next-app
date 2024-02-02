import { Skeleton } from './UI/Skeleton';

export default function TaskListItemSkeleton() {
  return (
    <li
      className="rounded-lg bg-primaryWhite px-4 py-[23px] shadow-task dark:bg-primaryDarkGrey"
      data-testid="task-list-item-skeleton"
    >
      <Skeleton className="mb-[15px] h-[19px] w-[50px] rounded-full" />
      <Skeleton className="h-[15px] w-[100px] rounded-full" />
    </li>
  );
}
