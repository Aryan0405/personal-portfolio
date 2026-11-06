'use client';

import { useEffect, useState } from 'react';
import DitherVeil from './DitherVeil';

export default function Portrait() {
  const [webgl, setWebgl] = useState<boolean | null>(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    /* Feature-detect WebGL so DitherVeil never throws; fall back to a plain
        when WebGL is unavailable. */
    setWebgl(!!canvas.getContext('webgl', { antialias: false, alpha: false, depth: false, preserveDrawingBuffer: false }));
  }, []);

  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (webgl === false) {
    return (
      <img
        src="/images/portrait.jpg"
        alt="Portrait of Aryan Ashok"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', background: '#0b0819' }}
      />
    );
  }
  if (webgl === null) {
    return <div style={{ width: '100%', height: '100%', background: '#0b0819' }} />;
  }
  return (
    <DitherVeil
      src="/images/portrait.jpg"
      pattern="floyd"
      pixelSize={3}
      palette="duotone"
      levels={2}
      inkColor="#0b0819"
      paperColor="#f4e6c8"
      rimColor="#f9c74f"
      fit="contain"
      revealRadius={200}
      softness={0.6}
      linger={1}
      contrast={1.15}
      clickBurst={!reduced}
      style={{}}
    />
  );
}
