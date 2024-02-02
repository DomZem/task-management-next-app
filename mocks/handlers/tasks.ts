import { API_URL } from '@/lib/axios';
import { rest } from 'msw';

export const tasks = [
  rest.delete(`${API_URL}/tasks/:id`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.get(`${API_URL}/tasks`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
];
