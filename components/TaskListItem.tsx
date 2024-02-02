import useSubtasks from '@/hooks/subtask/useSubtasks';
import { getCompletedSubtasksAmount } from '@/lib/utils';
import { motion } from 'framer-motion';
import { TaskNoSubtasks } from './TaskForm/formSchema';
import TaskListItemContent from './TaskListItemContent';
import TaskListItemSkeleton from './TaskListItemSkeleton';
import { Dialog, DialogTrigger } from './UI/Dialog';

interface TaskListItemProps {
  task: TaskNoSubtasks;
}

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function TaskListItem({ task }: TaskListItemProps) {
  const { data: subtasks, isLoading, error } = useSubtasks(task.id);

  if (isLoading) {
    return <TaskListItemSkeleton />;
  }

  if (error) {
    return (
      <li className="rounded-lg bg-primaryWhite px-4 py-[23px] shadow-task dark:bg-primaryDarkGrey">
        <h4 className="mb-2 text-heading-m text-primaryRed">Error</h4>
        <p className="text-body-m font-medium text-primaryMediumGrey">
          Something went wrong during fetch subtasks
        </p>
      </li>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.li
          className="cursor-pointer rounded-lg bg-primaryWhite px-4 py-[23px] shadow-task outline-none transition-shadow duration-200 hover:shadow-taskHover dark:bg-primaryDarkGrey"
          variants={item}
        >
          <h4 className="mb-2 break-words text-heading-m text-primaryBlack dark:text-primaryWhite">
            {task.title}
          </h4>
          <p className="text-body-m text-primaryMediumGrey">
            {getCompletedSubtasksAmount(subtasks)} of {subtasks.length} subtasks
          </p>
        </motion.li>
      </DialogTrigger>

      <TaskListItemContent task={task} subtasks={subtasks} />
    </Dialog>
  );
}
