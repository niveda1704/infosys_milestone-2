import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, Sparkles, FileText, Upload, CheckCircle2, AlertTriangle, 
  XCircle, ArrowRight, RefreshCw, Download, User, Settings, Bell, 
  LogOut, Search, Menu, X, Command, ShieldCheck, ChevronRight
} from 'lucide-react';

export default function ResumeUpload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(true); // Default loaded preview
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Mock Parsed ATS Results
  const atsResults = {
    score: 82,
    fileDetails: { name: "Alex_Morgan_Resume_2026.pdf", size: "1.2 MB", parsedDate: "Sep 8, 2026" },
    summary: "Strong candidate profile for Senior React & Frontend roles. Clear ATS parsing structure with minor keyword gaps in cloud DevOps tools.",
    matchedSkills: ["React.js", "TypeScript", "Tailwind CSS", "Redux", "REST APIs", "Git"],
    missingKeywords: ["GraphQL", "Docker", "CI/CD Pipelines", "Jest Testing"],
    formattingScore: 95,
    improvements: [
      "Add 'GraphQL' and 'Apollo Client' to your technical skills section to match 15% more MNC job postings.",
      "Quantify your achievements under NexusTech (e.g., 'Improved load times by 35%').",
      "Include certification badges or Docker environment experience if applicable."
    ]
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisComplete(true);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans selection:bg-purple-500 selection:text-white">
      
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
              className="w-full py-2.5 px-3 bg-purple-50 text-purple-700 rounded-xl flex items-center gap-3 shadow-2xs"
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

            <h1 className="text-lg font-black text-slate-900 tracking-tight hidden sm:block">AI Resume & ATS Analyzer</h1>
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
                AM
              </div>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl p-1.5 z-50 text-xs font-bold space-y-0.5">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-slate-900 font-black">Alex Morgan</p>
                    <p className="text-[10px] text-slate-400 font-medium">alex@example.com</p>
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

        {/* 3. RESUME WORKSPACE CONTENT */}
        <main className="flex-grow p-6 max-w-6xl mx-auto w-full space-y-6">
          
          {/* Top Upload Zone */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">Upload & Parse Resume</h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Get real-time ATS keyword matching, format verification, and AI optimization tips.
                </p>
              </div>

              <label className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer w-fit">
                <Upload className="w-4 h-4" />
                <span>Upload New PDF / DOCX</span>
                <input type="file" accept=".pdf,.docx" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            {/* Active File Details Bar */}
            <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">{atsResults.fileDetails.name}</p>
                  <p className="text-[10px] text-slate-400">{atsResults.fileDetails.size} • Uploaded {atsResults.fileDetails.parsedDate}</p>
                </div>
              </div>

              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> ATS Parsed
              </span>
            </div>
          </div>

          {/* Analysis Progress Overlay State */}
          {isAnalyzing && (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4 shadow-sm">
              <RefreshCw className="w-8 h-8 text-purple-600 animate-spin mx-auto" />
              <h3 className="text-base font-black text-slate-900">Analyzing Resume & Extracting Keywords...</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Our NLP engine is matching your experience against 500+ tech job postings in our discovery engine.
              </p>
            </div>
          )}

          {/* ATS Score Overview Grid */}
          {analysisComplete && !isAnalyzing && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Score Gauge Card */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xs space-y-6 flex flex-col items-center justify-center text-center">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-purple-600"
                      strokeDasharray={`${atsResults.score}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-black text-slate-900">{atsResults.score}%</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ATS Score</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-black text-slate-900">Good ATS Compatibility</h3>
                  <p className="text-xs text-slate-500 max-w-xs">{atsResults.summary}</p>
                </div>

                <button 
                  onClick={() => navigate('/discovery')}
                  className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2"
                >
                  View Matched Jobs <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Matched & Missing Skills Breakdown */}
              <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-2xs space-y-6">
                
                {/* Matched Skills */}
                <div>
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Matched Skills ({atsResults.matchedSkills.length})
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {atsResults.matchedSkills.map((skill, i) => (
                      <span key={i} className="text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-lg">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Keyword Gaps */}
                <div>
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-500" /> Detected Keyword Gaps ({atsResults.missingKeywords.length})
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {atsResults.missingKeywords.map((keyword, i) => (
                      <span key={i} className="text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-lg">
                        + Add {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI Suggestions Box */}
                <div className="bg-purple-50/60 border border-purple-200/80 rounded-2xl p-4 space-y-2">
                  <h4 className="text-xs font-black text-purple-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-purple-600" /> AI Optimization Plan
                  </h4>
                  <ul className="space-y-1.5">
                    {atsResults.improvements.map((tip, index) => (
                      <li key={index} className="text-xs text-purple-950 font-medium flex items-start gap-2">
                        <ChevronRight className="w-3.5 h-3.5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>
          )}

        </main>
      </div>

    </div>
  );
}