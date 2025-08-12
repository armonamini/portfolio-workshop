import { useEffect, useRef } from 'react';

interface FallbackCanvasProps {
  isActive: boolean;
  onComplete?: () => void;
}

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export const FallbackCanvas = ({ isActive, onComplete }: FallbackCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const starsRef = useRef<Star[]>([]);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    
    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize stars
    const stars: Star[] = [];
    for (let i = 0; i < 50; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        life: 0,
        maxLife: Math.random() * 100 + 50
      });
    }
    starsRef.current = stars;
    startTimeRef.current = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / 1100, 1);

      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      stars.forEach(star => {
        star.x += star.vx;
        star.y += star.vy;
        star.life++;

        // Wrap around edges
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Draw star
        const alpha = Math.min(star.life / star.maxLife, 1) * (1 - progress);
        ctx.strokeStyle = `rgba(138, 198, 234, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x - star.vx * 2, star.y - star.vy * 2);
        ctx.stroke();
      });

      // Add white flash at peak
      if (progress > 0.6 && progress < 0.8) {
        const flashIntensity = Math.sin((progress - 0.6) * Math.PI / 0.2) * 0.5;
        ctx.fillStyle = `rgba(255, 255, 255, ${flashIntensity})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          onComplete?.();
        }, 100);
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
};
