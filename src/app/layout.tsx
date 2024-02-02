import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Providers from '@/lib/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jav Codes',
  description: 'Share your japanese adult movie codes'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
