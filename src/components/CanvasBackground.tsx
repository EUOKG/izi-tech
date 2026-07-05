import { useEffect, useRef } from 'react';

type Point = {
  x: number;
  y: number;
};

type Particle = Point & {
  vx: number;
  vy: number;
  size: number;
};

const PARTICLE_COUNT = 60;
const MAX_DISTANCE = 150;

function createParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    size: Math.random() * 2,
  };
}

function updateParticle(particle: Particle, width: number, height: number, mouse: Point) {
  particle.x += particle.vx;
  particle.y += particle.vy;

  if (particle.x < 0 || particle.x > width) {
    particle.vx *= -1;
  }

  if (particle.y < 0 || particle.y > height) {
    particle.vy *= -1;
  }

  const dx = mouse.x - particle.x;
  const dy = mouse.y - particle.y;
  const distance = Math.hypot(dx, dy);

  if (distance < MAX_DISTANCE) {
    particle.x -= dx * 0.02;
    particle.y -= dy * 0.02;
  }
}

export function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId = 0;
    const mouse = { x: -1000, y: -1000 };
    let particles = Array.from({ length: PARTICLE_COUNT }, () => createParticle(width, height));

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      particles = Array.from({ length: PARTICLE_COUNT }, () => createParticle(width, height));
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];
        updateParticle(particle, width, height, mouse);

        ctx.fillStyle = 'rgba(30, 144, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i; j < particles.length; j += 1) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.hypot(dx, dy);

          if (distance < MAX_DISTANCE) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(30, 144, 255, ${1 - distance / MAX_DISTANCE})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(drawFrame);
    };

    resizeCanvas();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resizeCanvas);
    drawFrame();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 h-full w-full pointer-events-none opacity-40" />;
}
