import useDeleteTask from '@/hooks/task/useDeleteTask';
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

interface DeleteTaskModalProps {
  taskId: number;
  taskTitle: string;
  statusId: number;
}

export default function DeleteTaskModal({
  taskId,
  taskTitle,
  statusId,
}: DeleteTaskModalProps) {
  const { mutate, isPending } = useDeleteTask(taskId, statusId);

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <button className="text-primaryRed">Delete task</button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this task</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the{' '}
            <span className="font-bold text-black dark:text-white">
              `{taskTitle}`
            </span>{' '}
            task and its subtasks? This action cannot be reversed.
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
