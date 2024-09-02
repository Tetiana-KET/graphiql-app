import styles from './SectionDivider.module.scss';

interface SectionDividerProps {
  title: string;
}

function SectionDivider({ title }: SectionDividerProps) {
  return (
    <div className={styles.sectionDivider}>
      <hr className={styles.dividerLine} />
      <span className={styles.dividerTitle}>{title}</span>
      <hr className={styles.dividerLine} />
    </div>
  );
}

export default SectionDivider;
