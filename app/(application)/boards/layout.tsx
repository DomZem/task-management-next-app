import LogoutButton from '@/components/LogoutButton';
import MenuList from '@/components/MenuList';
import { ModeToggle } from '@/components/ModeToggle';
import logoImage from '@/public/logo.svg';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

interface BoardsLayoutProps {
  children: React.ReactNode;
}

export default function BoardsLayout({ children }: BoardsLayoutProps) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token');

  if (!accessToken) {
    redirect('/');
  }

  return (
    <div className="h-screen md:grid md:grid-cols-[16rem_1fr] xl:grid-cols-[300px_1fr]">
      <aside className="hidden flex-col border-r border-primaryLinesLight bg-white dark:border-primaryLinesDark dark:bg-primaryDarkGrey md:flex">
        <header className="flex h-20 items-center gap-4 px-6 xl:h-24">
          <Image src={logoImage} alt="logo" />

          <Link href="/boards">
            <h1 className="text-2xl font-bold">Kanban</h1>
          </Link>
        </header>

        <section className="flex flex-1 flex-col justify-between">
          <MenuList />

          <div className="flex flex-col gap-3 p-6">
            <ModeToggle />
            <LogoutButton />
          </div>
        </section>
      </aside>
      {children}
    </div>
  );
}
