import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { mockMentors, mockMentorRequests, MentorRequest } from '@/data/mockData';
import { FiSend, FiCheck, FiClock, FiCheckCircle } from 'react-icons/fi';

export default function Mentorship() {
  const { currentUser, t } = useApp();
  const [requests, setRequests] = useState<MentorRequest[]>(mockMentorRequests);
  const [newTopic, setNewTopic] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    if (!newTopic || !newMessage) return;
    const req: MentorRequest = {
      id: `mr${Date.now()}`,
      studentId: currentUser?.id || 's1',
      studentName: currentUser?.name || 'Student',
      mentorId: mockMentors[Math.floor(Math.random() * mockMentors.length)].id,
      topic: newTopic,
      message: newMessage,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    };
    setRequests(prev => [req, ...prev]);
    setNewTopic('');
    setNewMessage('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleAccept = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'accepted' } : r));
  };

  const statusIcons = { pending: <FiClock className="text-warning" />, accepted: <FiCheck className="text-secondary" />, completed: <FiCheckCircle className="text-success" /> };
  const statusLabels = { pending: t('Pending', 'लंबित'), accepted: t('Accepted', 'स्वीकृत'), completed: t('Completed', 'पूर्ण') };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">{t('Mentorship', 'मेंटरशिप')}</h1>

      {currentUser?.role === 'student' && (
        <div className="glass-panel-elevated p-6">
          <h3 className="font-bold text-foreground mb-4">{t('Request Mentor Help', 'मेंटर सहायता का अनुरोध करें')}</h3>
          {showSuccess && (
            <div className="mb-4 p-3 rounded-xl bg-success/10 text-success text-sm font-medium animate-fade-in">
              ✅ {t('Request submitted! A mentor will respond soon.', 'अनुरोध सबमिट किया गया! एक मेंटर जल्द जवाब देगा।')}
            </div>
          )}
          <div className="space-y-3">
            <input value={newTopic} onChange={e => setNewTopic(e.target.value)} placeholder={t('Topic (e.g., Dynamic Programming)', 'विषय (जैसे, डायनामिक प्रोग्रामिंग)')}
              className="w-full px-4 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm" />
            <textarea value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder={t('Describe your question...', 'अपना प्रश्न बताएं...')} rows={3}
              className="w-full px-4 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm resize-none" />
            <button onClick={handleSubmit} className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm text-primary-foreground gradient-primary hover:opacity-90 transition-opacity">
              <FiSend className="w-4 h-4" /> {t('Submit Request', 'अनुरोध भेजें')}
            </button>
          </div>
        </div>
      )}

      <div>
        <h3 className="font-bold text-foreground mb-4">
          {currentUser?.role === 'mentor' ? t('Student Requests', 'छात्र अनुरोध') : t('Your Requests', 'आपके अनुरोध')}
        </h3>
        <div className="space-y-3">
          {requests.map(r => (
            <div key={r.id} className="glass-panel p-4 flex items-start gap-4 animate-fade-in">
              <div className="mt-1">{statusIcons[r.status]}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-foreground">{r.topic}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${r.status === 'pending' ? 'bg-warning/10 text-warning' : r.status === 'accepted' ? 'bg-secondary/10 text-secondary' : 'bg-success/10 text-success'}`}>
                    {statusLabels[r.status]}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{r.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{r.studentName} • {r.date}</p>
              </div>
              {currentUser?.role === 'mentor' && r.status === 'pending' && (
                <button onClick={() => handleAccept(r.id)} className="px-4 py-2 rounded-lg text-sm font-medium gradient-secondary text-secondary-foreground hover:opacity-90 transition-opacity">
                  {t('Accept', 'स्वीकार करें')}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {currentUser?.role !== 'mentor' && (
        <div>
          <h3 className="font-bold text-foreground mb-4">{t('Available Mentors', 'उपलब्ध मेंटर')}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockMentors.map(m => (
              <div key={m.id} className="glass-panel p-4 text-center hover-lift">
                <span className="text-4xl block mb-2">{m.avatar}</span>
                <p className="font-semibold text-foreground">{t(m.name, m.nameHi)}</p>
                <p className="text-xs text-muted-foreground mt-1">{t('Expert Mentor', 'विशेषज्ञ मेंटर')}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
