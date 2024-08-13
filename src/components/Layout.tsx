import cn from 'classnames';
import { ReactNode } from 'react';
import { cutiveMono } from '@styles/fonts';
import { Metadata } from 'next';
import { NextSeo } from 'next-seo';
import { Footer } from '@components/footer/Footer';

export default function RootLayout({
  children,
  meta,
}: Readonly<{
  children: ReactNode;
  meta?: Metadata;
}>) {
  return (
    <>
      <NextSeo title={meta?.title?.toString() || 'Xavier Padoan • Dev'} />
      <main
        className={cn('w-screen h-svh overflow-auto', cutiveMono.className)}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
