import { BookOpen, LayoutDashboard, Stethoscope, User, Activity, FlaskConical } from 'lucide-react';

const navItems = [
  { id: 'library', icon: BookOpen, label: 'دانشنامه' },
  { id: 'dashboard', icon: LayoutDashboard, label: 'داشبورد' },
  { id: 'consultation', icon: Stethoscope, label: 'مشاوره با حکیم' },
  { id: 'lab', icon: FlaskConical, label: 'لابراتوار ابداع' },
  { id: 'tongue', icon: Activity, label: 'تشخیص زبان' },
  { id: 'profile', icon: User, label: 'پروفایل' },
];

export default function Sidebar({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (id: string) => void }) {
  return (
    <aside className="w-24 lg:w-64 h-full flex flex-col items-center lg:items-start py-8 px-4 bg-white text-slate-900 z-10 border-l border-slate-200">
      <div className="mb-12 px-2 lg:px-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-100">
          <BookOpen className="w-6 h-6" />
        </div>
        <h2 className="hidden lg:block font-bold text-lg leading-tight tracking-wide text-slate-900">ابن‌سینا<br/>پویا</h2>
      </div>

      <nav className="flex-1 w-full space-y-2">
        {navItems.map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                isActive 
                  ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-100' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-emerald-600 border border-transparent'
              }`}
              title={item.label}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span className="hidden lg:block text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
