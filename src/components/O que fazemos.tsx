import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpCircle, Wind, Wrench, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useRef } from 'react';

type ServiceItem = {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  color: string;
  iconColor: string;
  bgAccent: string;
  glow: string;
  hoverBorder: string;
};

const services: ServiceItem[] = [
  {
    id: 1,
    number: '01',
    title: 'OTIMIZAÇÃO EXTREMA',
    subtitle: 'FPS cravado e zero lag',
    description: 'Ajustes finos para extrair o máximo de FPS e velocidade do seu PC.',
    icon: Zap,
    color: 'from-blue-600 to-blue-900',
    iconColor: 'text-blue-500',
    bgAccent: 'bg-blue-600',
    glow: 'shadow-[0_0_40px_rgba(37,99,235,0.15)]',
    hoverBorder: 'group-hover:border-blue-500/50',
  },
  {
    id: 2,
    number: '02',
    title: 'LIMPEZA TÉCNICA',
    subtitle: 'Serviço mais pedido',
    description:
      'Desmontagem completa, banho químico e troca por pasta térmica de alta performance. Seu hardware volta mais frio, limpo e confiável.',
    icon: Wind,
    color: 'from-purple-600 to-purple-900',
    iconColor: 'text-purple-500',
    bgAccent: 'bg-purple-600',
    glow: 'shadow-[0_0_40px_rgba(147,51,234,0.15)]',
    hoverBorder: 'group-hover:border-purple-500/50',
  },
  {
    id: 3,
    number: '03',
    title: 'UPGRADES E MONTAGEM',
    subtitle: 'Cable management impecável',
    description:
      'Consultoria para compra de peças, montagem do zero e acabamento limpo, com organização interna pensada para desempenho e estética.',
    icon: ArrowUpCircle,
    color: 'from-emerald-600 to-emerald-900',
    iconColor: 'text-emerald-500',
    bgAccent: 'bg-emerald-600',
    glow: 'shadow-[0_0_40px_rgba(16,185,129,0.15)]',
    hoverBorder: 'group-hover:border-emerald-500/50',
  },
  {
    id: 4,
    number: '04',
    title: 'MANUTENÇÃO AVANÇADA',
    subtitle: 'Diagnóstico preciso',
    description:
      'Tela azul, travamentos ou máquina sem ligar. O atendimento é feito com diagnóstico claro e solução prática direto no local.',
    icon: Wrench,
    color: 'from-orange-600 to-orange-900',
    iconColor: 'text-orange-500',
    bgAccent: 'bg-orange-600',
    glow: 'shadow-[0_0_40px_rgba(249,115,22,0.15)]',
    hoverBorder: 'group-hover:border-orange-500/50',
  },
];

function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: false, margin: '-10%' });
  const isEven = index % 2 === 0;

  return (
    <div ref={cardRef} className="relative flex min-h-[40vh] items-center justify-center py-12 md:min-h-[60vh] md:py-20">
      <div className="absolute left-6 z-30 -translate-x-1/2 md:left-1/2">
        <motion.div
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0.3 }}
          className="relative flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-slate-50 bg-white shadow-xl dark:border-black dark:bg-[#050505] md:h-16 md:w-16"
        >
          <service.icon className={`relative z-10 h-4 w-4 md:h-7 md:w-7 ${service.iconColor}`} />
          <div className={`absolute inset-0 z-0 rounded-full blur-md opacity-30 animate-pulse ${service.bgAccent}`} />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className={`flex flex-col items-center md:flex-row ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
          <motion.div
            initial={{ opacity: 0, x: isEven ? 50 : -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 50 : -50 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="z-20 w-full pl-12 md:w-[48%] md:pl-0"
          >
            <div className={`group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 dark:border-white/5 dark:bg-[#030303]/90 md:p-12 ${service.glow} ${service.hoverBorder}`}>
              <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:14px_14px]" />
              <div className={`pointer-events-none absolute -right-32 -top-32 z-0 h-64 w-64 bg-gradient-to-br blur-[100px] opacity-10 transition-opacity duration-700 group-hover:opacity-40 ${service.color}`} />
              <div className="pointer-events-none absolute -bottom-6 -right-2 z-0 select-none text-[70px] font-black italic leading-none text-slate-100 dark:text-white/[0.02] md:text-[140px]">
                {service.number}
              </div>

              <div className="relative z-10 flex flex-col items-start">
                <h4 className={`mb-2 text-[9px] font-bold uppercase tracking-[0.2em] md:mb-3 md:text-xs ${service.iconColor}`}>
                  {service.subtitle}
                </h4>
                <h3 className="mb-4 font-display text-xl font-black uppercase italic leading-[1.1] tracking-tighter text-slate-900 dark:text-white md:mb-6 md:text-4xl">
                  {service.title}
                </h3>
                <p className="max-w-[95%] text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-400 md:text-base">
                  {service.description}
                </p>

                <a
                  href={`https://wa.me/5531920017218?text=${encodeURIComponent(`Fala, Kevyn! Quero agendar: ${service.title}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-6 inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest transition-all duration-300 group-hover:gap-4 md:mt-8 md:text-xs ${service.iconColor}`}
                >
                  Agendar serviço
                  <ArrowRight size={14} className="transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function ServicesTech() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 75%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="services" ref={sectionRef} className="relative overflow-hidden border-t border-slate-200 bg-slate-50 py-16 transition-colors duration-500 dark:border-white/5 dark:bg-black md:py-32">
      <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-12">
        <div className="relative z-20 mb-12 text-center md:mb-20">
          <span className="mb-4 inline-block rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.4em] text-slate-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-300 md:mb-6 md:text-[10px]">
            O que fazemos
          </span>
          <h2 className="font-display text-[2.5rem] font-black uppercase italic leading-[0.9] tracking-tighter text-slate-900 drop-shadow-2xl dark:text-white md:text-[5.5rem]">
            SOLUÇÕES <br />
            <span className="text-slate-400 dark:text-slate-600">COMPLETAS.</span>
          </h2>
        </div>

        <div ref={timelineRef} className="relative mx-auto max-w-5xl">
          <div className="absolute bottom-0 left-6 top-0 z-0 md:left-1/2 md:-translate-x-1/2">
            <div className="absolute left-[-1px] top-0 h-full w-[2px] bg-slate-200 dark:bg-white/5" />
            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-[-1px] top-0 w-[2px] rounded-full bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
            />
          </div>

          <div className="relative z-10">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
