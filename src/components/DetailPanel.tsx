import { motion, AnimatePresence } from 'motion/react';
import { Herb } from '../types';
import { X, AlertTriangle, Pill, Leaf } from 'lucide-react';

export default function DetailPanel({ herb, onClose }: { herb: Herb | null, onClose: () => void }) {
  return (
    <AnimatePresence>
      {herb && (
        <motion.aside
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-96 h-full bg-white shadow-xl z-20 overflow-y-auto border-r border-slate-200"
        >
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <button 
                onClick={onClose}
                className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold text-slate-900">جزئیات گیاه</h2>
            </div>

            <div className="w-full h-64 rounded-2xl overflow-hidden mb-8 bg-slate-100 border border-slate-200">
              <img src={herb.image} alt={herb.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>

            <h1 className="text-3xl font-bold mb-2 text-slate-900">{herb.name}</h1>
            <p className="text-sm text-slate-500 italic mb-8" dir="ltr">{herb.scientificName}</p>

            <div className="space-y-6">
              <section className="p-6 rounded-2xl border border-slate-200 bg-slate-50">
                <h3 className="flex items-center gap-2 font-bold mb-5 text-emerald-700">
                  <Leaf className="w-5 h-5" />
                  خواص درمانی
                </h3>
                <div className="flex flex-wrap gap-2">
                  {herb.properties.map(prop => (
                    <span key={prop} className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium">
                      {prop}
                    </span>
                  ))}
                </div>
              </section>

              <section className="p-6 rounded-2xl border border-slate-200 bg-slate-50">
                <h3 className="flex items-center gap-2 font-bold mb-5 text-amber-700">
                  <Pill className="w-5 h-5" />
                  روش‌های مصرف
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-slate-700 leading-relaxed">
                  {herb.preparationMethods.map((method, i) => (
                    <li key={i}>{method}</li>
                  ))}
                </ul>
              </section>

              {herb.drugInteractions.length > 0 && (
                <section className="p-6 rounded-2xl border border-red-100 bg-red-50">
                  <h3 className="flex items-center gap-2 font-bold mb-5 text-red-700">
                    <AlertTriangle className="w-5 h-5" />
                    تداخلات دارویی
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-sm text-red-800 leading-relaxed">
                    {herb.drugInteractions.map((interaction, i) => (
                      <li key={i}>{interaction}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
