'use client';

import useBoards from '@/hooks/board/useBoards';
import { TbLayoutBoardSplit } from 'react-icons/tb';
import CreateBoardForm from './BoardForm/CreateBoardForm';
import ErrorWrapper from './ErrorWrapper';
import MenuListItem from './MenuListItem';
import { DialogTrigger } from './UI/Dialog';
import Loading from './UI/Loading';

export default function MenuList() {
  const { data: boards, isLoading, error } = useBoards();

  if (isLoading) {
    return (
      <section
        className="flex items-center justify-center pb-4 pt-8"
        data-testid="loading"
      >
        <Loading />
      </section>
    );
  }

  if (!boards || error) {
    return (
      <div className="flex items-center justify-center p-6">
        <ErrorWrapper
          className="text-center"
          message="Something went wrong during fetch boards"
        />
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
          <DialogTrigger className="flex w-60 cursor-pointer items-center rounded-r-[100px] px-6 py-3.5 text-heading-m capitalize text-primaryPurple duration-200">
            <TbLayoutBoardSplit className="mr-3 text-xl" />+ create new board
          </DialogTrigger>
        </CreateBoardForm>
      </div>
    </div>
  );
}
