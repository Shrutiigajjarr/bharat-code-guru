import { useApp } from '@/context/AppContext';
import { StatCard } from '@/components/StatCard';
import { ChartPanel } from '@/components/ChartPanel';
import { mockStudents, mockMentors, mockTracks, mockProblems, monthlyProgressData } from '@/data/mockData';
import { FiUsers, FiBook, FiCode, FiTrendingUp } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminPanel() {
  const { t } = useApp();

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">{t('Admin Panel', 'व्यवस्थापक पैनल')}</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<FiUsers />} label={t('Students', 'छात्र')} value={mockStudents.length} />
        <StatCard icon={<FiUsers />} label={t('Mentors', 'मेंटर')} value={mockMentors.length} />
        <StatCard icon={<FiBook />} label={t('Tracks', 'ट्रैक')} value={mockTracks.length} />
        <StatCard icon={<FiCode />} label={t('Problems', 'समस्याएं')} value={mockProblems.length} />
      </div>

      <ChartPanel title={t('Platform Growth', 'प्लेटफ़ॉर्म वृद्धि')}>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlyProgressData}>
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
            <Line type="monotone" dataKey="solved" stroke="hsl(25,100%,55%)" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </ChartPanel>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-panel-elevated p-6">
          <h3 className="font-bold text-foreground mb-4">{t('Students', 'छात्र')}</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {mockStudents.map(s => (
              <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                <span className="text-xl">{s.avatar}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.email}</p>
                </div>
                <span className="text-xs font-medium text-primary">{s.points} pts</span>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-panel-elevated p-6">
          <h3 className="font-bold text-foreground mb-4">{t('Mentors', 'मेंटर')}</h3>
          <div className="space-y-2">
            {mockMentors.map(m => (
              <div key={m.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                <span className="text-xl">{m.avatar}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
