import { auth } from './auth';
import { boards } from './boards';
import { tasks } from './tasks';

export const handlers = [...auth, ...boards, ...tasks];
