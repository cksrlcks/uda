import prisma from '../lib/db';
import { SHA256 } from 'crypto-js';

export const hashPassword = (string: string) => {
  return SHA256(string).toString();
};

export async function findUser({ email, password }: { email: string; password: string }) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        image: true,
      },
    });

    if (user && user.password === hashPassword(password)) {
      return user;
    } else {
      throw new Error('비밀번호가 틀렸습니다.');
    }
  } catch (error) {
    throw new Error('문제가 발생했습니다.', { cause: error });
  }
}

export async function createuser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashPassword(password),
      },
    });

    return user;
  } catch (error) {
    throw new Error('문제가 발생했습니다.', { cause: error });
  }
}
