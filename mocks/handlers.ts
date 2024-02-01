import { API_URL } from '@/lib/axios';
import { rest } from 'msw';

export const handlers = [
  rest.get(`${API_URL}/auth/logout`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.get(`${API_URL}/boards`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
