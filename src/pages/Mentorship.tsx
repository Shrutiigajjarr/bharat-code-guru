import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { mockMentors, mockMentorRequests, MentorRequest } from '@/data/mockData';
import { FiSend, FiCheck, FiClock, FiCheckCircle, FiCalendar, FiStar, FiUser, FiVideo, FiPlay, FiXCircle } from 'react-icons/fi';

const mentorSpecialties: Record<string, { en: string; hi: string; rating: number; sessions: number; specialties: string[] }> = {
  m1: { en: 'Data Structures & Algorithms', hi: 'डेटा स्ट्रक्चर और एल्गोरिदम', rating: 4.9, sessions: 320, specialties: ['Arrays', 'Trees', 'Graphs'] },
  m2: { en: 'System Design & Architecture', hi: 'सिस्टम डिज़ाइन और आर्किटेक्चर', rating: 4.8, sessions: 280, specialties: ['Microservices', 'Scaling', 'Databases'] },
  m3: { en: 'Web Development & React', hi: 'वेब डेवलपमेंट और रिएक्ट', rating: 4.7, sessions: 195, specialties: ['React', 'Node.js', 'TypeScript'] },
  m4: { en: 'Machine Learning & AI', hi: 'मशीन लर्निंग और AI', rating: 4.9, sessions: 240, specialties: ['Python', 'TensorFlow', 'NLP'] },
  m5: { en: 'Competitive Programming', hi: 'प्रतिस्पर्धी प्रोग्रामिंग', rating: 4.6, sessions: 150, specialties: ['DP', 'Greedy', 'Number Theory'] },
};

const upcomingSessions = [
  { id: 'us1', mentorId: 'm1', mentorName: 'Dr. Rajesh Khanna', mentorNameHi: 'डॉ. राजेश खन्ना', studentName: 'Aarav Sharma', studentNameHi: 'आरव शर्मा', topic: 'Graph Traversal - BFS & DFS', topicHi: 'ग्राफ़ ट्रैवर्सल - BFS और DFS', date: '2026-03-10', time: '10:00 AM', avatar: '👨‍🏫' },
  { id: 'us2', mentorId: 'm2', mentorName: 'Prof. Sunita Rao', mentorNameHi: 'प्रो. सुनीता राव', studentName: 'Priya Patel', studentNameHi: 'प्रिया पटेल', topic: 'System Design: URL Shortener', topicHi: 'सिस्टम डिज़ाइन: URL शॉर्टनर', date: '2026-03-11', time: '2:00 PM', avatar: '👩‍🏫' },
  { id: 'us3', mentorId: 'm3', mentorName: 'Amit Deshmukh', mentorNameHi: 'अमित देशमुख', studentName: 'Rohan Gupta', studentNameHi: 'रोहन गुप्ता', topic: 'React Performance Optimization', topicHi: 'रिएक्ट परफॉर्मेंस ऑप्टिमाइज़ेशन', date: '2026-03-12', time: '11:30 AM', avatar: '🧑‍🏫' },
  { id: 'us4', mentorId: 'm4', mentorName: 'Neha Kulkarni', mentorNameHi: 'नेहा कुलकर्णी', studentName: 'Ananya Singh', studentNameHi: 'अनन्या सिंह', topic: 'Intro to Neural Networks', topicHi: 'न्यूरल नेटवर्क का परिचय', date: '2026-03-14', time: '4:00 PM', avatar: '👩‍🏫' },
];

