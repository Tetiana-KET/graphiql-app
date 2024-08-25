import { ReactNode } from 'react';
import styles from './Header.module.scss';

function Header(): ReactNode {
  const name = 'interpolation';
  return (
    <header className={styles.header} data-testid="header">
      <div className={styles.headerContainer}>
        <h1>I am HEADER 🐈</h1>
        <p>
          For strings with {name} just use double curly brackets around the
          variable.
        </p>
      </div>
    </header>
  );
}
export default Header;
