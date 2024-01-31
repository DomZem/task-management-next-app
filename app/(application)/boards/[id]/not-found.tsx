import { Button } from '@/components/UI/Button';
import boardNotFound from '@/public/board-not-found.svg';
import Image from 'next/image';
import Link from 'next/link';

export default function BoardNotFound() {
  return (
    <main className="flex h-full items-center justify-center">
      <section className="max-w-lg p-5">
        <Image src={boardNotFound} alt="board not found" />
        <div className="mt-5 text-center">
          <h2 className="text-heading-xl">Board not found</h2>

          <p className="mb-3 mt-2 text-primaryMediumGrey">
            Something went wrong during fetch board details
          </p>

          <Button large asChild className="inline-block">
            <Link href="/boards">Back to home</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
