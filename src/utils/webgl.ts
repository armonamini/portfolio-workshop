export const hasWebGL = () => {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext &&
      (c.getContext('webgl') || c.getContext('experimental-webgl')));
  } catch { return false; }
};

export const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
