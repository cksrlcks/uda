'use client';
import AuthForm from '@/components/AuthForm';
import Input from '@/components/Input';
import React, { FormEvent, useRef, useState } from 'react';

export default function SignupPage() {
  const [form, setForm] = useState({
    email: '',
    name: '',
    password: '',
  });

  const passwordCheckRef = useRef(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, name, password } = form;
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        email,
        name,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      const user = await res.json();
      //console.log(user);
    } else {
      alert('회원가입에 실패했습니다.');
    }
  };

  return (
    <div>
      <AuthForm onSubmit={handleSubmit} title="회원가입">
        <Input
          type="text"
          name="email"
          value={form.email}
          placeholder="이메일"
          onChange={(e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
        />
        <Input
          type="text"
          name="name"
          value={form.name}
          placeholder="이름"
          onChange={(e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
        />
        <Input
          type="password"
          name="password"
          value={form.password}
          placeholder="패스워드"
          onChange={(e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
        />
        <Input type="password" ref={passwordCheckRef} placeholder="패스워드확인" />
        <br />
        <button type="submit">회원가입</button>
      </AuthForm>
    </div>
  );
}
