'use client';

import Image from 'next/image';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import styles from './NotFoundPage.module.scss';

export default function NotFoundPage(): ReactNode {
  const { t } = useTranslation();
  return (
    <section className={styles.notFoundPage} data-testid="notFoundPage">
      <div className={styles.errorMessage}>
        <p className={styles.notFoundPageText} data-testid="notFoundPageText">
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
        <Button
          as={Link}
          href="/"
          data-testid="returnHomeButton"
          className={`${styles.homeButton} ${'button'}`}
          type="button"
        >
          {t('notFound:homeBtn')}
        </Button>
      </div>
    </section>
  );
}
