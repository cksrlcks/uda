'use client';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export default function Header() {
  const { data: session, status } = useSession();
  // console.log(session);
  const handleLogout = () => signOut();
  return (
    <header>
      <div>로고</div>
      <div>
        {session ? (
          <>
            {session.user?.name}님 <button onClick={handleLogout}>로그아웃</button>
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
