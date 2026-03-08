import { useApp } from '@/context/AppContext';
import { ChartPanel } from '@/components/ChartPanel';
import { ProgressBar } from '@/components/ProgressBar';
import { weeklyActivityData, topicMasteryData, monthlyProgressData } from '@/data/mockData';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';

const COLORS = ['hsl(265,90%,76%)', 'hsl(174,97%,43%)', 'hsl(33,100%,65%)', 'hsl(280,80%,65%)', 'hsl(0,72%,55%)', 'hsl(200,80%,60%)'];

export default function Analytics() {
  const { t } = useApp();

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">{t('Analytics', 'विश्लेषण')}</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        <ChartPanel title={t('Monthly Progress', 'मासिक प्रगति')}>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyProgressData}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Line type="monotone" dataKey="solved" stroke="hsl(265,90%,76%)" strokeWidth={3} dot={{ fill: 'hsl(265,90%,76%)', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel title={t('Weekly Activity', 'साप्ताहिक गतिविधि')}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyActivityData}>
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="hours" fill="hsl(174,97%,43%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <ChartPanel title={t('Topic Mastery', 'विषय महारत')}>
          <div className="space-y-4">
            {topicMasteryData.map(item => (
              <ProgressBar key={item.topic} value={item.mastery} label={item.topic} size="md" />
            ))}
          </div>
        </ChartPanel>

        <ChartPanel title={t('Problem Distribution', 'समस्या वितरण')}>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={topicMasteryData} dataKey="mastery" nameKey="topic" cx="50%" cy="50%" outerRadius={90} label={({ topic }) => topic}>
                {topicMasteryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartPanel>
      </div>
    </div>
  );
}
