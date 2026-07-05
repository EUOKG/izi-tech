import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from 'framer-motion';
import { Calendar, ChevronDown, MessageCircle, Sparkles } from 'lucide-react';
import { useRef } from 'react';

const depthFrames = [
  'h-[16rem] w-[16rem] rounded-[2rem] border-blue-400/25 md:h-[34rem] md:w-[34rem] md:rounded-[4rem]',
  'h-[22rem] w-[22rem] rounded-[2.5rem] border-cyan-300/15 md:h-[46rem] md:w-[46rem] md:rounded-[5rem]',
  'h-[30rem] w-[30rem] rounded-[3rem] border-indigo-300/10 md:h-[60rem] md:w-[60rem] md:rounded-[6rem]',
];

export function HeroTech() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 34,
    stiffness: 92,
    mass: 0.18,
  });

  const heroOpacity = useTransform(smoothProgress, [0.76, 0.98], [1, 0]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.62, 0.9], [1, 0.94, 0]);
  const contentScale = useTransform(smoothProgress, [0, 0.34, 0.86], [1, 0.92, 0.22]);
  const contentY = useTransform(smoothProgress, [0, 0.34, 0.86], [0, 28, 170]);
  const contentRotateX = useTransform(smoothProgress, [0, 0.46, 0.86], [0, 8, 42]);
  const contentBlur = useTransform(smoothProgress, [0, 0.66, 0.9], ['blur(0px)', 'blur(0px)', 'blur(9px)']);

  const tunnelOpacity = useTransform(smoothProgress, [0.04, 0.28, 0.84], [0, 0.85, 0.12]);
  const tunnelScale = useTransform(smoothProgress, [0, 0.5, 0.9], [1.16, 0.86, 0.42]);
  const floorOpacity = useTransform(smoothProgress, [0, 0.22, 0.9], [0.18, 0.7, 0.05]);
  const floorY = useTransform(smoothProgress, [0, 0.9], [42, -90]);
  const backgroundY = useTransform(smoothProgress, [0, 1], ['28%', '64%']);
  const backgroundGradient = useMotionTemplate`radial-gradient(ellipse at center ${backgroundY}, rgba(30,144,255,0.18) 0%, rgba(6,18,38,0.12) 38%, transparent 68%)`;
  const cueOpacity = useTransform(smoothProgress, [0, 0.22, 0.46], [1, 0.75, 0]);
  const cueY = useTransform(smoothProgress, [0, 0.46], [0, 54]);

  return (
    <section
      ref={containerRef}
      className="relative h-[155svh] overflow-visible bg-slate-50 transition-colors duration-500 dark:bg-black md:h-[170vh]"
    >
      <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden">
        <motion.div style={{ opacity: heroOpacity }} className="pointer-events-none absolute inset-0 z-0">
          <motion.div
            style={{
              background: backgroundGradient,
            }}
            className="absolute inset-0"
          />

          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:3.25rem_3.25rem] opacity-40 [mask-image:radial-gradient(ellipse_58%_58%_at_50%_52%,#000_48%,transparent_100%)] dark:opacity-25" />

          <motion.div
            style={{ opacity: floorOpacity, y: floorY }}
            className="absolute inset-x-[-20%] bottom-[-26%] h-[62%] origin-bottom bg-[linear-gradient(to_right,rgba(56,189,248,0.18)_1px,transparent_1px),linear-gradient(to_top,rgba(99,102,241,0.2)_1px,transparent_1px)] bg-[size:4rem_4rem] [transform:perspective(900px)_rotateX(64deg)]"
          />

          {depthFrames.map((className, index) => (
            <motion.div
              key={className}
              style={{
                opacity: tunnelOpacity,
                scale: tunnelScale,
                x: '-50%',
                y: '-50%',
                rotateX: 62,
                rotateZ: index % 2 === 0 ? 3 : -3,
              }}
              className={`absolute left-1/2 top-[58%] border shadow-[0_0_70px_rgba(30,144,255,0.12)] ${className}`}
            />
          ))}

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_54%,rgba(0,0,0,0.58)_100%)]" />
        </motion.div>

        <motion.div
          style={{
            opacity: contentOpacity,
            scale: contentScale,
            y: contentY,
            rotateX: contentRotateX,
            filter: contentBlur,
            transformOrigin: '50% 58%',
          }}
          className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-5 text-center [transform-style:preserve-3d] sm:px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 hidden items-center gap-3 rounded-full border border-sky-400/70 bg-slate-950/85 px-5 py-2.5 shadow-[0_0_28px_rgba(56,189,248,0.22)] backdrop-blur-md md:flex"
          >
            <Sparkles size={14} className="animate-pulse text-yellow-400" />
            <span className="text-[10px] font-black uppercase text-sky-100 md:text-[11px]">
              Performance & Estilo
            </span>
            <Sparkles size={14} className="animate-pulse text-yellow-400" />
          </motion.div>

          <h1 className="flex w-full max-w-[22rem] flex-col items-center font-black uppercase italic leading-[0.9] text-slate-900 dark:text-white sm:max-w-none">
            <span className="w-full overflow-hidden">
              <motion.span
                initial={{ y: '110%', rotateX: -70 }}
                animate={{ y: 0, rotateX: 0 }}
                transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
                className="block max-w-full text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem]"
              >
                Seu PC Gamer
              </motion.span>
            </span>

            <span className="w-full overflow-hidden">
              <motion.span
                initial={{ y: '110%', rotateX: -70 }}
                animate={{ y: 0, rotateX: 0 }}
                transition={{ duration: 1.05, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="block max-w-full text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem]"
              >
                em Nivel{' '}
                <span className="animate-gradient-text bg-gradient-to-r from-[#1E90FF] via-[#60A5FA] to-[#836FFF] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(30,144,255,0.28)]">
                  Máximo.
                </span>
              </motion.span>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex w-full flex-col items-center md:mt-10"
          >
            <p className="mb-8 max-w-2xl text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400 md:mb-10 md:text-xl">
              <span className="inline-flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1">
                <span aria-hidden="true" className="text-base md:text-xl">
                  📍
                </span>
                <span>Assistência técnica especializada</span>
                <span className="bg-gradient-to-r from-[#1E90FF] via-[#60A5FA] to-cyan-300 bg-clip-text font-black text-transparent">
                  a domicílio
                </span>
                <span>em</span>
                <span className="bg-gradient-to-r from-white via-sky-200 to-[#1E90FF] bg-clip-text font-black text-transparent">
                  BH e Região
                </span>
                <span aria-hidden="true" className="text-base md:text-xl">
                  🧀☕
                </span>
              </span>
              <br className="hidden md:block" />
              <span className="font-bold text-slate-900 dark:text-white">
                {' '}
                Performance extrema, reparos de precisão e confiança total.
              </span>
            </p>

            <div className="flex w-full flex-col gap-3 px-2 sm:w-auto sm:flex-row sm:px-0 md:gap-4">
              <a
                href="#booking"
                className="group relative flex min-h-14 items-center justify-center gap-3 overflow-hidden rounded-2xl bg-blue-600 px-10 py-4 text-xs font-black uppercase text-white shadow-[0_18px_50px_rgba(37,99,235,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 sm:min-w-52"
              >
                <span className="absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-18deg] bg-white/20 transition-transform duration-700 group-hover:translate-x-[320%]" />
                <Calendar size={18} className="relative z-10" />
                <span className="relative z-10">Agendar visita</span>
              </a>
              <a
                href="https://wa.me/5531920017218"
                target="_blank"
                rel="noreferrer"
                className="group relative flex min-h-14 items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 px-10 py-4 text-xs font-black uppercase text-white shadow-[0_18px_44px_rgba(15,23,42,0.22)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/40 dark:bg-white/5 sm:min-w-52"
              >
                <span className="absolute inset-0 bg-emerald-400/0 transition-colors duration-300 group-hover:bg-emerald-400/10" />
                <MessageCircle size={18} className="relative z-10 text-emerald-400" />
                <span className="relative z-10">WhatsApp</span>
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ opacity: cueOpacity, y: cueY }}
          className="pointer-events-none absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-10"
        >
          <div className="hidden h-10 w-6 rounded-full border border-blue-400/50 bg-black/20 p-1 backdrop-blur-sm md:flex">
            <motion.span
              animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="mx-auto h-2 w-1 rounded-full bg-blue-400"
            />
          </div>
          <ChevronDown size={20} className="animate-bounce text-blue-500 md:hidden" />
        </motion.div>
      </div>
    </section>
  );
}
