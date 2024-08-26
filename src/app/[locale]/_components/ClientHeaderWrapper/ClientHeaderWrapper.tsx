'use client';

import { useState, useEffect, useRef } from 'react';

import styles from './ClientHeaderWrapper.module.scss';

function ClientHeaderWrapper({ children }: { children: React.ReactNode }) {
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={headerRef}
      className={`${styles.headerWrapper} ${isSticky ? styles.stickyHeader : ''}`}
    >
      {children}
    </div>
  );
}

export default ClientHeaderWrapper;
