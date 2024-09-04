'use client';

import { AuthProvider } from '@/components/AuthProvider';
import { SnackbarProvider } from 'notistack';
import { ReactNode } from 'react';

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
        <SnackbarProvider maxSnack={3}>
          <AuthProvider>{children}</AuthProvider>
        </SnackbarProvider>
      </body>
    </html>
  );
}
