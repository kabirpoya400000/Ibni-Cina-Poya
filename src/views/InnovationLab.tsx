import { useState, useRef, useEffect } from 'react';
import { generateInventionFormula } from '../services/geminiService';
import { InventionFormula, FormulaSection } from '../types';
import { Beaker, Loader2, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function InnovationLab() {
  const [plantName, setPlantName] = useState('');
  const [goal, setGoal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formula, setFormula] = useState<InventionFormula | null>(null);
  const [activeTab, setActiveTab] = useState<'simple' | 'advanced'>('simple');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleGenerate = async () => {
    if (!plantName || !goal) return;
    setIsLoading(true);
    try {
      const result = await generateInventionFormula(plantName, goal);
      setFormula(result);
      setActiveTab('simple');
    } catch (error) {
      console.error('Failed to generate formula', error);
      alert('خطا در تولید فرمول. لطفا دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (formula?.p5Code && iframeRef.current) {
      const htmlString = `
        <html>
          <head>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.js"></script>
            <style>body { margin: 0; overflow: hidden; display: flex; justify-content: center; align-items: center; background: #f8fafc; }</style>
          </head>
          <body>
            <script>${formula.p5Code}</script>
          </body>
        </html>
      `;
      iframeRef.current.srcdoc = htmlString;
    }
  }, [formula]);

  const renderSection = (section: FormulaSection) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
          <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" /> مواد لازم
          </h4>
          <ul className="list-disc list-inside space-y-2 text-sm text-slate-700">
            {section.materials.map((m, i) => <li key={i}>{m}</li>)}
          </ul>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
          <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Beaker className="w-5 h-5 text-amber-600" /> ابزارها
          </h4>
          <ul className="list-disc list-inside space-y-2 text-sm text-slate-700">
            {section.tools.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>
      </div>
      
      <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
        <h4 className="font-bold text-slate-900 mb-4">مراحل اجرا</h4>
        <ol className="list-decimal list-inside space-y-3 text-sm text-slate-700 leading-relaxed">
          {section.steps.map((s, i) => <li key={i}>{s}</li>)}
        </ol>
      </div>

      <div className="bg-red-50 border border-red-200 p-6 rounded-2xl">
        <h4 className="font-bold text-red-800 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" /> نکات ایمنی
        </h4>
        <ul className="list-disc list-inside space-y-2 text-sm text-red-700">
          {section.safety.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">لابراتوار ابداع</h1>
        <p className="text-base text-slate-500">طراحی فرمول‌های استخراج و فرآوری گیاهان دارویی</p>
      </div>

      <div className="bg-white border border-slate-200 shadow-sm p-8 rounded-3xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 ml-1">نام گیاه</label>
            <input 
              type="text" 
              value={plantName}
              onChange={(e) => setPlantName(e.target.value)}
              placeholder="مثال: اسطوخودوس"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900 text-sm transition-all"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 ml-1">هدف درمانی / استخراج</label>
            <input 
              type="text" 
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="مثال: استخراج اسانس آرام‌بخش"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900 text-sm transition-all"
            />
          </div>
        </div>
        <button 
          onClick={handleGenerate}
          disabled={isLoading || !plantName || !goal}
          className="w-full py-3.5 rounded-xl bg-emerald-600 text-white font-bold text-base flex items-center justify-center gap-3 disabled:opacity-50 hover:bg-emerald-700 transition-colors"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Beaker className="w-5 h-5" />}
          تولید فرمول
        </button>
      </div>

      {formula && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-white border border-slate-200 shadow-sm p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{formula.title}</h2>
            <p className="text-slate-600 leading-relaxed mb-8">{formula.description}</p>

            <div className="flex gap-4 mb-8">
              <button 
                onClick={() => setActiveTab('simple')}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'simple' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-emerald-600 hover:bg-slate-100'}`}
              >
                روش خانگی (ساده)
              </button>
              <button 
                onClick={() => setActiveTab('advanced')}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'advanced' ? 'bg-amber-600 text-white shadow-sm' : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-amber-600 hover:bg-slate-100'}`}
              >
                روش آزمایشگاهی (پیشرفته)
              </button>
            </div>

            {renderSection(activeTab === 'simple' ? formula.simple : formula.advanced)}
          </div>

          <div className="bg-white border border-slate-200 shadow-sm p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-slate-900 mb-6">شبیه‌سازی فرآیند</h3>
            <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
              <iframe 
                ref={iframeRef}
                sandbox="allow-scripts" 
                className="w-full h-full border-0"
                title="Simulation"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
