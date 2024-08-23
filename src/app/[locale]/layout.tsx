/* eslint react-refresh/only-export-components: "off" */

import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';

import Header from './_components/Header/Header';
import Footer from './_components/Footer/Footer';

import '@styles/globals.scss';
import './_styles/layout.scss';

export const metadata: Metadata = {
  title: 'REST/GraphiQL Client',
  description:
    'A light-weight versions of Postman and GrqphiQL combined in one app',
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    // eslint-disable-next-line jsx-a11y/html-has-lang
    <html>
      <body>
        <NextUIProvider className="flex flex-col flex-1">
          <Header />
          <main className="page-container">{children}</main>
          <Footer />
        </NextUIProvider>
      </body>
    </html>
  );
}
