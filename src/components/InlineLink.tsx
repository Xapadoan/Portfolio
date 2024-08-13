import Link from 'next/link';
import { ReactNode } from 'react';

export function InlineLink({
  href,
  children,
}: Readonly<{ href: string; children: ReactNode }>) {
  return (
    <Link
      className="hover:text-secondary-fg underline-offset-2 underline decoration-dotted cursor-pointer"
      href={href}
    >
      {children}
    </Link>
  );
}
