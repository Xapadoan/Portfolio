import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>{children}</body>
    </>
  );
}
