import { ReactNode } from 'react';
import styles from './Header.module.scss';

function Header(): ReactNode {
  return (
    <header className={styles.header} data-testid="header">
      <div className={styles.headerContainer}>
        <h1>I am HEADER 🐈</h1>
      </div>
    </header>
  );
}
export default Header;
