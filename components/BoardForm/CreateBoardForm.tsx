'use client';

import { colors } from '@/data/colors';
import useBoardMutation from '@/hooks/useBoardMutation';
import BoardFormTemplate from './BoardFormTemplate';
import { Board } from './formSchema';

interface CreateBoardFormProps {
  children: React.ReactNode;
}

export default function CreateBoardForm({
  children: dialogTrigger,
}: CreateBoardFormProps) {
  const { mutate, isPending, isSuccess } = useBoardMutation();

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
      isSuccess={isSuccess}
    >
      {dialogTrigger}
    </BoardFormTemplate>
  );
}
