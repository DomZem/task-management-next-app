'use client';

import { FaChevronDown } from 'react-icons/fa';

import { useState } from 'react';
import { MdLogout } from 'react-icons/md';
import MenuList from './MenuList';
import { ModeToggle } from './ModeToggle';
import { Button } from './UI/Button';
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
      <DialogContent className="max-w-[264px] p-0">
        <section>
          <MenuList />
          <div className="flex flex-col gap-3 p-4">
            <ModeToggle />
            <Button className="cursor-pointer" asChild>
              <div className="flex items-center justify-center gap-3">
                <MdLogout className="text-base" />
                logout
              </div>
            </Button>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}
