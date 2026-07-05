import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpCircle,
  Calendar as CalendarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  FileText,
  Hammer,
  HardDrive,
  MapPin,
  Phone,
  User,
  Wind,
  Wrench,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

type ServiceType = 'Otimização FPS' | 'Reparo' | 'Upgrade' | 'Manutenção' | 'Formatação' | '';
type BackupOption = 'Sim' | 'Não' | 'N/A';

interface FormDataState {
  Nome: string;
  WhatsApp: string;
  Endereco: string;
  Detalhes: string;
}

interface ServiceConfig {
  id: ServiceType;
  title: string;
  icon: LucideIcon;
  iconColor: string;
  subIcon?: LucideIcon;
  colSpan?: boolean;
  hasBackup?: boolean;
}

const SERVICES: ServiceConfig[] = [
  { id: 'Otimização FPS', title: 'Otimização', icon: Zap, iconColor: 'text-blue-500' },
  { id: 'Reparo', title: 'Reparo', icon: Wrench, iconColor: 'text-orange-500', subIcon: Hammer },
  { id: 'Upgrade', title: 'Upgrade', icon: ArrowUpCircle, iconColor: 'text-green-500' },
  { id: 'Manutenção', title: 'Manutenção', icon: Wind, iconColor: 'text-gray-400' },
  { id: 'Formatação', title: 'Formatação', icon: HardDrive, iconColor: 'text-red-500', colSpan: true, hasBackup: true },
];

const steps = [
  { step: 1, label: 'Serviço' },
  { step: 2, label: 'Data' },
  { step: 3, label: 'Dados' },
];

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction < 0 ? 50 : -50, opacity: 0 }),
};