export default function Mentorship() {
  const { currentUser, t } = useApp();
  const [requests, setRequests] = useState<MentorRequest[]>(mockMentorRequests);
  const [newTopic, setNewTopic] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mentor: create session state
  const [sessionTopic, setSessionTopic] = useState('');
  const [sessionDate, setSessionDate] = useState('');
  const [sessionTime, setSessionTime] = useState('');
  const [sessionDesc, setSessionDesc] = useState('');
  const [createdSessions, setCreatedSessions] = useState<typeof upcomingSessions>([]);
  const [sessionSuccess, setSessionSuccess] = useState(false);

  const handleSubmit = () => {
    if (!newTopic || !newMessage || !selectedMentor) return;
    const req: MentorRequest = {
      id: `mr${Date.now()}`,
      studentId: currentUser?.id || 's1',
      studentName: currentUser?.name || 'Student',
      mentorId: selectedMentor,
      topic: newTopic,
      message: newMessage,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    };
    setRequests(prev => [req, ...prev]);
    setNewTopic('');
    setNewMessage('');
    setSelectedMentor(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleAccept = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'accepted' } : r));
  };

  const handleCreateSession = () => {
    if (!sessionTopic || !sessionDate || !sessionTime) return;
    const newSession = {
      id: `us${Date.now()}`,
      mentorId: currentUser?.id || 'm1',
      mentorName: currentUser?.name || 'Mentor',
      mentorNameHi: currentUser?.nameHi || 'मेंटर',
      studentName: 'Open Session',
      studentNameHi: 'ओपन सत्र',
      topic: sessionTopic,
      topicHi: sessionTopic,
      date: sessionDate,
      time: sessionTime,
      avatar: currentUser?.avatar || '👨‍🏫',
    };
    setCreatedSessions(prev => [newSession, ...prev]);
    setSessionTopic('');
    setSessionDate('');
    setSessionTime('');
    setSessionDesc('');
    setSessionSuccess(true);
    setTimeout(() => setSessionSuccess(false), 3000);
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const acceptedRequests = requests.filter(r => r.status === 'accepted');
  const allMentorSessions = [...createdSessions, ...upcomingSessions.filter(s => s.mentorId === currentUser?.id)];

  const statusIcons = { pending: <FiClock className="text-warning" />, accepted: <FiCheck className="text-secondary" />, completed: <FiCheckCircle className="text-success" /> };
  const statusLabels = { pending: t('Pending', 'लंबित'), accepted: t('Accepted', 'स्वीकृत'), completed: t('Completed', 'पूर्ण') };

  const isMentor = currentUser?.role === 'mentor';

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">{t('Mentorship', 'मेंटरशिप')}</h1>

      {/* ========== MENTOR VIEW ========== */}
      {isMentor && (
        <>
          {/* Create Session */}
          <div className="glass-panel-elevated p-6">
            <div className="flex items-center gap-3 mb-4">
              <FiVideo className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-foreground">{t('Create a Session', 'एक सत्र बनाएं')}</h3>
            </div>
            {sessionSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-success/10 text-success text-sm font-medium animate-fade-in">
                ✅ {t('Session created successfully!', 'सत्र सफलतापूर्वक बनाया गया!')}
              </div>
            )}
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <input value={sessionTopic} onChange={e => setSessionTopic(e.target.value)}
                placeholder={t('Session Topic (e.g., Binary Trees Deep Dive)', 'सत्र विषय (जैसे, बाइनरी ट्रीज़ डीप डाइव)')}
                className="w-full px-4 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm" />
              <textarea value={sessionDesc} onChange={e => setSessionDesc(e.target.value)}
                placeholder={t('Session description (optional)...', 'सत्र विवरण (वैकल्पिक)...')} rows={1}
                className="w-full px-4 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm resize-none" />
            </div>
            <div className="grid sm:grid-cols-3 gap-3 mb-3">
              <input type="date" value={sessionDate} onChange={e => setSessionDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm" />
              <input type="time" value={sessionTime} onChange={e => setSessionTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm" />
              <button onClick={handleCreateSession} disabled={!sessionTopic || !sessionDate || !sessionTime}
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm text-primary-foreground gradient-primary hover:opacity-90 transition-opacity disabled:opacity-50">
                <FiPlay className="w-4 h-4" /> {t('Create Session', 'सत्र बनाएं')}
              </button>
            </div>
          </div>

          {/* Mentor: Pending Requests */}
          <div className="glass-panel-elevated p-6">
            <div className="flex items-center gap-3 mb-4">
              <FiClock className="w-5 h-5 text-warning" />
              <h3 className="font-bold text-foreground">{t('Pending Requests', 'लंबित अनुरोध')}</h3>
              {pendingRequests.length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-warning/15 text-warning">{pendingRequests.length}</span>
              )}
            </div>
            {pendingRequests.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t('No pending requests right now.', 'अभी कोई लंबित अनुरोध नहीं है।')}</p>
            ) : (
              <div className="space-y-3">
                {pendingRequests.map(r => (
                  <div key={r.id} className="glass-panel p-4 flex items-start gap-4 animate-fade-in border-l-4 border-warning/50">
                    <div className="mt-1"><FiClock className="text-warning" /></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-foreground">{r.topic}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-warning/10 text-warning">{statusLabels.pending}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{r.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{r.studentName} • {r.date}</p>
                    </div>
                    <button onClick={() => handleAccept(r.id)} className="px-4 py-2 rounded-lg text-sm font-medium gradient-secondary text-secondary-foreground hover:opacity-90 transition-opacity">
                      {t('Accept', 'स्वीकार करें')}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mentor: Upcoming Sessions to Take */}
          <div className="glass-panel-elevated p-6">
            <div className="flex items-center gap-3 mb-4">
              <FiCalendar className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-foreground">{t('Your Upcoming Sessions', 'आपके आगामी सत्र')}</h3>
            </div>
            {allMentorSessions.length === 0 && acceptedRequests.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t('No upcoming sessions scheduled.', 'कोई आगामी सत्र निर्धारित नहीं है।')}</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {allMentorSessions.map(session => (
                  <div key={session.id} className="glass-panel p-4 hover-lift border-l-4 border-primary/60">
                    <p className="text-sm font-semibold text-foreground mb-1">{session.topic}</p>
                    <p className="text-xs text-muted-foreground mb-2">{t('Student:', 'छात्र:')} {t(session.studentName, session.studentNameHi)}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <FiCalendar className="w-3 h-3" /> <span>{session.date}</span>
                      <span>•</span>
                      <FiClock className="w-3 h-3" /> <span>{session.time}</span>
                    </div>
                  </div>
                ))}
                {acceptedRequests.map(r => (
                  <div key={r.id} className="glass-panel p-4 hover-lift border-l-4 border-secondary/60">
                    <p className="text-sm font-semibold text-foreground mb-1">{r.topic}</p>
                    <p className="text-xs text-muted-foreground mb-2">{t('Student:', 'छात्र:')} {r.studentName}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <FiCheckCircle className="w-3 h-3 text-secondary" /> <span>{t('Accepted — schedule pending', 'स्वीकृत — शेड्यूल लंबित')}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* ========== STUDENT VIEW ========== */}
      {!isMentor && (
        <>
          {/* Upcoming Sessions for Students */}
          <div className="glass-panel-elevated p-6">
            <div className="flex items-center gap-3 mb-4">
              <FiCalendar className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-foreground">{t('Upcoming Mentor Sessions', 'आगामी मेंटर सत्र')}</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {upcomingSessions.map(session => (
                <div key={session.id} className="glass-panel p-4 hover-lift border-l-4 border-primary/60">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{session.avatar}</span>
                    <p className="text-sm font-semibold text-foreground">{t(session.mentorName, session.mentorNameHi)}</p>
                  </div>
                  <p className="text-sm font-medium text-foreground mb-2">{t(session.topic, session.topicHi)}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <FiCalendar className="w-3 h-3" /> <span>{session.date}</span>
                    <span>•</span>
                    <FiClock className="w-3 h-3" /> <span>{session.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Select Mentor & Request */}
          <div className="glass-panel-elevated p-6">
            <h3 className="font-bold text-foreground mb-4">{t('Choose a Mentor & Request Help', 'एक मेंटर चुनें और सहायता का अनुरोध करें')}</h3>
            {showSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-success/10 text-success text-sm font-medium animate-fade-in">
                ✅ {t('Request submitted! Your mentor will respond soon.', 'अनुरोध सबमिट किया गया! आपका मेंटर जल्द जवाब देगा।')}
              </div>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
              {mockMentors.map(m => {
                const info = mentorSpecialties[m.id];
                const isSelected = selectedMentor === m.id;
                return (
                  <button key={m.id} onClick={() => setSelectedMentor(isSelected ? null : m.id)}
                    className={`glass-panel p-4 text-left transition-all hover-lift ${isSelected ? 'ring-2 ring-primary bg-primary/5' : ''}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{m.avatar}</span>
                      <div>
                        <p className="font-semibold text-foreground">{t(m.name, m.nameHi)}</p>
                        <p className="text-xs text-muted-foreground">{t(info.en, info.hi)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                      <span className="flex items-center gap-1"><FiStar className="text-warning w-3 h-3" /> {info.rating}</span>
                      <span className="flex items-center gap-1"><FiUser className="w-3 h-3" /> {info.sessions} {t('sessions', 'सत्र')}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {info.specialties.map(s => (
                        <span key={s} className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">{s}</span>
                      ))}
                    </div>
                    {isSelected && (
                      <div className="mt-2 text-xs font-medium text-primary flex items-center gap-1">
                        <FiCheckCircle className="w-3 h-3" /> {t('Selected', 'चयनित')}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="space-y-3">
              <input value={newTopic} onChange={e => setNewTopic(e.target.value)}
                placeholder={t('Topic (e.g., Dynamic Programming)', 'विषय (जैसे, डायनामिक प्रोग्रामिंग)')}
                className="w-full px-4 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm" />
              <textarea value={newMessage} onChange={e => setNewMessage(e.target.value)}
                placeholder={t('Describe your question...', 'अपना प्रश्न बताएं...')} rows={3}
                className="w-full px-4 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm resize-none" />
              <button onClick={handleSubmit} disabled={!selectedMentor || !newTopic || !newMessage}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm text-primary-foreground gradient-primary hover:opacity-90 transition-opacity disabled:opacity-50">
                <FiSend className="w-4 h-4" /> {t('Submit Request', 'अनुरोध भेजें')}
              </button>
              {!selectedMentor && (
                <p className="text-xs text-muted-foreground">{t('↑ Please select a mentor above first', '↑ कृपया पहले ऊपर एक मेंटर चुनें')}</p>
              )}
            </div>
          </div>

          {/* Student Requests */}
          <div>
            <h3 className="font-bold text-foreground mb-4">{t('Your Requests', 'आपके अनुरोध')}</h3>
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
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
