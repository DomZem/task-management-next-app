'use client';

import { FaChevronDown } from 'react-icons/fa';

import { useState } from 'react';
import LogoutButton from './LogoutButton';
import MenuList from './MenuList';
import { ModeToggle } from './ModeToggle';
import { Dialog, DialogContent, DialogTrigger } from './UI/Dialog';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog onOpenChange={() => setIsOpen((prev) => !prev)}>
      <DialogTrigger className="md:hidden">
        <FaChevronDown
          className={`text-xs font-bold text-primaryPurple duration-200 ${isOpen && 'rotate-180'}`}
        />
      </DialogTrigger>

      <DialogContent className="flex max-h-[90%] max-w-[264px] overflow-hidden p-0">
        <section className="grid flex-1 overflow-hidden">
          <div className="overflow-auto">
            <MenuList />
          </div>

          <div className="flex flex-col gap-3 p-4">
            <ModeToggle />
            <LogoutButton />
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}
