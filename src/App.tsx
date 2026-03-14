import { useState } from 'react';
import Sidebar from './components/Sidebar';
import DetailPanel from './components/DetailPanel';
import Library from './views/Library';
import Dashboard from './views/Dashboard';
import HakimConsultation from './views/HakimConsultation';
import InnovationLab from './views/InnovationLab';
import TongueDiagnosis from './views/TongueDiagnosis';
import Profile from './views/Profile';
import { Herb } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('library');
  const [selectedHerb, setSelectedHerb] = useState<Herb | null>(null);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans selection:bg-emerald-600/20">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto p-8 lg:p-12">
        {activeTab === 'library' && (
          <Library onSelectHerb={setSelectedHerb} selectedHerb={selectedHerb} />
        )}
        {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
        {activeTab === 'consultation' && <HakimConsultation />}
        {activeTab === 'lab' && <InnovationLab />}
        {activeTab === 'tongue' && <TongueDiagnosis setActiveTab={setActiveTab} />}
        {activeTab === 'profile' && <Profile />}
      </main>

      <DetailPanel herb={selectedHerb} onClose={() => setSelectedHerb(null)} />
    </div>
  );
}
