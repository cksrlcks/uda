import React from 'react';
import styles from './style.module.css';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export default function Button(props: ButtonProps) {
  return <button className={styles.button} {...props} />;
}
