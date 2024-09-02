/* eslint-disable react-refresh/only-export-components */
import { AuthProvider } from '@/components/AuthProvider';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'REST/GraphQL Client',
  description:
    'A light-weight versions of Postman and GraphQL combined in one app',
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
