import { ReactNode } from 'react';
import { Circle } from '@assets/circle';
import cn from 'classnames';
import { cutiveMono } from '@styles/fonts';

export function ArticleSection({
  id,
  title,
  children,
}: Readonly<{ id: string; title?: string; children: ReactNode }>) {
  return (
    <section id={id}>
      {title && <h3 className="text-4xl mb-4">{title}</h3>}
      {children}
    </section>
  );
}

export function ArticleParagraph({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <p className="my-2">{children}</p>;
}

export function ArticleBulletPoints({
  children,
  label,
}: Readonly<{
  children: ReactNode;
  label?: string;
}>) {
  return (
    <ul className="list-item-disc">
      {label && <p>{label}</p>}
      {children}
    </ul>
  );
}

export function ArticleBulletPointsItem({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <li className="pl-10 flex items-center gap-2">
      <Circle color="var(--foreground-primary)" radius={5} />
      {children}
    </li>
  );
}

export function InlineCode({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <span
      className={cn(
        'bg-highlight-bg p-1 rounded-md font-bold',
        cutiveMono.className
      )}
    >
      {children}
    </span>
  );
}

export function ArticleMainTitle({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <h1 className="text-6xl">{children}</h1>;
}
