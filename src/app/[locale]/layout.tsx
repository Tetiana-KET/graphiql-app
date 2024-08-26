/* eslint react-refresh/only-export-components: "off" */

import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { dir } from 'i18next';

import TranslationsProvider from '@/components/TranslationsProvider';
import { i18nNamespaces } from '@/consts/i18nNameSpaces';
import Header from './_components/Header/Header';
import Footer from './_components/Footer/Footer';

import '@styles/globals.scss';
import './_styles/layout.scss';
import i18nConfig from '../../../i18nConfig';
import initTranslations from '../i18n';

export const metadata: Metadata = {
  title: 'REST/GraphiQL Client',
  description:
    'A light-weight versions of Postman and GrqphiQL combined in one app',
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <html lang={locale} dir={dir(locale)}>
      <body>
        <TranslationsProvider
          namespaces={i18nNamespaces}
          locale={locale}
          resources={resources}
        >
          <NextUIProvider className="flex flex-col flex-1">
            <Header />
            <main className="page-container">{children}</main>
            <Footer locale={locale} />
          </NextUIProvider>
        </TranslationsProvider>
      </body>
    </html>
  );
}
