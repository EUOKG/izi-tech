import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ShieldCheck } from 'lucide-react';

const LOOP_END_OFFSET = 1.5;

export function AboutTech() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime >= video.duration - LOOP_END_OFFSET) {
        video.currentTime = 0;
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-slate-50 py-24 transition-colors duration-500 dark:bg-[#020205] md:py-32"
    >
      <div className="container relative z-10 mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-16 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="group relative"
            >
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 blur-2xl transition-opacity group-hover:opacity-40" />

              <div className="relative mx-auto aspect-[9/16] max-w-[320px] overflow-hidden rounded-[2rem] border border-slate-200 bg-white transition-colors duration-500 dark:border-white/10 dark:bg-[#050505]">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover opacity-80"
                >
                  <source src="/video-loop.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                <div className="absolute bottom-8 left-0 w-full px-4 text-center">
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">
                    Bastidores IZI TECH
                  </h3>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-blue-500">
                    Qualidade em cada detalhe
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="mb-6 inline-block rounded-full border border-blue-500/30 bg-blue-600/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">
                Por trás da IZI
              </span>

              <h2 className="mb-8 text-4xl font-black uppercase italic leading-none tracking-tighter text-slate-900 transition-colors duration-500 dark:text-white md:text-6xl">
                Expertise com <br />
                <span className="text-slate-400 transition-colors duration-500 dark:text-slate-600">
                  propósito.
                </span>
              </h2>

              <div className="space-y-6 text-sm font-medium leading-relaxed text-slate-600 transition-colors duration-500 dark:text-slate-400 md:text-base">
                <p>
                  A IZI TECH nasceu em{' '}
                  <strong className="text-slate-900 transition-colors duration-500 dark:text-white">
                    novembro de 2024
                  </strong>{' '}
                  a partir da minha paixão por hardware de alto nível. A ideia sempre foi
                  entregar mais do que manutenção básica: performance real, clareza técnica
                  e atendimento caprichado.
                </p>
                <p>
                  Meu nome é Kevyn, e trato cada máquina como se fosse minha. O atendimento
                  é próximo, direto e pensado para quem quer entender o que está sendo feito
                  no próprio setup sem enrolação.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-4 border-t border-slate-200 pt-10 transition-colors duration-500 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <Calendar className="text-blue-500" size={20} />
                  <div>
                    <p className="text-xs font-black uppercase text-slate-900 transition-colors duration-500 dark:text-white">
                      Desde 2024
                    </p>
                    <p className="text-[9px] font-bold uppercase text-slate-500">
                      Fundação IZI
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-emerald-500" size={20} />
                  <div>
                    <p className="text-xs font-black uppercase text-slate-900 transition-colors duration-500 dark:text-white">
                      Garantia gamer
                    </p>
                    <p className="text-[9px] font-bold uppercase text-slate-500">
                      Segurança total
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
