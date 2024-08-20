import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';
import styles from '@/app/_styles/NotFoundPage.module.scss';

export default function NotFoundPage(): ReactNode {
  return (
    <section className={styles.notFoundPage}>
      <div className="error-message">
        <p className={styles.notFoundPageText}>
          OOPS! <br />
          Something went wrong...
        </p>

        <div className="error-img-wrap">
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
            Back Home
          </button>
        </Link>
      </div>
    </section>
  );
}
