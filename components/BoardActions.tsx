'use client';

import useBoardQuery from '@/hooks/useBoardQuery';
import useStatusesQuery from '@/hooks/useStatusesQuery';
import { HiDotsVertical } from 'react-icons/hi';
import EditBoardForm from './BoardForm/EditBoardForm';
import CreateTaskForm from './TaskForm/CreateTaskForm';
import { DialogTrigger } from './UI/Dialog';
import { Popover, PopoverContent, PopoverTrigger } from './UI/Popover';

export default function BoardActions() {
  const {
    data: board,
    isLoading: isBoardLoading,
    error: boardError,
  } = useBoardQuery();
  const { data: statuses, isLoading, error } = useStatusesQuery();

  if (
    isBoardLoading ||
    boardError ||
    error ||
    isLoading ||
    !board ||
    !statuses?.length
  ) {
    return null;
  }

  return (
    <section className="flex items-center gap-2">
      <CreateTaskForm />

      <Popover>
        <PopoverTrigger className="p-2">
          <HiDotsVertical className="text-xl text-primaryMediumGrey" />
        </PopoverTrigger>

        <PopoverContent>
          <ul className="flex flex-col gap-4">
            <li>
              <EditBoardForm
                boardId={board.id}
                boardName={board.name}
                statuses={statuses}
              >
                <DialogTrigger asChild>
                  <button>Edit</button>
                </DialogTrigger>
              </EditBoardForm>
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </section>
  );
}
