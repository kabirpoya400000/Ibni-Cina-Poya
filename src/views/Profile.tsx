import { useState } from 'react';
import { User, Settings, Heart, Shield, Edit3 } from 'lucide-react';

export default function Profile() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAction = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 relative">
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white border border-emerald-200 shadow-lg px-8 py-4 rounded-xl text-emerald-700 font-bold z-50 animate-in fade-in slide-in-from-bottom-4">
          {toastMessage}
        </div>
      )}
      <div className="flex items-center justify-between bg-white border border-slate-200 shadow-sm p-6 rounded-2xl">
        <h1 className="text-2xl font-bold text-slate-900">پروفایل کاربری</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Profile Info */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 text-center relative">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="w-full h-full rounded-full flex items-center justify-center bg-slate-50 border border-slate-100">
                <User className="w-12 h-12 text-slate-400" />
              </div>
              <button className="absolute bottom-0 right-0 p-2.5 rounded-full text-slate-500 hover:text-emerald-600 transition-colors bg-white border border-slate-200 shadow-sm hover:bg-slate-50">
                <Edit3 className="w-5 h-5" />
              </button>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">کاربر مهمان</h2>
            <p className="text-sm text-slate-500 mb-6">user@example.com</p>
            <div className="inline-block px-4 py-1.5 bg-amber-50 border border-amber-100 text-amber-700 text-sm font-bold rounded-full">
              مزاج: دموی (گرم و تر)
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-4">
            <nav className="flex flex-col space-y-2">
              <button className="flex items-center gap-4 px-4 py-3 text-sm font-bold bg-emerald-50 text-emerald-700 rounded-xl transition-all">
                <User className="w-5 h-5" />
                اطلاعات شخصی
              </button>
              <button 
                onClick={() => handleAction('بخش سوابق پزشکی در حال توسعه است.')}
                className="flex items-center gap-4 px-4 py-3 text-sm font-bold text-slate-600 hover:text-emerald-600 hover:bg-slate-50 rounded-xl transition-all"
              >
                <Heart className="w-5 h-5" />
                سوابق پزشکی
              </button>
              <button 
                onClick={() => handleAction('بخش امنیت و رمز عبور در حال توسعه است.')}
                className="flex items-center gap-4 px-4 py-3 text-sm font-bold text-slate-600 hover:text-emerald-600 hover:bg-slate-50 rounded-xl transition-all"
              >
                <Shield className="w-5 h-5" />
                امنیت و رمز عبور
              </button>
              <button 
                onClick={() => handleAction('بخش تنظیمات برنامه در حال توسعه است.')}
                className="flex items-center gap-4 px-4 py-3 text-sm font-bold text-slate-600 hover:text-emerald-600 hover:bg-slate-50 rounded-xl transition-all"
              >
                <Settings className="w-5 h-5" />
                تنظیمات برنامه
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-8 pb-6 border-b border-slate-100">ویرایش اطلاعات شخصی</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-700 ml-1">نام و نام خانوادگی</label>
                  <input 
                    type="text" 
                    defaultValue="کاربر مهمان"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900 text-sm transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-700 ml-1">شماره تماس</label>
                  <input 
                    type="tel" 
                    defaultValue="۰۹۱۲۳۴۵۶۷۸۹"
                    dir="ltr"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900 text-sm text-right transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-700 ml-1">تاریخ تولد</label>
                  <input 
                    type="text" 
                    defaultValue="۱۳۷۰/۰۵/۱۴"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900 text-sm transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-700 ml-1">جنسیت</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900 text-sm appearance-none transition-all">
                    <option>مرد</option>
                    <option>زن</option>
                    <option>سایر</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 ml-1">آدرس</label>
                <textarea 
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900 text-sm resize-none transition-all"
                  placeholder="آدرس کامل خود را وارد کنید..."
                ></textarea>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end gap-3">
                <button 
                  onClick={() => handleAction('تغییرات لغو شد.')}
                  className="py-2.5 px-6 rounded-xl text-sm font-bold transition-all bg-white border border-slate-200 text-slate-600 hover:text-amber-600 hover:bg-slate-50 hover:border-amber-200"
                >
                  انصراف
                </button>
                <button 
                  onClick={() => handleAction('تغییرات با موفقیت ذخیره شد.')}
                  className="py-2.5 px-6 rounded-xl text-sm font-bold transition-all bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  ذخیره تغییرات
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
