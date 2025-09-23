'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import clsx from 'clsx';
import Button from '@/components/Button.jsx';
import styles from '@/styles/components/Header.module.scss';

import brandLogo from '../../public/brandLogo.svg';

const Header = () => {
  const pathname = usePathname();

  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <Link href="/">
          <Image src={brandLogo} alt="brandLogo" />
        </Link>
        <div className={styles.link}>
          <Link
            href="/article"
            className={clsx(styles.linkContent, pathname === '/article' && styles.active)}
          >
            자유게시판
          </Link>
          <Link
            href="/market"
            className={clsx(styles.linkContent, pathname === '/market' && styles.active)}
          >
            중고마켓
          </Link>
        </div>
      </div>
      <Link href="/login">
        <Button type="login" />
      </Link>
    </div>
  );
};

export default Header;
