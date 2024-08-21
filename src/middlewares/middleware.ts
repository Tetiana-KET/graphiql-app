import { i18nRouter } from 'next-i18n-router';
import { i18nConfig } from '@/consts/i18nConfig';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  return i18nRouter(request, i18nConfig);
}
