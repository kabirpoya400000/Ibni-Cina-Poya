import { useState } from 'react';
import { UploadCloud, AlertCircle, CheckCircle2, Loader2, Camera } from 'lucide-react';

export default function TongueDiagnosis({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate AI processing delay (reduced for better UX)
    setTimeout(() => {
      setIsUploading(false);
      setIsAnalyzed(true);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between bg-white border border-slate-200 shadow-sm p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">تشخیص مزاج از روی زبان (هوش مصنوعی)</h1>
          <p className="text-sm text-slate-500">تصویری واضح از زبان خود آپلود کنید تا مزاج شما به صورت اولیه بررسی شود.</p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex gap-4 items-start border-r-4 border-r-amber-500">
        <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-sm text-amber-900 leading-relaxed">
          <strong>توجه:</strong> این سیستم تنها یک ابزار کمک‌تشخیصی اولیه است و به هیچ وجه جایگزین ویزیت و تشخیص پزشک متخصص طب سنتی نمی‌باشد. برای تشخیص قطعی حتماً از بخش مشاوره با حکیم استفاده کنید.
        </div>
      </div>

      {!isAnalyzed ? (
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
          {isUploading ? (
            <div className="flex flex-col items-center space-y-6">
              <Loader2 className="w-16 h-16 text-emerald-600 animate-spin" />
              <p className="text-xl text-slate-900 font-bold">در حال پردازش تصویر و تحلیل هوش مصنوعی...</p>
            </div>
          ) : (
            <>
              <div className="w-24 h-24 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mb-8">
                <Camera className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">آپلود تصویر زبان</h3>
              <p className="text-base text-slate-500 mb-10 max-w-md leading-relaxed">
                لطفاً در نور طبیعی، زبان خود را به طور کامل بیرون آورده و یک عکس واضح بگیرید. فرمت‌های مجاز: JPG, PNG
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={handleUpload}
                  className="flex items-center gap-3 py-3 px-8 rounded-xl text-base font-bold transition-all bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  <UploadCloud className="w-6 h-6" />
                  انتخاب تصویر
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-8">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              <h2 className="text-2xl font-bold text-slate-900">نتیجه تحلیل اولیه</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-sm font-bold text-slate-500 mb-6 uppercase tracking-wider">مشاهدات ظاهری</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center py-3 px-4 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-sm text-slate-600">رنگ بدنه زبان:</span>
                    <span className="text-sm font-bold text-slate-900">متمایل به سرخ</span>
                  </li>
                  <li className="flex justify-between items-center py-3 px-4 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-sm text-slate-600">پوشش (بار) زبان:</span>
                    <span className="text-sm font-bold text-slate-900">نازک و زرد رنگ</span>
                  </li>
                  <li className="flex justify-between items-center py-3 px-4 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-sm text-slate-600">رطوبت:</span>
                    <span className="text-sm font-bold text-slate-900">خشک</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-500 mb-6 uppercase tracking-wider">مزاج احتمالی</h3>
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 mb-6">
                  <p className="text-xl font-bold text-amber-700 text-center">گرم و خشک (صفراوی)</p>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed p-5 bg-slate-50 border border-slate-100 rounded-xl">
                  بر اساس تحلیل تصویر، علائم غلبه صفرا (گرمی و خشکی) مشاهده می‌شود. توصیه می‌شود از مصرف غذاهای بسیار تند و سرخ‌کردنی پرهیز کرده و از عرقیات خنک مانند کاسنی استفاده نمایید.
                </p>
              </div>
            </div>
            <div className="mt-10 pt-8 border-t border-slate-100 flex justify-end gap-4">
              <button 
                onClick={() => setIsAnalyzed(false)}
                className="py-2.5 px-6 rounded-xl text-sm font-bold transition-all bg-white border border-slate-200 text-slate-600 hover:text-emerald-600 hover:bg-slate-50 hover:border-emerald-200"
              >
                آپلود تصویر جدید
              </button>
              <button 
                onClick={() => setActiveTab('consultation')}
                className="py-2.5 px-6 rounded-xl text-sm font-bold transition-all bg-emerald-600 text-white hover:bg-emerald-700"
              >
                مشاوره با حکیم
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
