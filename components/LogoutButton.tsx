'use client';

import useLogout from '@/hooks/auth/useLogout';
import { MdLogout } from 'react-icons/md';
import { Button } from './UI/Button';

export default function LogoutButton() {
  const { mutate, isPending } = useLogout();

  return (
    <Button
      className="flex items-center justify-center gap-3"
      disabled={isPending}
      onClick={() => mutate()}
    >
      <MdLogout className="text-base" />
      Logout
    </Button>
  );
}
