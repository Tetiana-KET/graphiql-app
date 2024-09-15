/* eslint react-refresh/only-export-components: "off" */

import { NextUIProvider } from '@nextui-org/react';
import { ReactNode } from 'react';

import TranslationsProvider from '@/components/TranslationsProvider';
import { i18nNamespaces } from '@/consts/i18nNameSpaces';
import { Metadata } from 'next';
import Footer from './_components/Footer/Footer';
import Header from './_components/Header/Header';

import '@styles/globals.scss';
import i18nConfig from '../../../i18nConfig';
import initTranslations from '../i18n';
import './_styles/layout.scss';

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'REST/GraphQL Client',
  description:
    'A light-weight versions of Postman and GraphQL combined in one app',
};

export default async function Layout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <NextUIProvider className="flex flex-col flex-1">
        <Header />
        <main className="page-container">{children}</main>
        <Footer />
      </NextUIProvider>
    </TranslationsProvider>
  );
}
