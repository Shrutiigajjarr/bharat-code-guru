import { useApp } from '@/context/AppContext';
import { StatCard } from '@/components/StatCard';
import { CourseCard } from '@/components/CourseCard';
import { ChartPanel } from '@/components/ChartPanel';
import { mockTracks, weeklyActivityData, mockProblems } from '@/data/mockData';
import { FiTarget, FiZap, FiTrendingUp, FiAward } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { currentUser, t } = useApp();
  const navigate = useNavigate();

  if (!currentUser) return null;

  const recentSolved = mockProblems.filter(p => p.status === 'solved').slice(0, 3);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          {t(`Welcome back, ${currentUser.name}!`, `वापस स्वागत है, ${currentUser.nameHi}!`)}
        </h1>
        <p className="text-muted-foreground mt-1">{t("Let's continue your coding journey", 'चलिए आपकी कोडिंग यात्रा जारी रखते हैं')}</p>
      </div>

      {currentUser.role === 'student' && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={<FiTarget />} label={t('Problems Solved', 'हल की गई समस्याएं')} value={currentUser.problemsSolved} change="+12" />
            <StatCard icon={<FiZap />} label={t('Day Streak', 'दिन स्ट्रीक')} value={currentUser.streak} change={`+${currentUser.streak}`} />
            <StatCard icon={<FiTrendingUp />} label={t('Total Points', 'कुल अंक')} value={currentUser.points.toLocaleString()} change="+350" />
            <StatCard icon={<FiAward />} label={t('Rank', 'रैंक')} value="#4" />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ChartPanel title={t('Weekly Activity', 'साप्ताहिक गतिविधि')}>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={weeklyActivityData}>
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="problems" fill="hsl(25, 100%, 55%)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartPanel>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-foreground">{t('Recent Activity', 'हाल की गतिविधि')}</h3>
              {recentSolved.map(p => (
                <div key={p.id} className="glass-panel p-3 flex items-center gap-3">
                  <span className="text-success">✓</span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t(p.title, p.titleHi)}</p>
                    <p className="text-xs text-muted-foreground">{p.difficulty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">{t('Recommended Tracks', 'अनुशंसित ट्रैक')}</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockTracks.map(track => (
                <CourseCard key={track.id} track={track} onClick={() => navigate('/learning-paths')} />
              ))}
            </div>
          </div>
        </>
      )}

      {currentUser.role === 'mentor' && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={<FiUsers />} label={t('Active Students', 'सक्रिय छात्र')} value="24" />
          <StatCard icon={<FiTarget />} label={t('Pending Requests', 'लंबित अनुरोध')} value="3" change="+2" />
          <StatCard icon={<FiTrendingUp />} label={t('Sessions This Week', 'इस सप्ताह के सत्र')} value="8" />
          <StatCard icon={<FiAward />} label={t('Rating', 'रेटिंग')} value="4.8 ⭐" />
        </div>
      )}

      {currentUser.role === 'admin' && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={<FiUsers />} label={t('Total Users', 'कुल उपयोगकर्ता')} value="1,547" change="+89" />
          <StatCard icon={<FiTarget />} label={t('Active Today', 'आज सक्रिय')} value="234" />
          <StatCard icon={<FiTrendingUp />} label={t('Problems Added', 'जोड़ी गई समस्याएं')} value="420" change="+15" />
          <StatCard icon={<FiAward />} label={t('Revenue', 'राजस्व')} value="₹2.4L" change="+12%" />
        </div>
      )}
    </div>
  );
}
