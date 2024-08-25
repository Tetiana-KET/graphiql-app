'use client';

import { useTranslation } from 'react-i18next';

export default function WelcomeContent() {
  const { t } = useTranslation();
  const name = 'interpolation';
  return (
    <div>
      {t('welcomeContentHeader')}
      <p>{t('interpolatadText', { name })}</p>
    </div>
  );
}
