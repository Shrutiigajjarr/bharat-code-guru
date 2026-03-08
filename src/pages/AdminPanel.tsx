import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { StatCard } from '@/components/StatCard';
import { ChartPanel } from '@/components/ChartPanel';
import { mockStudents, mockMentors, monthlyProgressData } from '@/data/mockData';
import { FiUsers, FiTrendingUp, FiDownload, FiDollarSign, FiUserCheck } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock paid/free status for students
const paidStudentIds = new Set(['s1', 's2', 's4', 's7', 's9']);
const paidStudents = mockStudents.filter(s => paidStudentIds.has(s.id));
const freeStudents = mockStudents.filter(s => !paidStudentIds.has(s.id));

// Mock marketing data
const marketingData = [
  { platform: 'YouTube', users: 320, color: 'hsl(0, 72%, 55%)' },
  { platform: 'Instagram', users: 245, color: 'hsl(265, 90%, 76%)' },
  { platform: 'LinkedIn', users: 180, color: 'hsl(210, 80%, 55%)' },
  { platform: 'Twitter/X', users: 130, color: 'hsl(174, 97%, 43%)' },
  { platform: 'Google Ads', users: 210, color: 'hsl(33, 100%, 65%)' },
  { platform: 'Referral', users: 95, color: 'hsl(140, 60%, 50%)' },
];

const platformGrowthData = [
  { month: 'Sep', users: 180, revenue: 4200 },
  { month: 'Oct', users: 250, revenue: 5800 },
  { month: 'Nov', users: 340, revenue: 7200 },
  { month: 'Dec', users: 420, revenue: 9100 },
  { month: 'Jan', users: 510, revenue: 11500 },
  { month: 'Feb', users: 620, revenue: 14200 },
  { month: 'Mar', users: 750, revenue: 17800 },
];

