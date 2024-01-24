import MenuList from '@/components/MenuList';
import { ModeToggle } from '@/components/ModeToggle';
import { Button } from '@/components/UI/Button';
import logoImage from '@/public/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { MdLogout } from 'react-icons/md';

interface BoardsLayoutProps {
  children: React.ReactNode;
}

export default function BoardsLayout({ children }: BoardsLayoutProps) {
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
            <Button className="cursor-pointer" asChild>
              <div className="flex items-center justify-center gap-3">
                <MdLogout className="text-base" />
                logout
              </div>
            </Button>
          </div>
        </section>
      </aside>
      {children}
    </div>
  );
}
