import React from 'react';
import styles from './style.module.css';

export default function AuthForm({
  children,
  onSubmit,
  title,
}: {
  children: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  title: string;
}) {
  return (
    <>
      <div className={styles.title}>{title}</div>
      <form className={styles.form} onSubmit={onSubmit}>
        {children}
      </form>
    </>
  );
}
