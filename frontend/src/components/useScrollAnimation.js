import { useEffect, useRef } from 'react';
import { useAnimation, useInView } from 'framer-motion';

export function useScrollAnimation(threshold = 0.2) {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { amount: threshold, once: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return [ref, controls];
}
