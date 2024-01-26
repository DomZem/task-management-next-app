'use client';

import { useTheme } from 'next-themes';
import { Toaster as ReactToaster } from 'react-hot-toast';

export default function Toaster() {
  const { theme } = useTheme();

  return (
    <ReactToaster
      toastOptions={{
        style: {
          backgroundColor: theme === 'dark' ? '#20212c' : '#ffffff',
          color: theme === 'dark' ? '#ffffff' : '#20212c',
          fontSize: '13px',
          fontWeight: 500,
          maxWidth: '400px',
        },
      }}
    />
  );
}
