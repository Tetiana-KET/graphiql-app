/* eslint react-refresh/only-export-components: "off" */
import type { Metadata } from 'next';
import { ReactNode } from 'react';

import Header from '@/app/_components/Header/Header';
import Footer from '@/app/_components/Footer/Footer';

import '@/app/_styles/layout.scss';
import '@styles/globals.scss';

export const metadata: Metadata = {
  title: 'REST/GraphiQL Client',
  description:
    'A light-weight versions of Postman and GrqphiQL combined in one app',
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