function generateCSVReport() {
  const header = 'Platform,Users Acquired,Percentage\n';
  const totalUsers = marketingData.reduce((sum, d) => sum + d.users, 0);
  const rows = marketingData
    .sort((a, b) => b.users - a.users)
    .map(d => `${d.platform},${d.users},${((d.users / totalUsers) * 100).toFixed(1)}%`)
    .join('\n');

  const summary = `\n\nSummary\nTotal Users,${totalUsers}\nPaid Students,${paidStudents.length}\nFree Users,${freeStudents.length}\nTotal Mentors,${mockMentors.length}\nReport Date,${new Date().toLocaleDateString()}`;

  const blob = new Blob([header + rows + summary], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `bcg-marketing-report-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function StudentRow({ s, isPaid }: { s: typeof mockStudents[0]; isPaid: boolean }) {
  const { t } = useApp();
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
      <span className="text-xl">{s.avatar}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{s.name}</p>
        <p className="text-xs text-muted-foreground">{s.email}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-xs font-semibold text-primary">{s.points} pts</p>
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${isPaid ? 'bg-success/15 text-success' : 'bg-muted text-muted-foreground'}`}>
          {isPaid ? t('Paid', 'भुगतान') : t('Free', 'मुफ्त')}
        </span>
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const { t } = useApp();
  const [studentTab, setStudentTab] = useState('paid');
  const totalMarketing = marketingData.reduce((s, d) => s + d.users, 0);
  const topPlatform = marketingData.reduce((a, b) => a.users > b.users ? a : b);

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">{t('Admin Panel', 'व्यवस्थापक पैनल')}</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<FiUsers />} label={t('Total Students', 'कुल छात्र')} value={mockStudents.length} />
        <StatCard icon={<FiDollarSign />} label={t('Paid Students', 'भुगतान छात्र')} value={paidStudents.length} />
        <StatCard icon={<FiUserCheck />} label={t('Free Users', 'मुफ्त उपयोगकर्ता')} value={freeStudents.length} />
        <StatCard icon={<FiUsers />} label={t('Mentors', 'मेंटर')} value={mockMentors.length} />
      </div>

      {/* Students Section */}
      <div className="glass-panel-elevated p-6">
        <h3 className="font-bold text-foreground mb-4">{t('Students', 'छात्र')}</h3>
        <Tabs value={studentTab} onValueChange={setStudentTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="paid">{t('Paid', 'भुगतान')} ({paidStudents.length})</TabsTrigger>
            <TabsTrigger value="free">{t('Free', 'मुफ्त')} ({freeStudents.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="paid">
            <div className="space-y-1 max-h-72 overflow-y-auto">
              {paidStudents.map(s => <StudentRow key={s.id} s={s} isPaid />)}
            </div>
          </TabsContent>
          <TabsContent value="free">
            <div className="space-y-1 max-h-72 overflow-y-auto">
              {freeStudents.map(s => <StudentRow key={s.id} s={s} isPaid={false} />)}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Mentors Section */}
      <div className="glass-panel-elevated p-6">
        <h3 className="font-bold text-foreground mb-4">{t('Mentors', 'मेंटर')}</h3>
        <div className="space-y-1 max-h-72 overflow-y-auto">
          {mockMentors.map(m => (
            <div key={m.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <span className="text-xl">{m.avatar}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.email}</p>
              </div>
              <span className="text-xs text-muted-foreground">{t('Joined', 'शामिल')} {m.joinDate}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Growth */}
      <ChartPanel title={t('Platform Growth', 'प्लेटफ़ॉर्म वृद्धि')}>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={platformGrowthData}>
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', background: 'hsl(240,18%,18%)', color: 'hsl(240,10%,92%)' }} />
            <Line type="monotone" dataKey="users" stroke="hsl(265,90%,76%)" strokeWidth={3} name={t('Users', 'उपयोगकर्ता')} />
            <Line type="monotone" dataKey="revenue" stroke="hsl(174,97%,43%)" strokeWidth={3} name={t('Revenue (₹)', 'राजस्व (₹)')} />
          </LineChart>
        </ResponsiveContainer>
      </ChartPanel>

      {/* Marketing Report */}
      <div className="glass-panel-elevated p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-foreground">{t('Marketing Report', 'मार्केटिंग रिपोर्ट')}</h3>
          <button
            onClick={generateCSVReport}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <FiDownload className="w-4 h-4" />
            {t('Download Report', 'रिपोर्ट डाउनलोड करें')}
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Bar chart */}
          <div>
            <p className="text-sm text-muted-foreground mb-3">{t('Users by Platform', 'प्लेटफ़ॉर्म द्वारा उपयोगकर्ता')}</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={marketingData}>
                <XAxis dataKey="platform" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', background: 'hsl(240,18%,18%)', color: 'hsl(240,10%,92%)' }} />
                <Bar dataKey="users" radius={[6, 6, 0, 0]}>
                  {marketingData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie chart */}
          <div>
            <p className="text-sm text-muted-foreground mb-3">{t('Distribution', 'वितरण')}</p>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={marketingData} dataKey="users" nameKey="platform" cx="50%" cy="50%" outerRadius={80} label={({ platform, percent }) => `${platform} ${(percent * 100).toFixed(0)}%`}>
                  {marketingData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', background: 'hsl(240,18%,18%)', color: 'hsl(240,10%,92%)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-4 p-3 rounded-lg bg-muted/50">
          <p className="text-sm text-foreground">
            <FiTrendingUp className="inline w-4 h-4 mr-1 text-success" />
            {t(
              `Top performing platform: ${topPlatform.platform} with ${topPlatform.users} users (${((topPlatform.users / totalMarketing) * 100).toFixed(1)}%)`,
              `शीर्ष प्रदर्शन करने वाला प्लेटफ़ॉर्म: ${topPlatform.platform} - ${topPlatform.users} उपयोगकर्ता (${((topPlatform.users / totalMarketing) * 100).toFixed(1)}%)`
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
