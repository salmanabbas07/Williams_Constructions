// src/components/Motion/FadeIn.jsx
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const FadeIn = ({
  children,
  delay = 0,
  direction = 'up', // 'up', 'down', 'left', 'right', 'none'
  duration = 0.55,
  className = '',
  style = {},
  cascade = false
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className} style={style}>{children}</div>;
  }

  const getOffsets = () => {
    switch (direction) {
      case 'up':
        return { y: 24, x: 0 };
      case 'down':
        return { y: -24, x: 0 };
      case 'left':
        return { x: 24, y: 0 };
      case 'right':
        return { x: -24, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const { x, y } = getOffsets();

  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
