import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from './db';
import { findUser } from '@/service/auth';
import { NextAuthOptions } from 'next-auth';

export const authOptions = {
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
    async session({ session }) {
      return session;
    },

    async jwt({ token }) {
      return token;
    },
  },
  pages: {
    signIn: '/login',
  },
} satisfies NextAuthOptions;
