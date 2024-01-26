import useSubtasksQuery from '@/hooks/useSubtasksQuery';
import { getCompletedSubtasksAmount } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Task } from './TaskForm/formSchema';
import TaskListItemContent from './TaskListItemContent';
import { Dialog, DialogTrigger } from './UI/Dialog';

interface TaskListItemProps {
  task: Omit<Task, 'subtasks'>;
}

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function TaskListItem({ task }: TaskListItemProps) {
  const { data: subtasks, isLoading, error } = useSubtasksQuery(task.id);

  if (isLoading) {
    return <div>loading ...</div>;
  }

  if (error) {
    return <div>error</div>;
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
