import { Task } from './TaskForm/formSchema';
import TaskListItem from './TaskListItem';

interface TaskListProps {
  tasks: Omit<Task, 'subtasks'>[];
}

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <ul className="flex flex-col gap-5">
      {tasks.map((task) => (
        <TaskListItem task={task} key={task.id} />
      ))}
    </ul>
  );
}
