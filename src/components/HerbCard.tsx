import { motion } from 'motion/react';
import { Herb } from '../types';
import { ShieldAlert, ShieldCheck, Shield } from 'lucide-react';

const safetyConfig = {
  safe: { icon: ShieldCheck, color: 'text-emerald-600', label: 'ایمن' },
  caution: { icon: ShieldAlert, color: 'text-amber-600', label: 'احتیاط' },
  danger: { icon: Shield, color: 'text-red-600', label: 'خطرناک' }
};

export default function HerbCard({ herb, onClick, isSelected }: { herb: Herb, onClick: () => void, isSelected: boolean }) {
  const SafetyIcon = safetyConfig[herb.safetyLevel].icon;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`cursor-pointer rounded-2xl p-5 transition-all bg-white border ${
        isSelected ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md' : 'border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-200'
      }`}
    >
      <div className="relative h-48 rounded-xl overflow-hidden mb-5 bg-slate-100">
        <img 
          src={herb.image} 
          alt={herb.name} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm border border-slate-100 flex items-center gap-2">
          <SafetyIcon className={`w-4 h-4 ${safetyConfig[herb.safetyLevel].color}`} />
          <span className="text-xs font-bold text-slate-700">{safetyConfig[herb.safetyLevel].label}</span>
        </div>
      </div>
      
      <div className="px-1">
        <h3 className="text-xl font-bold text-slate-900 mb-1">{herb.name}</h3>
        <p className="text-sm text-slate-500 italic mb-4" dir="ltr">{herb.scientificName}</p>
        
        <p className="text-sm text-slate-600 line-clamp-2 mb-5 leading-relaxed">
          {herb.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {herb.properties.slice(0, 3).map(prop => (
            <span key={prop} className="text-xs px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 font-medium">
              {prop}
            </span>
          ))}
          {herb.properties.length > 3 && (
            <span className="text-xs px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 font-medium">
              +{herb.properties.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
