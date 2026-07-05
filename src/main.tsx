import React from 'react';
import ReactDOM from 'react-dom/client';
import Lenis from '@studio-freight/lenis';

import App from './App.tsx';
import './index.css';

document.documentElement.classList.add('dark');
document.documentElement.classList.remove('light');

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  touchMultiplier: 2,
  infinite: false,
});

function animateScroll(time: number) {
  lenis.raf(time);
  requestAnimationFrame(animateScroll);
}

requestAnimationFrame(animateScroll);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
