import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, CheckCircle2, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Lucas Silva",
    tag: "@lucas.fps",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas",
    message: "O trabalho da IZI é outro nível. Meu PC estava sofrendo com stuttering e agora roda tudo liso. O atendimento a domicílio facilitou demais.",
  },
  {
    id: 2,
    name: "Gabriel Costa",
    tag: "@gabriel_vlr",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Gabriel",
    message: "Finalmente achei alguém que entende de hardware high-end em BH. Troca de pasta térmica e otimização impecáveis.",
  },
  {
    id: 3,
    name: "Matheus Henrique",
    tag: "@math.henrique",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Matheus",
    message: "Transparência total. Vi cada peça sendo montada e recebi uma aula de como manter o setup. IZI TECH é referência!",
  }
];

export function SocialProof() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-[#020205] border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic">
            QUEM CONFIA NA <span className="text-primary text-not-italic">IZI.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 relative group hover:border-primary/20 transition-all"
            >
              <Quote className="absolute top-8 right-8 text-white/5 w-12 h-12" />
              <div className="flex items-center gap-4 mb-6">
                <img src={t.avatar} className="w-12 h-12 rounded-full border border-white/10" alt={t.name} />
                <div>
                  <h4 className="text-white font-bold text-sm flex items-center gap-1">{t.name} <CheckCircle2 size={12} className="text-primary" /></h4>
                  <span className="text-gray-500 text-[10px] font-medium">{t.tag}</span>
                </div>
              </div>
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-yellow-500 fill-yellow-500" />)}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">"{t.message}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}