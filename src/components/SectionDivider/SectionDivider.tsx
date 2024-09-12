import styles from './SectionDivider.module.scss';

interface SectionDividerProps {
  title: string;
}

function SectionDivider({ title }: SectionDividerProps) {
  return (
    <div className={styles.sectionDivider} data-testid="SectionDivider">
      <hr className={styles.dividerLine} />
      <span className={styles.dividerTitle} data-testid="SectionDividerTitle">
        {title}
      </span>
      <hr className={styles.dividerLine} />
    </div>
  );
}

export default SectionDivider;
