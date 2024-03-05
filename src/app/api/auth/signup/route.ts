import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/service/auth';

export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json();
  if (!name || !email || !password) {
    return NextResponse.json({ error: '정확한 정보를 입력해주세요' }, { status: 500 });
  }
  try {
    const user = await createUser({ name, email, password });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
