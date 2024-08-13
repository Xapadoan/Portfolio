import cn from 'classnames';
import RootLayout from '@components/Layout';
import { Banner } from '@components/branding/Banner';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import { firaSans } from '@styles/fonts';

const defaultMeta: Metadata = {
  title: 'Xavier Padoan • Articles',
};

export function ArticleLayout({
  meta,
  children,
}: Readonly<{
  meta?: Metadata;
  children: ReactNode;
}>) {
  return (
    <RootLayout meta={{ ...defaultMeta, ...meta }}>
      <Banner />
      <section className="py-10 flex justify-center">
        <article
          className={cn(
            'w-[90vw] md:w-[60vw] h-full flex flex-col gap-12 text-lg',
            firaSans.className
          )}
        >
          {children}
        </article>
      </section>
    </RootLayout>
  );
}
