'use client';

import { colors } from '@/data/colors';
import useCreateBoard from '@/hooks/board/useCreateBoard';
import BoardFormTemplate from './BoardFormTemplate';
import { Board } from './formSchema';

interface CreateBoardFormProps {
  children: React.ReactNode;
}

export default function CreateBoardForm({
  children: dialogTrigger,
}: CreateBoardFormProps) {
  const { mutate, isPending, isError } = useCreateBoard();

  return (
    <BoardFormTemplate
      variant="create"
      defaultValues={{
        id: 0,
        name: '',
        statuses: [
          {
            id: 0,
            name: '',
            color: colors[0].value,
          },
        ],
      }}
      onSubmit={(board: Board) => mutate(board)}
      isPending={isPending}
      isSuccess={!isPending && !isError}
    >
      {dialogTrigger}
    </BoardFormTemplate>
  );
}
