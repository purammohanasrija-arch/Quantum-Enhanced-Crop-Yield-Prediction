import React, { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export default function AnimatedCounter({ value, decimals = 1, prefix = '', suffix = '' }) {
  const numericVal = typeof value === 'number' ? value : parseFloat(value) || 0;
  
  const spring = useSpring(numericVal, {
    stiffness: 75,
    damping: 15,
    duration: 0.8
  });

  const display = useTransform(spring, (current) => {
    return `${prefix}${current.toFixed(decimals)}${suffix}`;
  });

  useEffect(() => {
    spring.set(numericVal);
  }, [numericVal, spring]);

  return <motion.span>{display}</motion.span>;
}
