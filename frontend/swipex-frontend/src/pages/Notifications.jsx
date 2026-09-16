import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, Sparkles, Building2, User, Bell, LogOut, 
  Menu, X, CheckCircle2, AlertTriangle, Briefcase, Trash2, Check
} from 'lucide-react';

export default function Notifications() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "High Match Opportunity Alert",
      message: "NexusTech Global posted a Senior React Architect position with a 96% match for your resume.",
      time: "10 mins ago",
      type: "match",
      isUnread: true
    },
    {
      id: 2,
      title: "Startup Hiring Alert",
      message: "PulseAI Labs is urgently hiring Frontend Interns. Low applicant competition detected.",
      time: "2 hours ago",
      type: "startup",
      isUnread: true
    },
    {
      id: 3,
      title: "Application Status Update",
      message: "Aether AI Solutions moved your application for Full Stack Engineer to Shortlisted.",
      time: "1 day ago",
      type: "status",
      isUnread: false
    }
  ]);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isUnread: false })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans selection:bg-purple-500 selection:text-white">
      
      {/* 1. GLOBAL SIDEBAR NAVIGATION */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 p-5 flex flex-col justify-between transition-transform duration-300
        ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center shadow-md shadow-purple-600/20">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900">
                Swipe<span className="text-purple-600">X</span>
              </span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden p-1 rounded-lg text-slate-400">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-1.5 text-xs font-bold">
            <button onClick={() => { navigate('/discovery'); setIsMobileMenuOpen(false); }} className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3">
              <span className="text-sm">🔥</span><span>Discover (Swipe View)</span>
            </button>
            <button onClick={() => { navigate('/job-search'); setIsMobileMenuOpen(false); }} className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3">
              <span className="text-sm">🔍</span><span>Search & Explore</span>
            </button>
            <button 
  onClick={() => { navigate('/companies'); setIsMobileMenuOpen(false); }} 
  className={`w-full py-2.5 px-3 rounded-xl flex items-center gap-3 transition ${
    window.location.pathname === '/companies' 
      ? 'bg-purple-50 text-purple-700 shadow-2xs' 
      : 'text-slate-600 hover:bg-slate-100'
  }`}
>
  <span className="text-sm">🏢</span>
  <span>Company Directory</span>
</button>
            <button onClick={() => { navigate('/resume-upload'); setIsMobileMenuOpen(false); }} className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3">
              <span className="text-sm">📑</span><span>Resume & ATS Builder</span>
            </button>
            <button onClick={() => { navigate('/dashboard'); setIsMobileMenuOpen(false); }} className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3">
              <span className="text-sm">📊</span><span>Applications Tracker</span>
            </button>
            <button onClick={() => { navigate('/analytics'); setIsMobileMenuOpen(false); }} className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3">
              <span className="text-sm">📈</span><span>Analytics & Insights</span>
            </button>
            <button onClick={() => { navigate('/profile'); setIsMobileMenuOpen(false); }} className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3">
              <span className="text-sm">👤</span><span>Profile</span>
            </button>
            <button onClick={() => { navigate('/notifications'); setIsMobileMenuOpen(false); }} className="w-full py-2.5 px-3 bg-purple-50 text-purple-700 rounded-xl flex items-center gap-3 shadow-2xs">
              <span className="text-sm">🔔</span><span>Notifications</span>
            </button>
          </nav>
        </div>

        <div className="pt-3 border-t border-slate-100">
          <button onClick={() => navigate('/login')} className="w-full py-2.5 px-3 text-rose-600 hover:bg-rose-50 rounded-xl font-bold text-xs flex items-center gap-2">
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE */}
      <div className="flex-grow flex flex-col min-w-0">
        <header className="w-full bg-white/90 border-b border-slate-200 sticky top-0 z-30 px-6 py-3 flex justify-between items-center shadow-2xs">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-slate-600">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-black text-slate-900 hidden sm:block">Notifications & Real-Time Alerts</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <div onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} className="w-8 h-8 rounded-xl bg-purple-100 border border-purple-300 text-purple-700 font-bold text-xs flex items-center justify-center cursor-pointer">
                AM
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow p-6 max-w-4xl mx-auto w-full space-y-6">
          <div className="flex justify-between items-center bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-bold text-slate-900">Recent Notifications</span>
            </div>
            <button onClick={markAllRead} className="text-[11px] font-bold text-purple-600 hover:underline flex items-center gap-1">
              <Check className="w-3 h-3" /> Mark all as read
            </button>
          </div>

          <div className="space-y-3">
            {notifications.map((item) => (
              <div key={item.id} className={`p-4 rounded-3xl border transition flex items-start justify-between gap-4 ${item.isUnread ? 'bg-purple-50/40 border-purple-200' : 'bg-white border-slate-200'}`}>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-900">{item.title}</span>
                    {item.isUnread && <span className="w-2 h-2 rounded-full bg-purple-600 inline-block" />}
                  </div>
                  <p className="text-xs text-slate-600 font-medium">{item.message}</p>
                  <p className="text-[10px] text-slate-400 font-semibold pt-1">{item.time}</p>
                </div>

                <button onClick={() => deleteNotification(item.id)} className="text-slate-400 hover:text-rose-600 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>

    </div>
  );
}