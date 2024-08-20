import { ReactNode } from 'react';
import styles from './Footer.module.scss';

function Footer(): ReactNode {
  return (
    <footer className={styles.footer} data-testid="footer">
      <div className={styles.footerContainer}>
        <h2>I am FOOTER 🐾</h2>
      </div>
    </footer>
  );
}
export default Footer;
