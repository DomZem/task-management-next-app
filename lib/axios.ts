import axios from 'axios';
import { notFound } from 'next/navigation';

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const handleError = (error: Error) => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 404) {
      return notFound();
    }

    const errorMessage = error.response?.data.message;

    if (errorMessage) {
      throw new Error(errorMessage);
    }
  }

  throw new Error();
};
