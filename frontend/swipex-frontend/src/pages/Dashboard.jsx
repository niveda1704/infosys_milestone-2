import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, Sparkles, Building2, MapPin, DollarSign, 
  CheckCircle2, Bookmark, User, FileText, Bell, LogOut, Search, 
  Menu, X, Command, Settings, Clock, MoreVertical, Calendar, ChevronRight
} from 'lucide-react';

const TRACKED_APPLICATIONS = [
  {
    id: 1,
    title: "Senior React Architect",
    company: "NexusTech Global",
    location: "Bangalore (Hybrid)",
    salary: "$120k - $150k / yr",
    status: "interviewing", // saved | applied | shortlisted | interviewing | rejected
    appliedDate: "Sep 2, 2026",
    matchScore: 96,
    interviewDate: "Sep 12, 2026 - 10:00 AM IST"
  },
  {
    id: 2,
    title: "Frontend Developer Intern",
    company: "PulseAI Labs",
    location: "Remote",
    salary: "$2k - $3k / mo",
    status: "applied",
    appliedDate: "Sep 6, 2026",
    matchScore: 90
  },
  {
    id: 3,
    title: "Full Stack Engineer (Python/React)",
    company: "Aether AI Solutions",
    location: "Remote",
    salary: "$90k - $115k / yr",
    status: "shortlisted",
    appliedDate: "Sep 4, 2026",
    matchScore: 88
  },
  {
    id: 4,
    title: "Associate Software Developer",
    company: "Infosys Digital",
    location: "Hyderabad (On-site)",
    salary: "$45k - $60k / yr",
    status: "saved",
    appliedDate: "Saved on Sep 7",
    matchScore: 92
  }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const storedName = localStorage.getItem('user_name') || 'Niveda Sree';
  const storedEmail = localStorage.getItem('user_email') || 'nivedasree1704@gmail.com';
  const userInitials = storedName.split(' ').filter(Boolean).map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'NS';
  const [applications, setApplications] = useState(TRACKED_APPLICATIONS);
  const [activeTab, setActiveTab] = useState('all'); // all | saved | applied | shortlisted | interviewing
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const updateStatus = (id, newStatus) => {
    setApplications(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
    showToast(`Application status updated to ${newStatus.toUpperCase()}`);
  };

  const filteredApps = applications.filter(app => activeTab === 'all' || app.status === activeTab);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans selection:bg-purple-500 selection:text-white">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {toastMessage}
        </div>
      )}

      {/* 1. GLOBAL LEFT SIDEBAR NAVIGATION */}
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
            
            <button 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="lg:hidden p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-1.5 text-xs font-bold">
            <button 
              onClick={() => { navigate('/discovery'); setIsMobileMenuOpen(false); }}
              className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3 transition"
            >
              <span className="text-sm">🔥</span>
              <span>Discover (Swipe View)</span>
            </button>

            <button 
              onClick={() => { navigate('/job-search'); setIsMobileMenuOpen(false); }}
              className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3 transition"
            >
              <span className="text-sm">🔍</span>
              <span>Search & Explore</span>
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

            <button 
              onClick={() => { navigate('/resume-upload'); setIsMobileMenuOpen(false); }}
              className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3 transition"
            >
              <span className="text-sm">📑</span>
              <span>Resume & ATS Builder</span>
            </button>

            <button 
              onClick={() => { navigate('/dashboard'); setIsMobileMenuOpen(false); }}
              className="w-full py-2.5 px-3 bg-purple-50 text-purple-700 rounded-xl flex items-center gap-3 shadow-2xs"
            >
              <span className="text-sm">📊</span>
              <span>Applications Tracker</span>
            </button>

            <button 
              onClick={() => { navigate('/analytics'); setIsMobileMenuOpen(false); }}
              className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3 transition"
            >
              <span className="text-sm">📈</span>
              <span>Analytics & Insights</span>
            </button>

            <button 
              onClick={() => { navigate('/profile'); setIsMobileMenuOpen(false); }}
              className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3 transition"
            >
              <span className="text-sm">👤</span>
              <span>Profile</span>
            </button>

            <button 
              onClick={() => { navigate('/settings'); setIsMobileMenuOpen(false); }}
              className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3 transition"
            >
              <span className="text-sm">⚙️</span>
              <span>Settings</span>
            </button>
          </nav>
        </div>

        <div className="pt-3 border-t border-slate-100">
          <button 
            onClick={() => navigate('/login')}
            className="w-full py-2.5 px-3 text-rose-600 hover:bg-rose-50 rounded-xl font-bold text-xs flex items-center gap-2 transition"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Backdrop for Mobile Drawer */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-40 lg:hidden" 
          onClick={() => setIsMobileMenuOpen(false)} 
        />
      )}

      {/* 2. MAIN WORKSPACE */}
      <div className="flex-grow flex flex-col min-w-0">
        
        {/* Global Header */}
        <header className="w-full bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 px-6 py-3 flex justify-between items-center shadow-2xs">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
              title="Open Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <h1 className="text-lg font-black text-slate-900 tracking-tight hidden sm:block">Application Tracking Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/notifications')}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl relative transition"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="bg-purple-600 text-white text-[9px] font-black w-4 h-4 rounded-full absolute -top-0.5 -right-0.5 ring-2 ring-white flex items-center justify-center">
                3
              </span>
            </button>

            <div className="relative">
              <div 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="w-8 h-8 rounded-xl bg-purple-100 border border-purple-300 text-purple-700 font-bold text-xs flex items-center justify-center cursor-pointer hover:bg-purple-200 transition"
              >
                {userInitials}
              </div>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl p-1.5 z-50 text-xs font-bold space-y-0.5">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-slate-900 font-black">{storedName}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{storedEmail}</p>
                  </div>
                  <button onClick={() => navigate('/profile')} className="w-full py-2 px-3 hover:bg-slate-100 rounded-xl text-slate-700 flex items-center gap-2 transition">
                    <User className="w-3.5 h-3.5 text-slate-400" /> Profile
                  </button>
                  <button onClick={() => navigate('/settings')} className="w-full py-2 px-3 hover:bg-slate-100 rounded-xl text-slate-700 flex items-center gap-2 transition">
                    <Settings className="w-3.5 h-3.5 text-slate-400" /> Settings
                  </button>
                  <div className="border-t border-slate-100 my-1"></div>
                  <button onClick={() => navigate('/login')} className="w-full py-2 px-3 hover:bg-rose-50 text-rose-600 rounded-xl flex items-center gap-2 transition">
                    <LogOut className="w-3.5 h-3.5" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* 3. TRACKER WORKSPACE CONTENT */}
        <main className="flex-grow p-6 max-w-7xl mx-auto w-full space-y-6">
          
          {/* Summary Metrics Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 p-4 rounded-3xl shadow-2xs">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Applied</p>
              <p className="text-2xl font-black text-slate-900 mt-1">3</p>
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-3xl shadow-2xs">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Shortlisted</p>
              <p className="text-2xl font-black text-purple-600 mt-1">1</p>
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-3xl shadow-2xs">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Interviews</p>
              <p className="text-2xl font-black text-emerald-600 mt-1">1</p>
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-3xl shadow-2xs">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Saved Roles</p>
              <p className="text-2xl font-black text-slate-700 mt-1">1</p>
            </div>
          </div>

          {/* Tab Filter Controls */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
            {['all', 'saved', 'applied', 'shortlisted', 'interviewing', 'rejected'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-bold rounded-xl capitalize transition whitespace-nowrap ${
                  activeTab === tab 
                    ? 'bg-purple-600 text-white shadow-xs' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Application Cards List */}
          <div className="space-y-4">
            {filteredApps.length > 0 ? (
              filteredApps.map((app) => (
                <div key={app.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-2xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                        app.status === 'interviewing' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        app.status === 'shortlisted' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                        app.status === 'applied' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        {app.status}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">{app.appliedDate}</span>
                    </div>

                    <h3 className="text-base font-black text-slate-900">{app.title}</h3>
                    <p className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" /> {app.company} • {app.location}
                    </p>

                    {app.interviewDate && (
                      <div className="mt-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl flex items-center gap-2 w-fit">
                        <Calendar className="w-3.5 h-3.5" /> Scheduled: {app.interviewDate}
                      </div>
                    )}
                  </div>

                  {/* Stage Update Controls */}
                  <div className="flex items-center gap-3 self-end md:self-auto">
                    <div className="bg-purple-600 text-white text-xs font-black px-3 py-1 rounded-xl flex items-center gap-1 shadow-2xs">
                      <Sparkles className="w-3 h-3" /> {app.matchScore}% Match
                    </div>

                    <select
                      value={app.status}
                      onChange={(e) => updateStatus(app.id, e.target.value)}
                      className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-purple-600 cursor-pointer"
                    >
                      <option value="saved">Saved</option>
                      <option value="applied">Applied</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="interviewing">Interviewing</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-3">
                <FileText className="w-8 h-8 text-slate-400 mx-auto" />
                <h3 className="text-base font-black text-slate-900">No Applications in this Stage</h3>
                <p className="text-xs text-slate-500">Apply to new job discovery cards to start tracking.</p>
              </div>
            )}
          </div>

        </main>
      </div>

    </div>
  );
}