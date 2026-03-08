import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Role } from '@/data/mockData';
import { FiUser, FiUsers, FiShield } from 'react-icons/fi';

export default function Login() {
  const { login, t } = useApp();
  const [selectedRole, setSelectedRole] = useState<Role>('student');

  const roles = [
    { role: 'student' as Role, icon: <FiUser />, label: t('Student', 'छात्र'), labelHi: 'छात्र', desc: t('Learn & practice coding', 'कोडिंग सीखें और अभ्यास करें') },
    { role: 'mentor' as Role, icon: <FiUsers />, label: t('Mentor', 'मेंटर'), labelHi: 'मेंटर', desc: t('Guide & help students', 'छात्रों की मदद करें') },
    { role: 'admin' as Role, icon: <FiShield />, label: t('Admin', 'व्यवस्थापक'), labelHi: 'व्यवस्थापक', desc: t('Manage platform', 'प्लेटफ़ॉर्म प्रबंधित करें') },
  ];

  const handleLogin = () => login('', selectedRole);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4" style={{ background: 'linear-gradient(135deg, hsl(30,30%,98%) 0%, hsl(25,50%,95%) 50%, hsl(214,40%,95%) 100%)' }}>
      <div className="glass-panel-elevated p-8 md:p-12 w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <span className="text-5xl block mb-3">🇮🇳</span>
          <h1 className="text-2xl font-bold gradient-text">Bharat Code Guru</h1>
          <p className="text-muted-foreground mt-2 text-sm">{t('India\'s Premier Coding Platform', 'भारत का प्रमुख कोडिंग प्लेटफ़ॉर्म')}</p>
        </div>
        <div className="space-y-3 mb-6">
          {roles.map(r => (
            <button
              key={r.role}
              onClick={() => setSelectedRole(r.role)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                selectedRole === r.role
                  ? 'border-primary bg-accent shadow-lg'
                  : 'border-border hover:border-primary/30'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedRole === r.role ? 'gradient-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                {r.icon}
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">{r.label}</p>
                <p className="text-xs text-muted-foreground">{r.desc}</p>
              </div>
            </button>
          ))}
        </div>
        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-xl font-semibold text-primary-foreground gradient-primary hover:opacity-90 transition-opacity shadow-lg"
        >
          {t('Login as', 'के रूप में लॉगिन करें')} {roles.find(r => r.role === selectedRole)?.label}
        </button>
        <p className="text-xs text-muted-foreground text-center mt-4">{t('Demo mode — no password required', 'डेमो मोड — पासवर्ड की आवश्यकता नहीं')}</p>
      </div>
    </div>
  );
}
