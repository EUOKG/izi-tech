import { useEffect, useRef, useState } from 'react';

const THEME_STORAGE_KEY = 'izi-theme';

type Star = {
  x: number;
  y: number;
  size: number;
  growth: number;
  isIncreasing: boolean;
};

function getInitialTheme() {
  if (typeof window === 'undefined') {
    return true;
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === 'dark') {
    return true;
  }

  if (storedTheme === 'light') {
    return false;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function createStar(width: number, height: number): Star {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: 0,
    growth: 0.05 + Math.random() * 0.05,
    isIncreasing: true,
  };
}

function updateStar(star: Star) {
  if (star.size > 1.5) {
    star.isIncreasing = false;
  }

  if (star.isIncreasing) {
    star.size += star.growth;
  } else {
    star.size -= star.growth * 0.5;
  }
}

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(getInitialTheme);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = window.document.documentElement;

    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
      window.localStorage.setItem(THEME_STORAGE_KEY, 'dark');
      return;
    }

    root.classList.remove('dark');
    root.classList.add('light');
    window.localStorage.setItem(THEME_STORAGE_KEY, 'light');
  }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const stars: Star[] = [];
    let animationFrameId = 0;

    const addStarInterval = window.setInterval(() => {
      stars.push(createStar(canvas.width, canvas.height));
    }, 150);

    const flicker = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let index = stars.length - 1; index >= 0; index -= 1) {
        const star = stars[index];
        updateStar(star);

        if (!star.isIncreasing && star.size < 0.2) {
          stars.splice(index, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.closePath();
      }

      animationFrameId = requestAnimationFrame(flicker);
    };

    flicker();

    return () => {
      window.clearInterval(addStarInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <style>{`
        .theme-toggle-btn {
          --ease: cubic-bezier(.4,-0.3,.6,1.3);
          --clr-background-day: #1b7fcc;
          --clr-background-night: #070b34;
          --clr-sun: #fce570;
          --clr-sun-lgt: #ffffe3;
          --clr-moon: hsl(212, 13%, 75%);
          --button-width: 2.5em;

          position: relative;
          display: block;
          flex-shrink: 0;
          width: 8em;
          height: 3em;
          overflow: hidden;
          border: none;
          border-radius: 2em;
          background-color: var(--clr-background-day);
          box-shadow:
            6px 10px 8px 0 rgb(0 0 0 / 0.15),
            6px 10px 8px 0 rgb(0 0 0 / 0.25),
            inset 6px 10px 8px 0 rgb(255 255 255 / 0.35);
          cursor: pointer;
          font-size: 8px;
          transition: all 0.75s var(--ease);
        }

        .tt-button {
          position: absolute;
          left: 0.25em;
          top: 50%;
          z-index: 2;
          width: var(--button-width);
          height: var(--button-width);
          transform: translate(0, -50%);
          border-radius: 50%;
          background: radial-gradient(circle, var(--clr-sun-lgt) 0%, transparent 70%);
          background-color: var(--clr-sun);
          box-shadow:
            0 0 0 1em rgb(255 255 255 / 0.2),
            0 0 0 2em rgb(255 255 255 / 0.2),
            0 0 0 3em rgb(255 255 255 / 0.2),
            0 0 0.5em 0 #fff;
          transition: all 0.75s var(--ease);
        }

        .tt-button::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 60%;
          width: 25%;
          height: 25%;
          overflow: hidden;
          border-radius: 50%;
          background-color: transparent;
          box-shadow:
            -0.95em -0.75em 0 0.1em transparent,
            0.1em -1em 0 -0.1em transparent;
          transition: all 0.3s ease;
        }

        .theme-toggle-btn::before {
          content: '';
          position: absolute;
          right: -0.25em;
          bottom: 0.4em;
          z-index: 1;
          width: 2.5em;
          height: 2.5em;
          border-radius: 50%;
          background-color: #fff;
          box-shadow:
            -1em 1em 0 -0.25em #fff,
            -2em 1.25em 0 -0.5em #fff,
            -3em 1.5em 0 -0.25em #fff,
            -4em 1.5em 0 -0.6em #fff,
            -5em 1.75em 0 -0.5em #fff;
          opacity: 0.5;
          transition: all 0.75s ease;
        }

        .theme-toggle-btn::after {
          content: '';
          position: absolute;
          right: -1em;
          bottom: 0;
          z-index: 1;
          width: var(--button-width);
          height: var(--button-width);
          border-radius: 50%;
          background-color: #fff;
          box-shadow:
            -1em 1em 0 -0.25em #fff,
            -2em 1.25em 0 -0.5em #fff,
            -3em 1.5em 0 -0.25em #fff,
            -4em 1.5em 0 -0.6em #fff,
            -5em 1.75em 0 -0.5em #fff;
          transition: all 0.75s ease;
        }

        .theme-toggle-btn[data-time="night"] {
          background-color: var(--clr-background-night);
        }

        .theme-toggle-btn[data-time="night"] .tt-button {
          left: calc(100% - 0.25em - var(--button-width));
          background: radial-gradient(circle, #eee 0%, transparent 70%);
          background-color: var(--clr-moon);
          box-shadow:
            0 0 0 1em rgb(255 255 255 / 0.1),
            0 0 0 2em rgb(255 255 255 / 0.1),
            0 0 0 3em rgb(255 255 255 / 0.1),
            0 0 0.5em 0 #fff;
        }

        .theme-toggle-btn[data-time="night"] .tt-button::after {
          background-color: #c5c5c5;
          box-shadow:
            -0.95em -0.75em 0 0.1em #d5d5d5,
            0.1em -1em 0 -0.1em #d5d5d5;
          transition-delay: 0.5s;
        }

        .theme-toggle-btn[data-time="night"]::before {
          right: -5em;
          bottom: -1em;
          transform: scale(2);
        }

        .theme-toggle-btn[data-time="night"]::after {
          right: -5em;
          bottom: -2em;
          transform: scale(3);
        }

        .theme-toggle-btn canvas#stars {
          position: absolute;
          left: 0;
          top: 0;
          z-index: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          pointer-events: none;
          transition: all 0.75s ease;
        }

        .theme-toggle-btn[data-time="night"] canvas#stars {
          opacity: 1;
        }
      `}</style>

      <button
        className="theme-toggle-btn"
        data-time={isDark ? 'night' : 'day'}
        onClick={() => setIsDark((current) => !current)}
        aria-label="Alternar modo claro e escuro"
      >
        <span className="tt-button" />
        <canvas id="stars" ref={canvasRef} />
      </button>
    </>
  );
}
