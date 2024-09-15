import { ReactNode } from 'react';
import styles from './Loader.module.scss';

function Loader(): ReactNode {
  return (
    <section className={styles.loaderContainer} data-testid="loader">
      <div className={styles.loader} />
    </section>
  );
}

export default Loader;
