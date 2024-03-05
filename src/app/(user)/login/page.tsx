'use client';
import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Input from '@/components/Input';
import AuthForm from '@/components/AuthForm';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = form;

    const result = await signIn('credentials', {
      email,
      password,
      redirect: true,
      callbackUrl: '/',
    });
  };

  return (
    <AuthForm onSubmit={handleSubmit} title="로그인">
      <Input
        type="text"
        name="email"
        value={form.email}
        placeholder="이메일"
        onChange={(e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
      />
      <Input
        type="password"
        name="password"
        value={form.password}
        placeholder="패스워드"
        onChange={(e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
      />
      <br />
      <br />
      <button type="submit">로그인</button>
    </AuthForm>
  );
}
