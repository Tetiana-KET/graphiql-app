'use client';

import { useTranslation } from 'react-i18next';

export default function WelcomeContent() {
  const { t } = useTranslation();
  return <div>{t('welcomeContentHeader')}</div>;
}
