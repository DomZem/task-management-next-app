'use client';

import useDeleteBoard from '@/hooks/board/useDeleteBoard';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './UI/AlertDialog';

interface DeleteBoardModalProps {
  boardId: number;
  boardName: string;
}

export default function DeleteBoardModal({
  boardId,
  boardName,
}: DeleteBoardModalProps) {
  const { mutate, isPending } = useDeleteBoard(boardId);

  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-primaryRed">
        Delete board
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this board?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the{' '}
            <span className="font-bold text-black dark:text-white">
              `{boardName}`
            </span>{' '}
            board? This action will remove all columns and tasks and cannot be
            reversed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction disabled={isPending} onClick={() => mutate()}>
            Delete
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
