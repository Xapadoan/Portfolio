import { ReactNode } from 'react';
import { cutiveMono } from '@styles/fonts';
import Head from 'next/head';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Head>
        <title>Xavier Padoan &bull; Dev</title>
      </Head>
      <main className={cutiveMono.className}>{children}</main>
    </>
  );
}
