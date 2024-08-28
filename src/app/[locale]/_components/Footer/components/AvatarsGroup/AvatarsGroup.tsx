import { Avatar } from '@nextui-org/react';
import { teamMembersData } from '@/consts/teamData';
import Link from 'next/link';
import styles from './AvatarsGroup.module.scss';

const avatars = teamMembersData.map((dev) => ({
  alt: dev.name,
  src: dev.photo,
  github: dev.github,
}));

export default function AvatarsGroup() {
  return (
    <div className={styles.customAvatarGroup}>
      {avatars.map((avatar) => (
        <Link
          key={avatar.alt}
          href={avatar.github}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.avatarLink}
        >
          <Avatar
            key={avatar.alt}
            {...avatar}
            showFallback
            name={avatar.alt}
            className={styles.devAvatar}
          />
        </Link>
      ))}
    </div>
  );
}
