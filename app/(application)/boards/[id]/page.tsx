import BoardActions from '@/components/BoardActions';
import BoardTitle from '@/components/BoardTitle';
import MobileNav from '@/components/MobileNav';
import StatusList from '@/components/StatusList';
import logoImage from '@/public/logo.svg';
import Image from 'next/image';

export default function BoardDetailsPage() {
  return (
    <div className="grid h-full grid-rows-[4rem_1fr] overflow-hidden md:grid-rows-[5rem_1fr] xl:grid-rows-[6rem_1fr]">
      <header className="flex items-center justify-between border-b border-primaryLinesLight bg-white px-4 dark:border-primaryLinesDark dark:bg-primaryDarkGrey">
        <section className="flex items-center gap-4">
          <Image src={logoImage} alt="logo" />

          <div className="flex items-center gap-2">
            <BoardTitle />

            <MobileNav />
          </div>
        </section>

        <BoardActions />
      </header>

      <div className="flex overflow-hidden">
        <main className="flex-1 overflow-y-auto px-4 py-6 md:p-6">
          <StatusList />
        </main>
      </div>
    </div>
  );
}
