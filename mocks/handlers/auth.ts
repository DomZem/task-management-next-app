import { API_URL } from '@/lib/axios';
import { rest } from 'msw';

export const auth = [
  rest.get(`${API_URL}/auth/logout`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
