import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  Link,
} from '@nextui-org/react';
import styles from './DeveloperCard.module.scss';

export interface DeveloperCardProps {
  developer: {
    name: string;
    role: string;
    info: string;
    github: string;
    photo: string;
    id: string;
    contribution: string;
  };
}

export default function DeveloperCard({ developer }: DeveloperCardProps) {
  const { name, role, github, photo, contribution } = developer;
  return (
    <Card
      className={`${styles.developerCard} py-4 flex gap-3`}
      data-testid="developerCard"
    >
      <CardHeader
        className="overflow-visible py-2 justify-center"
        data-testid="developerHeader"
      >
        <Link href={github} isExternal>
          <Image
            loading="lazy"
            isBlurred
            alt="Card background"
            className="object-cover rounded-xl"
            src={photo}
            width={270}
          />
        </Link>
      </CardHeader>
      <CardBody className="pb-0 pt-2 px-4 flex-col items-center ">
        <h3
          className="text-lg font-bold text-center"
          data-testid="developerName"
        >
          {name}
        </h3>
        <h4
          className="font-medium text-base text-center"
          data-testid="developerRole"
        >
          {role}
        </h4>
      </CardBody>
      <CardFooter className="justify-center">
        <p
          className="text-wrap text-center"
          data-testid="developerContribution"
        >
          {contribution}
        </p>
      </CardFooter>
    </Card>
  );
}
