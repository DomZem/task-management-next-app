import { motion } from 'framer-motion';
import { TaskNoSubtasks } from './TaskForm/formSchema';
import TaskListItem from './TaskListItem';

interface TaskListProps {
  tasks: TaskNoSubtasks[];
}

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <motion.ul
      className="flex flex-col gap-5"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {tasks.map((task) => (
        <TaskListItem task={task} key={task.id} />
      ))}
    </motion.ul>
  );
}
