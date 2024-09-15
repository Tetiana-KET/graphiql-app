import { TFunction } from 'i18next';
import { Image } from '@nextui-org/image';
import SectionDivider from '@/components/SectionDivider/SectionDivider';
import { techStack } from '@/consts/techStack';
import TechnologyCard from '@/components/TechCard/TechnologyCard';
import { teamMembersData } from '@/consts/teamData';
import DeveloperCard from '@/components/DeveloperCard/DeveloperCard';
import styles from './WelcomeMainContent.module.scss';

interface WelcomeMainContentProps {
  t: TFunction<['translation', ...string[]], undefined>;
}

export default function WelcomeMainContent({ t }: WelcomeMainContentProps) {
  const technologies = techStack(t);
  const developers = teamMembersData(t);

  return (
    <>
      <SectionDivider title={t('welcome:title1')} />
      <section
        data-testid="welcomeMainContent"
        className={`${styles.welcomeSection} md:flex-row flex-col gap-4`}
      >
        <div className={styles.aboutDescription}>
          <h2 className="font-bold text-2xl mb-2">REST/GraphiQL Client</h2>
          <p className="text-lg text-justify">{t('welcome:aboutApp')}</p>
        </div>
        <div className={styles.aboutImgWrap}>
          <Image alt="about image" src="/about.jpg" loading="lazy" isBlurred />
        </div>
      </section>
      <SectionDivider title={t('welcome:title2')} />
      <section
        className={`${styles.welcomeSection} md:flex-row-reverse flex-col`}
      >
        <div className={styles.aboutDescription}>
          <h2 className="font-bold text-2xl mb-2">RS School</h2>
          <p className="text-lg text-justify">{t('welcome:aboutSchool')}</p>
        </div>
        <div className={`${styles.aboutImgWrap} flex justify-center`}>
          <Image
            loading="lazy"
            isBlurred
            alt="rs 
            school image"
            src="https://rs.school/assets/rs-school-CZS_yQWd.webp"
          />
        </div>
      </section>
      <SectionDivider title={t('welcome:title3')} />
      <section className={styles.welcomeSection}>
        <div className="flex xs:flex-row flex-col gap-2 md:gap-y-2 flex-wrap justify-center w-full">
          {technologies.map((tech) => (
            <TechnologyCard
              key={tech.title}
              title={tech.title}
              imgSrc={tech.imgSrc}
              description={tech.description}
            />
          ))}
        </div>
      </section>
      <SectionDivider title={t('welcome:title4')} />
      <section
        className={`${styles.welcomeSection} ${styles.developersWrap} flex sm:flex-row flex-col gap-2 w-full`}
      >
        {developers.map((developer) => (
          <DeveloperCard developer={developer} key={developer.id} />
        ))}
      </section>
    </>
  );
}
