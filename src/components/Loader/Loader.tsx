import styles from './Loader.module.scss';

function Loader(): JSX.Element {
  return (
    <section className={styles.loaderContainer} data-testid="loader">
      <div className={styles.loader} />
    </section>
  );
}

export default Loader;