function ServiceOption({
  config,
  isSelected,
  onSelect,
  backupValue,
  onBackupChange,
}: {
  config: ServiceConfig;
  isSelected: boolean;
  onSelect: (id: ServiceType) => void;
  backupValue: BackupOption;
  onBackupChange: (value: BackupOption) => void;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(config.id)}
      className={`service-opt group relative isolate cursor-pointer overflow-hidden rounded-2xl p-6 transition-all duration-300 ${
        config.colSpan ? 'sm:col-span-2' : ''
      } ${
        isSelected
          ? 'selected'
          : 'border border-slate-200 bg-white hover:bg-slate-100 dark:border-white/10 dark:bg-[#050505] dark:hover:bg-white/5'
      }`}
    >
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-4 flex items-start justify-between">
          <div
            className={`rounded-xl p-3 transition-colors duration-300 ${
              isSelected ? 'bg-blue-500 text-white' : `bg-slate-100 dark:bg-white/10 ${config.iconColor}`
            }`}
          >
            <config.icon size={24} />
          </div>

          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg"
            >
              <Check size={14} strokeWidth={3} />
            </motion.div>
          )}
        </div>

        <h4
          className={`mb-1 text-sm font-black uppercase tracking-wide ${
            isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          {config.title}
          {config.subIcon && <config.subIcon className="ml-2 inline-block h-3 w-3 text-orange-500" />}
        </h4>

        <AnimatePresence>
          {config.hasBackup && isSelected && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              className="overflow-hidden border-t border-slate-200 pt-4 dark:border-white/10"
            >
              <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Backup de arquivos?
              </p>
              <div className="flex gap-2">
                {(['Sim', 'Não'] as const).map((option) => (
                  <button
                    key={option}
                    onClick={(event) => {
                      event.stopPropagation();
                      onBackupChange(option);
                    }}
                    className={`flex-1 rounded-lg py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                      backupValue === option
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function BookingTech() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [service, setService] = useState<ServiceType>('');
  const [backup, setBackup] = useState<BackupOption>('N/A');
  const [date, setDate] = useState('');
  const [formData, setFormData] = useState<FormDataState>({
    Nome: '',
    WhatsApp: '',
    Endereco: '',
    Detalhes: '',
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const selectedServiceConfig = SERVICES.find((item) => item.id === service);

  const handleServiceSelect = (id: ServiceType) => {
    setService(id);
    setBackup('N/A');
  };

  const handleNext = () => {
    if (step === 1 && !service) {
      window.alert('Selecione um serviço primeiro.');
      return;
    }

    if (step === 2 && !date) {
      window.alert('Escolha uma data no calendário.');
      return;
    }

    setDirection(1);
    setStep((previous) => previous + 1);
  };

  const handlePrev = () => {
    setDirection(-1);
    setStep((previous) => previous - 1);
  };

  const handleMonthChange = (increment: number) => {
    setCurrentMonth((previous) => new Date(previous.getFullYear(), previous.getMonth() + increment, 1));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const submitData = new FormData();
    submitData.append('Servico', service);
    submitData.append('Backup', backup);
    submitData.append('Data', date);
    Object.entries(formData).forEach(([key, value]) => submitData.append(key, value));

    try {
      await fetch('https://formspree.io/f/xrbllpvl', {
        method: 'POST',
        body: submitData,
        headers: { Accept: 'application/json' },
      });

      setIsSuccess(true);
    } catch {
      window.alert('Erro ao enviar. Tente pelo WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dayElements = [];
    for (let index = 0; index < firstDay; index += 1) {
      dayElements.push(<div key={`empty-${index}`} />);
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const currentDate = new Date(year, month, day);
      const isPast = currentDate < today;
      const isSunday = currentDate.getDay() === 0;
      const dateLabel = currentDate.toLocaleDateString('pt-BR');
      const isSelected = date === dateLabel;

      dayElements.push(
        <button
          key={day}
          type="button"
          disabled={isPast || isSunday}
          onClick={() => setDate(dateLabel)}
          className={`relative cursor-pointer rounded-lg p-2 text-sm font-medium transition-all ${
            isPast || isSunday
              ? 'cursor-not-allowed text-gray-700'
              : isSelected
                ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]'
                : 'text-slate-600 hover:bg-blue-500 hover:text-white dark:text-gray-300'
          }`}
        >
          {day}
        </button>,
      );
    }

    return dayElements;
  }, [currentMonth, date]);

  return (
    <section id="booking" className="relative z-10 bg-slate-50 px-4 py-24 transition-colors duration-500 dark:bg-[#020205] md:py-32">
      <style>{`
        @keyframes spin-glow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .service-opt.selected::after {
          content: '';
          position: absolute;
          inset: 2px;
          z-index: 0;
          border-radius: 0.9rem;
          background: #ffffff;
        }

        .dark .service-opt.selected::after {
          background: #08080a;
        }

        .service-opt.selected::before {
          content: '';
          position: absolute;
          top: -150%;
          left: -150%;
          z-index: -1;
          width: 400%;
          height: 400%;
          background: conic-gradient(from 0deg, transparent 40%, #1e90ff 60%, #00ffff 80%, #1e90ff 100%);
          animation: spin-glow 3s linear infinite;
        }
      `}</style>

      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-2xl transition-all duration-500 dark:border-white/5 dark:bg-[#08080A] md:p-16">
          <div className="relative z-10 mb-12 text-center">
            <h2 className="mb-4 text-4xl font-black uppercase tracking-tighter text-slate-900 transition-colors duration-500 dark:text-white">
              Portal de agendamento
            </h2>

            <div className="relative mt-8 flex items-center justify-center gap-4">
              {steps.map((item) => (
                <div key={item.step} className="relative z-10 flex flex-col items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black transition-all duration-500 ${
                      step >= item.step
                        ? 'scale-110 bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]'
                        : 'bg-slate-200 text-slate-400 dark:bg-white/10 dark:text-gray-500'
                    }`}
                  >
                    {step > item.step ? <Check size={14} strokeWidth={3} /> : item.step}
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-500 ${
                      step >= item.step ? 'text-blue-600 dark:text-blue-400' : 'text-slate-300 dark:text-gray-600'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}

              <div className="absolute left-1/2 top-[5.5rem] h-[2px] w-[160px] -translate-x-1/2 bg-slate-200 dark:bg-white/5" />
            </div>
          </div>

          <div className="relative w-full">
            {isSuccess ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-10 text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-green-500/20 bg-green-500/10 text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                  <Check className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-tighter text-slate-900 transition-colors duration-500 dark:text-white">
                  Solicitação recebida
                </h3>
                <p className="mt-2 max-w-xs text-sm text-slate-600 transition-colors duration-500 dark:text-gray-500">
                  Entraremos em contato via WhatsApp para confirmar.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-8 text-xs font-bold uppercase text-blue-400 transition-colors hover:text-white"
                >
                  Novo agendamento
                </button>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait" custom={direction}>
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4 }}
                    className="w-full"
                  >
                    <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-gray-500">
                      01. Selecione o serviço
                    </h4>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {SERVICES.map((item) => (
                        <ServiceOption
                          key={item.id}
                          config={item}
                          isSelected={service === item.id}
                          onSelect={handleServiceSelect}
                          backupValue={backup}
                          onBackupChange={setBackup}
                        />
                      ))}
                    </div>

                    <div className="mt-8 text-right">
                      <button className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 px-8 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:scale-105 hover:from-indigo-500 hover:to-blue-500" onClick={handleNext}>
                        Próximo
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step-2"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4 }}
                    className="w-full"
                  >
                    <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-gray-500">
                      02. Escolha a data
                    </h4>

                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-bold capitalize text-slate-900 transition-colors duration-500 dark:text-white">
                        {currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                      </span>
                      <div className="flex gap-2">
                        <button onClick={() => handleMonthChange(-1)} className="p-1 text-slate-400 transition-colors hover:text-slate-900 dark:text-gray-400 dark:hover:text-white">
                          <ChevronLeft size={20} />
                        </button>
                        <button onClick={() => handleMonthChange(1)} className="p-1 text-slate-400 transition-colors hover:text-slate-900 dark:text-gray-400 dark:hover:text-white">
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </div>

                    <div className="mb-6 grid grid-cols-7 gap-2 text-center text-sm font-bold text-gray-500">
                      {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day) => (
                        <div key={day} className="py-2">
                          {day}
                        </div>
                      ))}
                      {calendarDays}
                    </div>

                    <div className="mb-8 rounded-xl border border-blue-500/20 bg-blue-50 p-4 text-center transition-colors duration-500 dark:bg-blue-500/10">
                      <p className="text-xs font-bold uppercase tracking-widest text-blue-600 transition-colors duration-500 dark:text-blue-300">
                        Horário disponível
                      </p>
                      <p className="mt-1 text-xl font-black text-slate-900 transition-colors duration-500 dark:text-white">
                        A combinar
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <button onClick={handlePrev} className="text-xs font-bold uppercase tracking-widest text-slate-400 transition-colors hover:text-slate-600 dark:text-gray-500 dark:hover:text-white">
                        Voltar
                      </button>
                      <button onClick={handleNext} className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 px-8 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:scale-105">
                        Próximo
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step-3"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4 }}
                    className="w-full"
                  >
                    <form onSubmit={handleSubmit}>
                      <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-gray-500">
                        03. Seus dados
                      </h4>

                      <div className="mb-8 flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-100 p-4 transition-colors duration-500 dark:border-white/10 dark:bg-white/5">
                        <div className={`rounded-lg p-3 ${selectedServiceConfig?.iconColor.replace('text-', 'bg-').replace('500', '500/20')}`}>
                          {selectedServiceConfig && <selectedServiceConfig.icon className={selectedServiceConfig.iconColor} size={24} />}
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                            Resumo do agendamento
                          </p>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">
                            {service} {backup !== 'N/A' && <span className="text-xs font-normal text-slate-500">({backup})</span>}
                          </p>
                          <p className="mt-1 flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-gray-300">
                            <CalendarIcon size={12} className="text-blue-500" />
                            {date || 'Data pendente'}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          <input
                            type="text"
                            required
                            value={formData.Nome}
                            onChange={(event) => setFormData({ ...formData, Nome: event.target.value })}
                            placeholder="Seu nome"
                            className="w-full rounded-xl border border-slate-200 bg-slate-100 p-4 pl-12 font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500 dark:focus:bg-white/10"
                          />
                        </div>

                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          <input
                            type="tel"
                            required
                            value={formData.WhatsApp}
                            onChange={(event) => setFormData({ ...formData, WhatsApp: event.target.value })}
                            placeholder="WhatsApp (DDD)"
                            className="w-full rounded-xl border border-slate-200 bg-slate-100 p-4 pl-12 font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500 dark:focus:bg-white/10"
                          />
                        </div>

                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          <input
                            type="text"
                            required
                            value={formData.Endereco}
                            onChange={(event) => setFormData({ ...formData, Endereco: event.target.value })}
                            placeholder="Endereço completo"
                            className="w-full rounded-xl border border-slate-200 bg-slate-100 p-4 pl-12 font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500 dark:focus:bg-white/10"
                          />
                        </div>

                        <div className="relative">
                          <FileText className="absolute left-4 top-4 text-slate-400" size={18} />
                          <textarea
                            value={formData.Detalhes}
                            onChange={(event) => setFormData({ ...formData, Detalhes: event.target.value })}
                            placeholder="Detalhes do problema (opcional)"
                            className="h-24 w-full resize-none rounded-xl border border-slate-200 bg-slate-100 p-4 pl-12 font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500 dark:focus:bg-white/10"
                          />
                        </div>
                      </div>

                      <div className="mt-8 flex items-center justify-between">
                        <button type="button" onClick={handlePrev} className="text-xs font-bold uppercase tracking-widest text-slate-400 transition-colors hover:text-slate-600 dark:text-gray-500 dark:hover:text-white">
                          Voltar
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 px-10 py-4 text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all hover:scale-105 disabled:opacity-50"
                        >
                          {isSubmitting ? 'Enviando...' : 'Confirmar agendamento'}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
