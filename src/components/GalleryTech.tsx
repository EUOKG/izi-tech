import { motion } from "framer-motion";
import { Instagram, ArrowRight } from "lucide-react";

export function GalleryTech() {
  // Lista organizada com os nomes dos seus arquivos reais
  const images = [
    { id: 1, src: "/instagram/img1.jpg" },
    { id: 2, src: "/instagram/img2.jpg" },
    { id: 3, src: "/instagram/img3.png" },
  ];

  return (
    <section id="gallery" className="py-24 md:py-32 bg-slate-50 dark:bg-[#020205] relative z-10 border-t border-slate-200 dark:border-white/5 transition-colors duration-500">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Cabeçalho da Galeria */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left mb-8 md:mb-0"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/20 bg-pink-500/5 mb-6">
              <Instagram size={14} className="text-pink-500" /> 
              <span className="text-[10px] font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">@izitechbh</span>
              <span className="flex h-2 w-2 relative ml-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase italic text-slate-900 dark:text-white tracking-tighter transition-colors duration-500">Galeria <span className="text-blue-500">IZI</span></h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-3 font-medium transition-colors duration-500">Confira os últimos setups montados.</p>
          </motion.div>

          <motion.a 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            href="https://instagram.com/izitechbh" 
            target="_blank" 
            rel="noreferrer"
            className="px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white border border-slate-300 dark:border-white/10 bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 transition-all shadow-xl backdrop-blur-md duration-500"
          >
            Seguir no Insta
          </motion.a>
        </div>

        {/* Grid de Imagens Reais com Zoom Cinematográfico */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {images.map((item, index) => (
            <motion.a 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              href="https://instagram.com/izitechbh" 
              target="_blank" 
              rel="noreferrer"
              className="group relative aspect-square rounded-[2rem] overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-[#050505] cursor-pointer transition-colors duration-500"
            >
              {/* Renderização das suas imagens reais */}
              <img 
                src={item.src} 
                alt={`Setup IZI TECH ${item.id}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.a>
          ))}
          
          {/* Card Final de Chamada para Ação */}
          <motion.a 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            href="https://instagram.com/izitechbh" 
            target="_blank" 
            rel="noreferrer"
            className="group relative aspect-square rounded-[2rem] overflow-hidden border border-blue-500/20 bg-blue-50 dark:bg-blue-600/5 cursor-pointer flex flex-col items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-600/10 transition-colors duration-500"
          >
            <ArrowRight size={32} className="text-blue-500 mb-3 group-hover:translate-x-2 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">Ver Feed Completo</span>
          </motion.a>
        </div>

      </div>
    </section>
  );
}