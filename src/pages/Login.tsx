import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Role } from '@/data/mockData';
import { FiUser, FiUsers, FiShield, FiEye, FiEyeOff } from 'react-icons/fi';

const DEMO_PASSWORD = 'demo1234';

export default function Login() {
  const { login, t } = useApp();
  const [selectedRole, setSelectedRole] = useState<Role>('student');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const roles = [
    { role: 'student' as Role, icon: <FiUser />, label: t('Student', 'छात्र'), desc: t('Learn & practice coding', 'कोडिंग सीखें और अभ्यास करें') },
    { role: 'mentor' as Role, icon: <FiUsers />, label: t('Mentor', 'मेंटर'), desc: t('Guide & help students', 'छात्रों की मदद करें') },
    { role: 'admin' as Role, icon: <FiShield />, label: t('Admin', 'व्यवस्थापक'), desc: t('Manage platform', 'प्लेटफ़ॉर्म प्रबंधित करें') },
  ];

  const handleLogin = () => {
    if (password !== DEMO_PASSWORD) {
      setError(t('Incorrect password. Use: demo1234', 'गलत पासवर्ड। उपयोग करें: demo1234'));
      return;
    }
    setError('');
    login('', selectedRole);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4" style={{ background: 'linear-gradient(135deg, hsl(240,20%,12%) 0%, hsl(240,20%,18%) 50%, hsl(265,30%,18%) 100%)' }}>
      <div className="glass-panel-elevated p-8 md:p-12 w-full max-w-md animate-fade-in">
          <div className="flex items-center justify-center mb-3">
            <div style={{ width: 38, height: 38, borderRadius: 10, fontSize: 20, background: 'linear-gradient(135deg, rgb(187, 134, 252), rgba(3, 218, 198, 0.333))', border: '1px solid rgba(187, 134, 252, 0.267)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'rgba(187, 134, 252, 0.267) 0px 0px 16px' }}>
              🇮🇳
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Bharat Code Guru</h1>
          <p className="text-muted-foreground mt-2 text-sm">{t("India's Premier Coding Platform", 'भारत का प्रमुख कोडिंग प्लेटफ़ॉर्म')}</p>
        </div>

        <div className="space-y-3 mb-5">
          {roles.map(r => (
            <button
              key={r.role}
              onClick={() => { setSelectedRole(r.role); setError(''); }}
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

        <div className="mb-4">
          <label className="text-sm font-medium text-muted-foreground mb-1.5 block">{t('Password', 'पासवर्ड')}</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => { setPassword(e.target.value); setError(''); }}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder={t('Enter demo password', 'डेमो पासवर्ड दर्ज करें')}
              className="w-full px-4 py-2.5 pr-10 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
            </button>
          </div>
          {error && <p className="text-xs text-destructive mt-1.5 animate-fade-in">{error}</p>}
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-xl font-semibold text-primary-foreground gradient-primary hover:opacity-90 transition-opacity shadow-lg"
        >
          {t('Login as', 'के रूप में लॉगिन करें')} {roles.find(r => r.role === selectedRole)?.label}
        </button>

        <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border/50">
          <p className="text-xs text-muted-foreground text-center">
            {t('Demo password for all roles:', 'सभी भूमिकाओं के लिए डेमो पासवर्ड:')} <code className="font-mono text-primary font-semibold">demo1234</code>
          </p>
        </div>
      </div>
    </div>
  );
}
