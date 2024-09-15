import styles from './Footer.module.scss';
import AvatarsGroup from './components/AvatarsGroup/AvatarsGroup';
import { RsLogo } from './components/RsLogo';

function Footer() {
  return (
    <footer
      className={`${styles.footer} h-[var(--navbar-height)]`}
      data-testid="footer"
    >
      <div
        className={`${styles.footerContainer} justify-between max-w-[1440px] text-medium px-6 py-2`}
      >
        <AvatarsGroup />
        <p className="text-lg">© 2024</p>
        <div className={styles.rsLogoWrap}>
          <a
            href="https://rs.school/"
            className={styles.rsSchoolLink}
            target="_blank"
            rel="noreferrer"
          >
            <RsLogo />
          </a>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
