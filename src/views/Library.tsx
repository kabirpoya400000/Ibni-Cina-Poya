import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter } from 'lucide-react';
import { HERB_DATABASE } from '../constants';
import HerbCard from '../components/HerbCard';
import { Herb } from '../types';

export default function Library({ onSelectHerb, selectedHerb }: { onSelectHerb: (h: Herb) => void, selectedHerb: Herb | null }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);

  const allProperties = useMemo(() => {
    const props = new Set<string>();
    HERB_DATABASE.forEach(h => h.properties.forEach(p => props.add(p)));
    return Array.from(props);
  }, []);

  const filteredHerbs = useMemo(() => {
    return HERB_DATABASE.filter(herb => {
      const matchesSearch = herb.name.includes(searchTerm) || herb.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesProps = selectedProperties.length === 0 || selectedProperties.every(p => herb.properties.includes(p));
      return matchesSearch && matchesProps;
    });
  }, [searchTerm, selectedProperties]);

  const toggleProperty = (prop: string) => {
    setSelectedProperties(prev => 
      prev.includes(prop) ? prev.filter(p => p !== prop) : [...prev, prop]
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between bg-white border border-slate-200 shadow-sm p-6 rounded-2xl">
        <h1 className="text-2xl font-bold text-slate-900">دانشنامه گیاهان دارویی</h1>
      </div>

      {/* Search and Filter Toggle */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="جستجوی گیاه، نام علمی یا خواص..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 shadow-sm rounded-xl py-3 pr-12 pl-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900 placeholder-slate-400 text-base font-medium transition-all"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all shrink-0 border ${
            showFilters 
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
              : 'bg-white text-slate-500 hover:bg-slate-50 hover:text-emerald-600 border-slate-200'
          }`}
        >
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 rounded-2xl border border-slate-200 bg-white mb-6">
              <h3 className="text-base font-bold mb-4 text-slate-900">فیلتر بر اساس خواص:</h3>
              <div className="flex flex-wrap gap-2">
                {allProperties.map(prop => (
                  <button
                    key={prop}
                    onClick={() => toggleProperty(prop)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                      selectedProperties.includes(prop)
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-600'
                    }`}
                  >
                    {prop}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        {filteredHerbs.map(herb => (
          <HerbCard 
            key={herb.id} 
            herb={herb} 
            onClick={() => onSelectHerb(herb)}
            isSelected={selectedHerb?.id === herb.id}
          />
        ))}
        {filteredHerbs.length === 0 && (
          <div className="col-span-full text-center py-20 text-gray-500 font-medium text-lg">
            هیچ گیاهی با این مشخصات یافت نشد.
          </div>
        )}
      </motion.div>
    </div>
  );
}
