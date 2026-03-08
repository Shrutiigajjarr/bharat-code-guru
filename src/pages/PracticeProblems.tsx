import { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { mockProblems } from '@/data/mockData';
import { ProblemCard } from '@/components/ProblemCard';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function PracticeProblems() {
  const { t } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [diffFilter, setDiffFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filtered = useMemo(() => {
    return mockProblems.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchDiff = diffFilter === 'All' || p.difficulty === diffFilter;
      const matchStatus = statusFilter === 'All' || p.status === statusFilter;
      return matchSearch && matchDiff && matchStatus;
    });
  }, [search, diffFilter, statusFilter]);

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">{t('Practice Problems', 'अभ्यास समस्याएं')}</h1>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t('Search problems or tags...', 'समस्याएं या टैग खोजें...')}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
          />
        </div>
        <select value={diffFilter} onChange={e => setDiffFilter(e.target.value)} className="px-4 py-2.5 rounded-xl bg-card border border-border text-foreground text-sm">
          <option value="All">{t('All Difficulty', 'सभी कठिनाई')}</option>
          <option value="Easy">{t('Easy', 'आसान')}</option>
          <option value="Medium">{t('Medium', 'मध्यम')}</option>
          <option value="Hard">{t('Hard', 'कठिन')}</option>
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-4 py-2.5 rounded-xl bg-card border border-border text-foreground text-sm">
          <option value="All">{t('All Status', 'सभी स्थिति')}</option>
          <option value="solved">{t('Solved', 'हल')}</option>
          <option value="attempted">{t('Attempted', 'प्रयास')}</option>
          <option value="unsolved">{t('Unsolved', 'अनसुलझा')}</option>
        </select>
      </div>
      <div className="space-y-2">
        {filtered.map(p => (
          <ProblemCard key={p.id} problem={p} onClick={() => navigate(`/playground?problem=${p.id}`)} />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">{t('No problems found', 'कोई समस्या नहीं मिली')}</div>
        )}
      </div>
    </div>
  );
}
