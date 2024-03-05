'use client';
import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={form.email}
          placeholder="이메일"
          onChange={(e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
        />
        <br />
        <input
          type="password"
          name="password"
          value={form.password}
          placeholder="패스워드"
          onChange={(e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
        />
        <br />
        <br />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
