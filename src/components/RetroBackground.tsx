'use client';

import { useEffect, useRef } from 'react';

const INERT = { resize: () => {}, render: () => {}, dispose: () => {} };

export default function RetroBackground() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fieldRef = useRef<{ resize: (w: number, h: number) => void; render: (now?: number) => void; dispose: () => void } | null>(null);
  const frameRef = useRef(0);
  let activeRef = false;
  let visibleRef = true;

  const pause = () => {
    if (frameRef.current) { cancelAnimationFrame(frameRef.current); frameRef.current = 0; }
  };

  const resume = () => {
    if (!frameRef.current && activeRef && visibleRef && !document.hidden) {
      frameRef.current = requestAnimationFrame(tick);
    }
  };

  const tick = (now: number) => {
    const field = fieldRef.current;
    const wrap = wrapRef.current;
    if (!field || !wrap) return;
    field.resize(wrap.clientWidth, wrap.clientHeight);
    field.render(now);
    frameRef.current = visibleRef && !document.hidden ? requestAnimationFrame(tick) : 0;
  };

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.innerWidth <= 600;

    let disposed = false;

    const init = async () => {
      if (disposed) return;
      const gl = canvas.getContext('webgl', { antialias: false, alpha: false, depth: false, preserveDrawingBuffer: false });
      if (!gl || reduced || mobile) {
        /* WebGL unavailable, reduced motion, or mobile: static CSS gradient
           fallback. On mobile render a single frozen frame of the field first. */
        if (mobile && gl) {
          try {
            const { createRetroPixelField } = await import('./dock/retroPixelField');
            const field = createRetroPixelField(canvas, () => ({ pixelSize: 4, noise: 1, levels: 7, speed: 1 }));
            if (field !== INERT) {
              field.resize(wrap.clientWidth, wrap.clientHeight);
              field.render();
              field.dispose();
            }
          } catch { /* fall back to the gradient */ }
        }
        return;
      }

      /* Lazy-init after first paint; cap the drawing buffer at CSS pixels
         (no DPR multiplier) so high-DPR screens stay cheap. */
      const { createRetroPixelField } = await import('./dock/retroPixelField');
      if (disposed) return;
      const field = createRetroPixelField(canvas, () => ({ pixelSize: 4, noise: 1, levels: 7, speed: 1 }));
      fieldRef.current = field;
      activeRef = true;
      field.resize(wrap.clientWidth, wrap.clientHeight);
      resume();
    };

    requestAnimationFrame(() => {
      init();
    });

    const resizeObserver = new ResizeObserver(() => {
      const field = fieldRef.current;
      if (field) field.resize(wrap.clientWidth, wrap.clientHeight);
    });
    resizeObserver.observe(wrap);

    const intersection = new IntersectionObserver(([entry]) => {
      visibleRef = entry?.isIntersecting ?? true;
      if (visibleRef) resume(); else pause();
    });
    intersection.observe(wrap);

    const onVisibility = () => {
      if (document.hidden) pause(); else resume();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      disposed = true;
      pause();
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      const field = fieldRef.current;
      if (field) field.dispose();
      fieldRef.current = null;
      activeRef = false;
    };
  }, []);

  return (
    <div className="retro-background" ref={wrapRef} aria-hidden="true">
      <canvas ref={canvasRef} className="retro-background__field" />
      <div className="retro-background__scrim" aria-hidden="true" />
      <div className="retro-background__scanlines" aria-hidden="true" />
      <div className="retro-background__fallback" aria-hidden="true" />
    </div>
  );
}
