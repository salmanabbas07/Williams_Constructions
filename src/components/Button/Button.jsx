// src/components/Button/Button.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

export const Button = ({
  children,
  to,
  href,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'outline-white', 'ghost'
  size = 'md', // 'sm', 'md', 'lg'
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  icon: Icon = null,
  iconPosition = 'right',
  className = '',
  ...rest
}) => {
  const classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    loading ? 'btn-loading' : '',
    disabled ? 'btn-disabled' : '',
    className
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {loading && <span className="btn-spinner" aria-hidden="true" />}
      {Icon && iconPosition === 'left' && <Icon className="btn-icon btn-icon-left" size={18} />}
      <span className="btn-text">{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="btn-icon btn-icon-right" size={18} />}
    </>
  );

  if (to && !disabled) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...rest}
    >
      {content}
    </button>
  );
};

export default Button;
