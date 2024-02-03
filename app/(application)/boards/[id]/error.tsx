'use client';

import { Button } from '@/components/UI/Button';
import errorImage from '@/public/error.svg';
import Image from 'next/image';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const message = error.message;

  return (
    <main className="flex h-full items-center justify-center">
      <section className="max-w-lg p-5">
        <Image src={errorImage} alt="board error" />
        <div className="mt-5 text-center">
          <h2 className="text-heading-xl text-primaryRed">Error</h2>

          <p className="mt-2 text-primaryMediumGrey">
            Something went wrong during fetch board details.
          </p>

          {!!message.length && (
            <p className="font-medium text-primaryRed">{message}</p>
          )}

          <div className="mt-4 flex w-full items-center justify-center gap-3">
            <Button
              className="flex-1"
              variant="secondary"
              onClick={() => reset()}
            >
              try again
            </Button>

            <Button className="flex-1" asChild>
              <Link href="/boards">back to home</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
