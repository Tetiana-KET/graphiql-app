'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './NotFoundPage.module.scss';

export default function NotFoundPage(): ReactNode {
  const { t } = useTranslation();
  return (
    <section className={styles.notFoundPage}>
      <div className={styles.errorMessage}>
        <p className={styles.notFoundPageText}>
          {t('notFound:oops')}! <br />
          {t('notFound:message')}...
        </p>

        <div className={styles.errorImgWrap}>
          <Image
            src="/404-error-page.gif"
            unoptimized
            width={350}
            height={350}
            alt="404-svg-animation.svg"
          />
        </div>
        <Link href="/" data-testid="ReturnHomeLink">
          <button
            className={`${styles.homeButton} ${'button'}`}
            type="button"
            data-testid="ReturnHomeBtn"
          >
            {t('notFound:homeBtn')}
          </button>
        </Link>
      </div>
    </section>
  );
}
