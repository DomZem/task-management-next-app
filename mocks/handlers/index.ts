import { auth } from './auth';
import { boards } from './boards';
import { statuses } from './statuses';
import { subtasks } from './subtasks';
import { tasks } from './tasks';

export const handlers = [
  ...auth,
  ...boards,
  ...statuses,
  ...tasks,
  ...subtasks,
];
