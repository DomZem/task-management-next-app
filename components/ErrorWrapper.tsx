import { cn } from '@/lib/utils';
import { PiWarningBold } from 'react-icons/pi';

interface ErrorWrapperProps {
  message: string;
  className?: string;
}

export default function ErrorWrapper({
  message,
  className,
}: ErrorWrapperProps) {
  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
        <PiWarningBold className="text-lg text-primaryRed" />
      </div>
      <section>
        <h3 className="mb-2 text-center text-heading-m text-primaryRed">
          Error
        </h3>
        <p className="text-body-m font-medium text-primaryMediumGrey">
          {message}
        </p>
      </section>
    </div>
  );
}
