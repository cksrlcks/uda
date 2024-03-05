import type { Metadata } from 'next';
import '@/css/globals.css';
import '@/css/reset.css';
import AuthContext from '@/context/AuthContext';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'UXIS Design Archive',
  description: 'UXIS Design Archive',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <AuthContext>
          <div className="global-inner">
            <Header />
            <main>{children}</main>
          </div>
        </AuthContext>
      </body>
    </html>
  );
}
