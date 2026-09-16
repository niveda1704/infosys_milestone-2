import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, Sparkles, Building2, MapPin, User, FileText, Bell, LogOut, Search, 
  Menu, X, Command, Settings, Upload, CheckCircle2, Trash2, Plus, Globe, 
  ExternalLink, ShieldCheck
} from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const storedName = localStorage.getItem('user_name') || 'Niveda Sree';
  const storedEmail = localStorage.getItem('user_email') || 'nivedasree1704@gmail.com';
  const userInitials = storedName.split(' ').filter(Boolean).map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'NS';

  // Profile Form State
  const [profileData, setProfileData] = useState({
    name: storedName,
    title: "Senior Full-Stack & AI Systems Developer",
    location: "Bangalore, India",
    email: storedEmail,
    phone: "+91 98765 43210",
    bio: "Passionate full-stack developer with 5+ years of experience building high-throughput web applications and AI-driven platforms.",
    github: `https://github.com/${storedEmail.split('@')[0]}`,
    linkedin: `https://linkedin.com/in/${storedName.toLowerCase().replace(/\s+/g, '')}`,
    portfolio: `https://${storedName.toLowerCase().replace(/\s+/g, '')}.dev`
  });

  // Skills Tagging State
  const [skills, setSkills] = useState(["React.js", "TypeScript", "Tailwind CSS", "Node.js", "Python", "FastAPI"]);
  const [newSkill, setNewSkill] = useState("");

  // Multiple Resumes Management State
  const [resumes, setResumes] = useState([
    { id: 1, name: `${storedName.replace(/\s+/g, '_')}_FullStack_Resume.pdf`, isPrimary: true, uploadedDate: "Sep 2, 2026", atsScore: 92 },
    { id: 2, name: `${storedName.replace(/\s+/g, '_')}_Technical_CV.pdf`, isPrimary: false, uploadedDate: "Aug 20, 2026", atsScore: 88 }
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
      showToast("Skill added!");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
    showToast("Skill removed.");
  };

  const handleSetPrimaryResume = (id) => {
    setResumes(resumes.map(r => ({ ...r, isPrimary: r.id === id })));
    showToast("Primary resume updated!");
  };

  const handleDeleteResume = (id) => {
    setResumes(resumes.filter(r => r.id !== id));
    showToast("Resume deleted.");
  };

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
              className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3 transition"
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
              className="w-full py-2.5 px-3 bg-purple-50 text-purple-700 rounded-xl flex items-center gap-3 shadow-2xs"
            >
              <span className="text-sm">👤</span>
              <span>Profile</span>
            </button>

            <button 
              onClick={() => { navigate('/notifications'); setIsMobileMenuOpen(false); }}
              className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3 transition"
            >
              <span className="text-sm">🔔</span>
              <span>Notifications</span>
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
      <div className="grow flex flex-col min-w-0">
        
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

            <h1 className="text-lg font-black text-slate-900 tracking-tight hidden sm:block">Candidate Profile & Resume Manager</h1>
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
                    <p className="text-slate-900 font-black">{profileData.name}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{profileData.email}</p>
                  </div>
                  <button onClick={() => navigate('/profile')} className="w-full py-2 px-3 hover:bg-slate-100 rounded-xl text-slate-700 flex items-center gap-2 transition">
                    <User className="w-3.5 h-3.5 text-slate-400" /> Profile
                  </button>
                  <button onClick={() => navigate('/notifications')} className="w-full py-2 px-3 hover:bg-slate-100 rounded-xl text-slate-700 flex items-center gap-2 transition">
                    <Bell className="w-3.5 h-3.5 text-slate-400" /> Notifications
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

        {/* 3. PROFILE CONTENT */}
        <main className="grow p-6 max-w-6xl mx-auto w-full space-y-6">
          
          {/* Top Info Header */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xs flex flex-col sm:flex-row items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-purple-100 border-2 border-purple-300 text-purple-700 text-2xl font-black flex items-center justify-center shadow-xs">
              {userInitials}
            </div>
            <div className="text-center sm:text-left space-y-1">
              <h2 className="text-2xl font-black text-slate-900">{profileData.name}</h2>
              <p className="text-xs font-bold text-purple-600">{profileData.title}</p>
              <p className="text-xs text-slate-500 font-medium flex items-center justify-center sm:justify-start gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> {profileData.location}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Personal Information & Links */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-2xs space-y-5">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-100">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Professional Title</label>
                  <input 
                    type="text" 
                    value={profileData.title}
                    onChange={(e) => setProfileData({...profileData, title: e.target.value})}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Email Address</label>
                  <input 
                    type="email" 
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Phone Number</label>
                  <input 
                    type="text" 
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:border-purple-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Professional Bio</label>
                <textarea 
                  rows="3"
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-purple-600"
                />
              </div>

              {/* Skill Tagging */}
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Skill Tags</h4>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill, index) => (
                    <span key={index} className="text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1 rounded-xl flex items-center gap-1.5">
                      {skill}
                      <button onClick={() => handleRemoveSkill(skill)} className="text-purple-400 hover:text-purple-900">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <form onSubmit={handleAddSkill} className="flex gap-2 pt-1">
                  <input 
                    type="text" 
                    placeholder="Add a new skill (e.g. Docker, GraphQL)..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="grow px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-purple-600"
                  />
                  <button type="submit" className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" /> Add Tag
                  </button>
                </form>
              </div>

            </div>

            {/* Right Column: Resumes Manager */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xs space-y-5 h-fit">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-600" /> Resume Versions
                </h3>
                <button onClick={() => navigate('/resume-upload')} className="text-[10px] font-bold text-purple-600 hover:underline flex items-center gap-0.5">
                  <Upload className="w-3 h-3" /> Add New
                </button>
              </div>

              <div className="space-y-3">
                {resumes.map((resume) => (
                  <div key={resume.id} className={`p-3.5 rounded-2xl border transition space-y-2 ${resume.isPrimary ? 'bg-purple-50/50 border-purple-300' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <p className="text-xs font-bold text-slate-900 truncate max-w-45">{resume.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium">Uploaded {resume.uploadedDate}</p>
                      </div>
                      <span className="text-[10px] font-black bg-purple-600 text-white px-2 py-0.5 rounded-md">
                        {resume.atsScore}% ATS
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                      {resume.isPrimary ? (
                        <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Primary Resume
                        </span>
                      ) : (
                        <button onClick={() => handleSetPrimaryResume(resume.id)} className="text-[10px] font-bold text-purple-600 hover:underline">
                          Make Primary
                        </button>
                      )}

                      <button onClick={() => handleDeleteResume(resume.id)} className="text-slate-400 hover:text-rose-600">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </main>
      </div>

    </div>
  );
}