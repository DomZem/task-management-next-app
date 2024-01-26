'use client';

import useUpdateBoard from '@/hooks/board/useUpdateBoard';
import BoardFormTemplate from './BoardFormTemplate';
import { Board, Status } from './formSchema';

interface EditBoardFormProps {
  boardId: number;
  boardName: string;
  statuses: Status[];
  children: React.ReactNode;
}

export default function EditBoardForm({
  boardId,
  boardName,
  statuses,
  children: dialogTrigger,
}: EditBoardFormProps) {
  const { mutate, isPending, isSuccess } = useUpdateBoard();

  return (
    <BoardFormTemplate
      variant="edit"
      defaultValues={{
        id: boardId,
        name: boardName,
        statuses,
      }}
      onSubmit={(board: Board) => mutate(board)}
      isPending={isPending}
      isSuccess={isSuccess}
    >
      {dialogTrigger}
    </BoardFormTemplate>
  );
}
