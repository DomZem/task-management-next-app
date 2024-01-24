'use client';

import { Toaster as ReactToaster } from 'react-hot-toast';

export default function Toaster() {
  return (
    <ReactToaster
      toastOptions={{
        style: {
          fontSize: '15px',
          fontWeight: 500,
          maxWidth: '400px',
        },
      }}
    />
  );
}
