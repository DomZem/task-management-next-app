import CreateBoardForm from '@/components/BoardForm/CreateBoardForm';
import GreetingTitle from '@/components/GreetingTitle';
import MobileNav from '@/components/MobileNav';
import { Button } from '@/components/UI/Button';
import { DialogTrigger } from '@/components/UI/Dialog';
import logoImage from '@/public/logo.svg';
import Image from 'next/image';

export default function BoardsPage() {
  return (
    <>
      <header className="flex h-16 items-center bg-white px-4 dark:bg-primaryDarkGrey md:hidden">
        <section className="flex items-center gap-4">
          <Image src={logoImage} alt="logo" />

          <div className="flex items-center gap-2">
            <h1 className="text-heading-l">Kanban</h1>

            <MobileNav />
          </div>
        </section>
      </header>

      <main className="flex h-full flex-col items-center justify-center gap-6">
        <GreetingTitle />

        <CreateBoardForm>
          <DialogTrigger asChild>
            <Button large>create board</Button>
          </DialogTrigger>
        </CreateBoardForm>
      </main>
    </>
  );
}
