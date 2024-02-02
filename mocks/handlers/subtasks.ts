import { API_URL } from '@/lib/axios';
import { rest } from 'msw';

export const subtasks = [
  rest.get(`${API_URL}/subtasks`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
];
