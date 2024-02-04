'use client';

import useBoardQuery from '@/hooks/board/useBoard';
import useStatuses from '@/hooks/useStatuses';
import { HiDotsVertical } from 'react-icons/hi';
import EditBoardForm from './BoardForm/EditBoardForm';
import DeleteBoardModal from './DeleteBoardModal';
import CreateTaskForm from './TaskForm/CreateTaskForm';
import { DialogTrigger } from './UI/Dialog';
import { Popover, PopoverContent, PopoverTrigger } from './UI/Popover';

export default function BoardActions() {
  const {
    data: board,
    isLoading: isBoardLoading,
    error: boardError,
  } = useBoardQuery();
  const { data: statuses, isLoading, error } = useStatuses();

  if (isBoardLoading || boardError || error || isLoading || !board) {
    return null;
  }

  return (
    <section className="flex items-center gap-2">
      <CreateTaskForm />

      <Popover>
        <PopoverTrigger className="p-2">
          <HiDotsVertical className="text-xl text-primaryMediumGrey" />
        </PopoverTrigger>

        <PopoverContent align="end" sideOffset={24}>
          <ul className="flex flex-col gap-4">
            {!!statuses?.length && (
              <li>
                <EditBoardForm
                  boardId={board.id}
                  boardName={board.name}
                  statuses={statuses}
                >
                  <DialogTrigger className="capitalize duration-200 hover:text-primaryBlack dark:hover:text-white">
                    edit board
                  </DialogTrigger>
                </EditBoardForm>
              </li>
            )}

            <li>
              <DeleteBoardModal boardId={board.id} boardName={board.name} />
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </section>
  );
}
