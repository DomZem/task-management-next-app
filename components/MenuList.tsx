'use client';

import useBoards from '@/hooks/board/useBoards';
import { PiWarningBold } from 'react-icons/pi';
import { TbLayoutBoardSplit } from 'react-icons/tb';
import CreateBoardForm from './BoardForm/CreateBoardForm';
import MenuListItem from './MenuListItem';
import { DialogTrigger } from './UI/Dialog';
import Loading from './UI/Loading';

export default function MenuList() {
  const { data: boards, isLoading, error } = useBoards();

  if (isLoading) {
    return (
      <section className="flex h-full items-center justify-center">
        <Loading />
      </section>
    );
  }

  if (error || !boards) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-200">
            <PiWarningBold className="text-lg text-red-600" />
          </div>
          <div className="text-center">
            <h3 className="text-primaryRed">Error</h3>
            <p className="text-heading-m font-normal">
              Something went wrong during fetch list of boards
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pr-6 pt-4">
      <div className="flex flex-col overflow-hidden">
        <h3 className="mb-[19px] ml-6 text-[12px] font-bold uppercase leading-normal tracking-[2.4px] text-primaryMediumGrey">
          all boards ({boards.length})
        </h3>

        <nav className="flex-1 overflow-y-auto overflow-x-hidden">
          {boards.map((board) => (
            <MenuListItem board={board} key={board.id} />
          ))}
        </nav>

        <CreateBoardForm>
          <DialogTrigger asChild>
            <button className="flex w-60 cursor-pointer items-center rounded-r-[100px] px-6 py-3.5 text-primaryPurple duration-200">
              <TbLayoutBoardSplit className="text-xl" />
              <p className="ml-3 text-heading-m">+ Create New Board</p>
            </button>
          </DialogTrigger>
        </CreateBoardForm>
      </div>
    </div>
  );
}
