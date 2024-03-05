'use client';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Logo from '../../../public/img/logo.svg';
import styles from './style.module.css';

export default function Header() {
  const { data: session, status } = useSession();
  const handleLogout = () => signOut();
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image src={Logo} alt="uxis design archive" />
      </Link>

      <div className={styles.control}>
        {session ? (
          <>
            <div>
              {session.user?.name}님 <button onClick={handleLogout}>로그아웃</button>
            </div>
            <Link href="/write">작성</Link>
          </>
        ) : (
          <>
            <Link href="/login">로그인</Link>
            <Link href="/signup">회원가입</Link>
          </>
        )}
      </div>
    </header>
  );
}
