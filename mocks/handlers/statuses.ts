import { API_URL } from '@/lib/axios';
import { rest } from 'msw';

export const statuses = [
  rest.get(`${API_URL}/statuses`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
];
