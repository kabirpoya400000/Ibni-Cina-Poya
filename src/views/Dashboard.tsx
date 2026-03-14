import { Activity, BookOpen, Calendar, Users, ArrowLeft, FlaskConical } from 'lucide-react';

const stats = [
  { id: 1, label: 'گیاهان مطالعه شده', value: '۲۴', icon: BookOpen, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 2, label: 'مشاوره‌های فعال', value: '۲', icon: Users, color: 'text-amber-600', bg: 'bg-amber-50' },
  { id: 3, label: 'فرمول‌های تولید شده', value: '۱', icon: FlaskConical, color: 'text-red-600', bg: 'bg-red-50' },
  { id: 4, label: 'گزارش‌های سلامت', value: '۵', icon: Activity, color: 'text-slate-800', bg: 'bg-slate-100' },
];

const recentActivities = [
  { id: 1, title: 'تولید فرمول اسطوخودوس', date: '۲ ساعت پیش', type: 'lab' },
  { id: 2, title: 'مشاوره با حکیم ابن سینا', date: 'دیروز', type: 'consultation' },
  { id: 3, title: 'آپلود تصویر برای تشخیص زبان', date: '۳ روز پیش', type: 'tongue' },
  { id: 4, title: 'بروزرسانی پروفایل کاربری', date: 'هفته گذشته', type: 'profile' },
];

export default function Dashboard({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between bg-white border border-slate-200 shadow-sm p-6 rounded-2xl">
        <h1 className="text-2xl font-bold text-slate-900">خلاصه وضعیت (داشبورد)</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center gap-6">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-8">
          <h2 className="text-lg font-bold text-slate-900 mb-6">فعالیت‌های اخیر</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-900 mb-1">{activity.title}</p>
                  <p className="text-xs text-slate-500">{activity.date}</p>
                </div>
                <button 
                  onClick={() => setActiveTab(activity.type)}
                  className="text-slate-400 hover:text-emerald-600 p-2 rounded-lg hover:bg-emerald-50 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-8">
          <h2 className="text-lg font-bold text-slate-900 mb-6">دسترسی سریع</h2>
          <div className="space-y-4">
            <button 
              onClick={() => setActiveTab('consultation')}
              className="w-full py-3 px-4 rounded-xl text-sm font-bold transition-all bg-emerald-600 text-white hover:bg-emerald-700"
            >
              مشاوره با حکیم
            </button>
            <button 
              onClick={() => setActiveTab('lab')}
              className="w-full py-3 px-4 rounded-xl text-sm font-bold transition-all bg-amber-600 text-white hover:bg-amber-700"
            >
              ورود به لابراتوار ابداع
            </button>
            <button 
              onClick={() => setActiveTab('tongue')}
              className="w-full py-3 px-4 rounded-xl text-sm font-bold transition-all bg-white border border-slate-200 text-slate-700 hover:text-emerald-600 hover:bg-slate-50 hover:border-emerald-200"
            >
              شروع تشخیص زبان
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
