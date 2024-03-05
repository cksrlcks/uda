import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import prisma from '../../../lib/db';
import { findUser } from '@/app/service/auth';

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        try {
          const user = await findUser({
            email: credentials.email,
            password: credentials.password,
          });
          return user;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: 'jwt', maxAge: 24 * 60 * 60 },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 30,
  },

  callbacks: {
    async session({ session, user, token }) {
      if (user !== null) {
        session.user = user;
      }
      return session;
    },

    async jwt({ token, user }) {
      return token;
    },
  },
});

export { handler as GET, handler as POST };
