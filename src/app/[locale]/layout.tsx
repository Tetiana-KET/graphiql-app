/* eslint react-refresh/only-export-components: "off" */

import type { Metadata } from 'next';
import { ReactNode } from 'react';

import './_styles/layout.scss';
import { NextUIProvider } from '@nextui-org/react';
import '@styles/globals.scss';
import Header from './_components/Header/Header';
import Footer from './_components/Footer/Footer';

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
        <NextUIProvider>
          <Header />
          <main className="page-container">{children}</main>
          <Footer />
        </NextUIProvider>
      </body>
    </html>
  );
}
