import { usePathname } from 'next/navigation';

export default function useSlug() {
  const pathname = usePathname();
  const slug = pathname.split('/')[2];

  return {
    slug,
  };
}
