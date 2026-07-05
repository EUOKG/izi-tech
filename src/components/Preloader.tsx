import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // O tempo exato para a barra encher e a tela subir com elegância
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          /* A transição que desliza a tela preta para cima */
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] bg-[#020205] flex flex-col items-center justify-center px-4"
        >
          <div className="text-center w-full max-w-sm">
            
            {/* O TEXTO IZI TECH DO HTML ORIGINAL */}
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-4xl md:text-5xl font-black tracking-[0.3em] text-white mb-6 uppercase italic flex justify-center items-center gap-2"
            >
              IZI <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600">TECH</span>
            </motion.h1>
            
            {/* A BARRA DE CARREGAMENTO FINA E ELEGANTE */}
            <div className="w-48 md:w-64 h-[2px] bg-white/10 relative overflow-hidden mx-auto rounded-full">
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                /* Duração do enchimento da barra */
                transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
                className="absolute inset-0 bg-[#1E90FF] w-full h-full shadow-[0_0_10px_#1E90FF]"
              />
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}