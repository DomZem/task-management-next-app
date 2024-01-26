'use client';

import useUpdateSubtask from '@/hooks/useUpdateSubtask';
import { Subtask } from './TaskForm/formSchema';
import { Checkbox } from './UI/Checkbox';

interface SubtaskListItemProps {
  subtask: Subtask;
}

export default function SubtaskListItem({
  subtask: { id, title, isComplete },
}: SubtaskListItemProps) {
  const { mutate, isPending } = useUpdateSubtask(id, isComplete);

  return (
    <li className="flex items-center gap-x-4 rounded bg-primaryLightGrey p-3 duration-200 hover:bg-[#635FC7]/25 dark:bg-primaryVeryDarkGrey hover:dark:bg-[#635FC7]/25">
      <Checkbox
        checked={isComplete}
        disabled={isPending}
        onClick={() => mutate()}
      />

      <label
        htmlFor=""
        className={`relative cursor-pointer text-xs font-bold text-primaryBlack duration-200 dark:text-primaryWhite ${
          isComplete && 'text-[#000112] line-through opacity-50'
        }`}
      >
        {title}
      </label>
    </li>
  );
}
