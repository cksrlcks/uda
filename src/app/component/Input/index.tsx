import React, { ChangeEvent } from 'react';
import styles from './style.module.css';
type InputProps = {
  type: 'text' | 'email' | 'password';
  value?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  ref?: React.MutableRefObject<HTMLInputElement | null>;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  type,
  value,
  name,
  placeholder,
  disabled,
  ref,
  onChange,
}: InputProps) {
  return (
    <div className={styles.input}>
      <input
        type={type}
        value={value}
        name={name}
        ref={ref}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}
