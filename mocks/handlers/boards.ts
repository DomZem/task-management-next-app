import { API_URL } from '@/lib/axios';
import { rest } from 'msw';

export const boards = [
  rest.post(`${API_URL}/boards`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.get(`${API_URL}/boards`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),

  rest.get(`${API_URL}/boards/:id`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.put(`${API_URL}/boards/:id`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.delete(`${API_URL}/boards/:id`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
