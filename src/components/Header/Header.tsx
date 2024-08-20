import styles from './Header.module.scss';

function Header(): JSX.Element {
  return (
    <header className={styles.header} data-testid="header">
      <div className={styles.headerContainer}>
        <h1>I an HEADER 🐈</h1>
      </div>
    </header>
  );
}
export default Header;
