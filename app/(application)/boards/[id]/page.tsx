import StatusList from '@/components/StatusList';
import logoImage from '@/public/logo.svg';
import Image from 'next/image';

export default function BoardDetailsPage() {
  return (
    <div className="grid h-full grid-rows-[4rem_1fr] overflow-hidden md:grid-rows-[5rem_1fr] xl:grid-rows-[6rem_1fr]">
      <header className="flex items-center justify-between border-b border-primaryLinesLight bg-white px-4 dark:border-primaryLinesDark dark:bg-primaryDarkGrey">
        <section className="flex items-center gap-4">
          <Image src={logoImage} alt="logo" />

          <h2>Board title</h2>
        </section>

        {/* Board Actions */}
      </header>

      <div className="flex overflow-hidden">
        <main className="flex-1 overflow-y-auto px-3 py-5">
          <StatusList />
        </main>
      </div>
    </div>
  );
}
