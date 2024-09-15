import { Card, CardHeader, CardBody, Divider, Image } from '@nextui-org/react';

interface TechnologyCardProps {
  title: string;
  imgSrc: string;
  description: string;
}

export default function TechnologyCard({
  title,
  imgSrc,
  description,
}: TechnologyCardProps) {
  return (
    <Card
      className="flex gap-3 md:w-1/4 xs:w-2/5 w-full"
      data-testid="technologyCard"
    >
      <CardHeader className="flex gap-3">
        <Image
          loading="lazy"
          isBlurred
          alt={`${title} logo`}
          height={40}
          width={40}
          radius="sm"
          src={imgSrc}
        />
        <div className="flex flex-col">
          <p className="text-md" data-testid="technologyCardTitle">
            {title}
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p data-testid="technologyCardDescription">{description}</p>
      </CardBody>
    </Card>
  );
}
