'use client';

import useSlug from '@/hooks/useSlug';
import Link from 'next/link';
import { TbLayoutBoardSplit } from 'react-icons/tb';
import { BoardNoStatuses } from './BoardForm/formSchema';

interface MenuListItemProps {
  board: BoardNoStatuses;
}

export default function MenuListItem({
  board: { id, name },
}: MenuListItemProps) {
  const { slug } = useSlug();
  const isActive = slug === id.toString();

  return (
    <Link
      href={`/boards/${id}`}
      className={`flex w-full cursor-pointer items-center rounded-r-[100px] bg-opacity-10 px-6 py-3.5 font-bold text-primaryMediumGrey outline-none duration-200 ${
        isActive
          ? 'bg-primaryPurple text-primaryWhite'
          : 'hover:bg-[#635FC7]/10 hover:text-primaryPurple hover:dark:bg-primaryWhite'
      }`}
    >
      <TbLayoutBoardSplit className="text-xl" />
      <p className="ml-3 text-heading-m">{name}</p>
    </Link>
  );
}
