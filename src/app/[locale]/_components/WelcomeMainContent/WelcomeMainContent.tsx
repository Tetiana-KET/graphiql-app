import { TFunction } from 'i18next';
import { Image } from '@nextui-org/image';
import SectionDivider from '@/components/SectionDivider/SectionDivider';
import { techStack } from '@/consts/techStack';
import TechnologyCard from '@/components/TechCard/TechnologyCard';
import styles from './WelcomeMainContent.module.scss';

interface WelcomeMainContentProps {
  t: TFunction<['translation', ...string[]], undefined>;
}

export default function WelcomeMainContent({ t }: WelcomeMainContentProps) {
  const technologies = techStack(t);
  return (
    <>
      <SectionDivider title="About Project" />
      <section className={`${styles.welcomeAbout} md:flex-row flex-col`}>
        <div className={styles.aboutDescription}>
          <h2 className="font-bold text-2xl mb-2">REST/GraphiQL Client</h2>
          <p className="text-lg text-justify">
            This application is a lightweight tool that combines the
            functionalities of Postman (for REST API testing) and GraphiQL (for
            querying GraphQL APIs) into a single interface. It is designed to
            facilitate seamless interaction with both RESTful and GraphQL
            endpoints, while also incorporating user authentication and
            historical request tracking.
          </p>
        </div>
        <div className={styles.aboutImgWrap}>
          <Image alt="about image" src="/about.jpg" loading="lazy" isBlurred />
        </div>
      </section>
      <SectionDivider title="About RS School" />
      <section
        className={`${styles.welcomeAbout} md:flex-row-reverse flex-col`}
      >
        <div className={styles.aboutDescription}>
          <h2 className="font-bold text-2xl mb-2">RS School</h2>
          <p className="text-lg text-justify">
            The app is the result of completing the final task of RS School
            React Course. RS School offers a unique learning experience as a
            free, community-based online education initiative. The RS School has
            been run by the Rolling Scopes community since 2013. Today, over 600
            developer-volunteers from various countries and companies assist as
            mentors.
          </p>
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
      <SectionDivider title="Technologies Used" />
      <section
        className={`${styles.welcomeAbout} md:flex-row-reverse flex-col w-full`}
      >
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
    </>
  );
}
