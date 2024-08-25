'use client';

import { useRouter, usePathname } from 'next/navigation';

import { useTranslation } from 'react-i18next';
import { ChangeEvent } from 'react';
import { COOKIES_LIFE } from '@/consts/cookiesConsts';
import i18nConfig from '../../../../../i18nConfig';

export default function LanguageChanger() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    const date = new Date();
    date.setTime(date.getTime() + COOKIES_LIFE);
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`;

    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push(`/${newLocale}${currentPathname}`);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`),
      );
    }

    router.refresh();
  };

  return (
    <select onChange={handleChange} value={currentLocale}>
      <option value="en">English</option>
      <option value="de">Deutsch</option>
      <option value="ru">Русский</option>
      <option value="zh">漢</option>
    </select>
  );
}
