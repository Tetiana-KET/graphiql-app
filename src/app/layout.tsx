/* eslint react-refresh/only-export-components: "off" */
import type { Metadata } from 'next';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

import './globals.scss';

export const metadata: Metadata = {
  title: 'REST/GraphiQL Client',
  description:
    'A light-weight versions of Postman and GrqphiQL combined in one app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
