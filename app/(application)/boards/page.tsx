import CreateBoardForm from '@/components/BoardForm/CreateBoardForm';
import { Button } from '@/components/UI/Button';
import { DialogTrigger } from '@/components/UI/Dialog';
import logoImage from '@/public/logo.svg';
import Image from 'next/image';

export default function BoardsPage() {
  return (
    <>
      <header className="flex h-16 items-center bg-white px-4 md:hidden">
        <div className="flex items-center gap-4">
          <Image src={logoImage} alt="logo" />
          <h1 className="text-heading-l">Kanban</h1>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center gap-6">
        <h2 className="text-heading-m">Hello, User Name</h2>

        <CreateBoardForm>
          <DialogTrigger asChild>
            <Button large>create board</Button>
          </DialogTrigger>
        </CreateBoardForm>
      </main>
    </>
  );
}
