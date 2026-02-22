/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Plus, Minus, Laptop } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const BASE_PRICE = 400000;

export default function App() {
  const [quantity, setQuantity] = useState(0);

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 0 ? prev - 1 : 0));

  const total = quantity * BASE_PRICE;

  // Formateador de moneda para Chile (CLP)
  const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-12">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-serif italic font-semibold text-[#5A5A40]">
          Desafío 1: Calculando el total
        </h1>
        <p className="text-sm uppercase tracking-widest text-[#5A5A40]/60 font-medium">
          Bootcamp Full Stack Developer
        </p>
      </header>

      <main className="flex flex-col md:flex-row items-center gap-16 max-w-4xl w-full">
        {/* Product Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#7ba238] rounded-[32px] p-8 w-full max-w-[320px] shadow-2xl shadow-[#7ba238]/20 text-white flex flex-col gap-6"
        >
          <div className="relative aspect-video bg-white/10 rounded-2xl overflow-hidden flex items-center justify-center group">
            <img 
              src="https://www.amd.com/system/files/2020-05/461767_MSI_Bravo_17_AMD_laptop_1260x709_0.png" 
              alt="Laptop Gamer AMD"
              className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md p-2 rounded-full">
              <Laptop size={16} />
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-semibold tracking-tight">Laptop Gamer AMD</h2>
            <p className="text-white/80 text-sm">Precio base: <span className="font-medium">{formatter.format(BASE_PRICE)}</span></p>
          </div>

          <div className="flex items-center justify-between bg-black/10 p-4 rounded-2xl">
            <span className="text-sm font-medium uppercase tracking-wider opacity-80">Cantidad</span>
            <div className="flex items-center gap-4">
              <button 
                onClick={decrement}
                className="w-8 h-8 flex items-center justify-center bg-[#e2a30b] hover:bg-[#c98e08] rounded-lg transition-colors shadow-lg active:scale-95"
                aria-label="Disminuir cantidad"
              >
                <Minus size={16} strokeWidth={3} />
              </button>
              
              <span className="text-xl font-bold min-w-[1.5ch] text-center">
                {quantity}
              </span>

              <button 
                onClick={increment}
                className="w-8 h-8 flex items-center justify-center bg-[#e2a30b] hover:bg-[#c98e08] rounded-lg transition-colors shadow-lg active:scale-95"
                aria-label="Aumentar cantidad"
              >
                <Plus size={16} strokeWidth={3} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Total Display */}
        <div className="flex-1 space-y-6">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#5A5A40]/50">Resumen de compra</p>
            <div className="h-px bg-[#5A5A40]/10 w-full" />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-lg font-serif italic text-[#5A5A40]">Total a pagar:</span>
              <AnimatePresence mode="wait">
                <motion.span 
                  key={total}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="text-5xl font-bold tracking-tighter text-[#1a1a1a]"
                >
                  {formatter.format(total)}
                </motion.span>
              </AnimatePresence>
            </div>
            
            <p className="text-sm text-[#5A5A40]/60 leading-relaxed">
              {quantity === 0 
                ? "Selecciona una cantidad para ver el total." 
                : `Has seleccionado ${quantity} unidad${quantity > 1 ? 'es' : ''} de Laptop Gamer AMD.`}
            </p>
          </div>

          {quantity > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full py-4 bg-[#5A5A40] text-white rounded-2xl font-semibold tracking-wide hover:bg-[#4a4a35] transition-colors shadow-xl shadow-[#5A5A40]/20"
            >
              Continuar con la compra
            </motion.button>
          )}
        </div>
      </main>

      <footer className="mt-auto py-8 border-t border-[#5A5A40]/10 w-full max-w-4xl flex justify-between items-center text-[10px] uppercase tracking-widest text-[#5A5A40]/40 font-bold">
        <span>Desafío Latam</span>
        <span>2026 • Bootcamp Full Stack</span>
      </footer>
    </div>
  );
}
