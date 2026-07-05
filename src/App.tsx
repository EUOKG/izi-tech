import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Instagram, Menu, MessageCircle, X } from 'lucide-react';

import { AboutTech } from './components/AboutTech';
import { BookingTech } from './components/BookingTech';
import { CanvasBackground } from './components/CanvasBackground';
import { CustomCursor } from './components/CustomCursor';
import { GalleryTech } from './components/GalleryTech';
import { HeroTech } from './components/HeroTech';
import { ServicesTech } from './components/O que fazemos';

const desktopNavLinks = [
  { href: '#services', label: 'Serviços', className: 'px-4 py-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-[#1E90FF] dark:hover:text-white transition-colors rounded-full' },
  { href: '#about', label: 'Sobre', className: 'px-4 py-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-[#1E90FF] dark:hover:text-white transition-colors rounded-full' },
  { href: '#gallery', label: 'Instagram', className: 'px-3 py-2 text-xs font-medium text-pink-500' },
];

const mobileNavLinks = [
  { href: '#services', label: 'Serviços' },
  { href: '#about', label: 'Sobre' },
  { href: '#gallery', label: 'Instagram' },
  { href: 'https://wa.me/5531920017218', label: 'WhatsApp', external: true },
];

const floatingButtonClassName =
  'flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 font-sans text-slate-900 transition-colors duration-500 selection:bg-[#1E90FF] selection:text-white dark:bg-black dark:text-white">
      <CanvasBackground />
      <CustomCursor />

      <nav
        className={`fixed left-1/2 z-[100] w-[95%] max-w-[850px] -translate-x-1/2 transition-all duration-700 ${scrolled ? 'top-4' : 'top-6'}`}
      >
        <div
          className={`flex items-center justify-between rounded-full border px-2 py-2 pl-6 pr-2 transition-all duration-500 ${
            scrolled
              ? 'border-slate-200 bg-white/80 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#0a0a0f]/80'
              : 'border-transparent bg-transparent'
          }`}
        >
          <a
            href="#"
            className="group flex items-center gap-3 text-slate-900 dark:text-white"
            aria-label="IZI TECH"
          >
            <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 shadow-[0_0_28px_rgba(30,144,255,0.18)] transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_38px_rgba(30,144,255,0.34)]">
              <span className="absolute inset-[-35%] bg-[conic-gradient(from_180deg,transparent,#1E90FF,transparent,#ffffff,transparent)] opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-60" />
              <span className="absolute inset-[1px] rounded-[0.9rem] bg-black/80" />
              <img
                src="/izi-logo.png"
                alt=""
                className="relative z-10 h-9 w-9 object-contain drop-shadow-[0_0_12px_rgba(30,144,255,0.55)]"
              />
            </span>
            <span className="hidden leading-none sm:flex">
              <span className="text-sm font-black uppercase tracking-wide">
                IZI <span className="text-[#1E90FF]">TECH</span>
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {desktopNavLinks.map(({ href, label, className }) => (
              <a key={href} href={href} className={className}>
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#booking"
              className="whitespace-nowrap rounded-full bg-slate-900 px-6 py-2.5 text-xs font-bold uppercase text-white shadow-lg transition-all hover:scale-105 dark:bg-white dark:text-black"
            >
              Agendar
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="rounded-full p-2 text-slate-900 transition-colors hover:bg-black/5 dark:text-white dark:hover:bg-white/5 md:hidden"
              aria-label="Abrir menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[110] flex flex-col items-center justify-center gap-6 overflow-y-auto bg-white/95 px-6 py-10 backdrop-blur-2xl dark:bg-black/95"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute right-6 top-[calc(1rem+env(safe-area-inset-top))] p-4 text-slate-400 transition-colors hover:text-blue-500"
              aria-label="Fechar menu"
            >
              <X size={32} strokeWidth={1.5} />
            </button>

            {mobileNavLinks.map(({ href, label, external }) => (
              <a
                key={href}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-bold text-slate-900 transition-colors hover:text-[#1E90FF] dark:text-white"
              >
                {label}
              </a>
            ))}

            <a
              href="#booking"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 rounded-full bg-[#1E90FF] px-10 py-4 text-sm font-black text-white"
            >
              Agendar Visita
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        <HeroTech />
        <ServicesTech />
        <AboutTech />
        <GalleryTech />
        <BookingTech />
      </main>

      <footer className="relative z-10 border-t border-slate-200 bg-white py-24 text-center transition-colors duration-500 dark:border-white/5 dark:bg-black">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl border border-blue-400/20 bg-slate-950/80 shadow-[0_0_34px_rgba(30,144,255,0.22)]">
          <img
            src="/izi-logo.png"
            alt="IZI TECH"
            className="h-12 w-12 object-contain drop-shadow-[0_0_14px_rgba(30,144,255,0.6)]"
          />
        </div>
        <p className="mb-4 text-[10px] font-black uppercase tracking-[0.8em] text-slate-400 dark:text-gray-600">
          © 2026 IZI TECH
        </p>
      </footer>

      <div className="fixed bottom-8 right-8 z-[90] hidden flex-col gap-4 md:flex">
        <motion.a
          href="https://instagram.com/izitechbh"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`${floatingButtonClassName} bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]`}
          aria-label="Instagram da IZI TECH"
        >
          <Instagram size={24} />
        </motion.a>
        <motion.a
          href="https://wa.me/5531920017218"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.1, rotate: -5 }}
          className={`${floatingButtonClassName} bg-[#25D366]`}
          aria-label="WhatsApp da IZI TECH"
        >
          <MessageCircle size={24} fill="currentColor" />
        </motion.a>
      </div>
    </div>
  );
}
