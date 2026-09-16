import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, MapPin, Users, Globe, ExternalLink, Zap, 
  Menu, X, Bell, LogOut, Search, ArrowUpRight, Sparkles, CheckCircle2
} from 'lucide-react';

// Seeded Company Dataset (Matches Milestone 2 GET /api/v1/companies API Schema)
const SEEDED_COMPANIES = [
  {
    id: 1,
    name: "NexusTech Global",
    category: "MNCs",
    industry: "Enterprise Software & Cloud Architecture",
    size: "10,000+ employees",
    location: "Bangalore, India",
    website: "https://nexustech.example.com",
    isNewlyFounded: false,
    description: "Global cloud infrastructure provider building next-generation micro-frontend solutions and enterprise scaling engines for millions of daily active users.",
    openRolesCount: 14,
    techStack: ["React", "TypeScript", "Node.js", "AWS", "Kubernetes"]
  },
  {
    id: 2,
    name: "PulseAI Labs",
    category: "Startups",
    industry: "Artificial Intelligence & NLP",
    size: "15-50 employees",
    location: "Remote / San Francisco",
    website: "https://pulseai.example.com",
    isNewlyFounded: true,
    description: "Fast-growing AI startup creating real-time voice intelligence tools, automated candidate ranking engines, and conversational analytics platforms.",
    openRolesCount: 5,
    techStack: ["Python", "FastAPI", "React", "PyTorch", "Tailwind CSS"]
  },
  {
    id: 3,
    name: "Aether AI Solutions",
    category: "Newly Founded",
    industry: "Developer Tools & LLMs",
    size: "1-10 employees",
    location: "Remote",
    website: "https://aetherai.example.com",
    isNewlyFounded: true,
    description: "Seed-stage developer productivity platform leveraging large language models for automated API code generation and context-aware debugging.",
    openRolesCount: 3,
    techStack: ["React", "Next.js", "Python", "PostgreSQL", "Docker"]
  }
];

export default function CompanyProfile() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Ready for backend integration: fetch('/api/v1/companies')
  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        // UNCOMMENT WHEN BACKEND API IS LIVE:
        // const response = await fetch('/api/v1/companies');
        // const data = await response.json();
        // setCompanies(data);

        // Seeded Data Fallback
        setTimeout(() => {
          setCompanies(SEEDED_COMPANIES);
          setSelectedCompany(SEEDED_COMPANIES[0]);
          setLoading(false);
        }, 300);
      } catch (err) {
        console.error("Failed to connect to Company API:", err);
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.industry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || c.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

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
            
            <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden p-1 text-slate-400">
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
            <button onClick={() => { navigate('/companies'); setIsMobileMenuOpen(false); }} className="w-full py-2.5 px-3 bg-purple-50 text-purple-700 rounded-xl flex items-center gap-3 shadow-2xs">
              <span className="text-sm">🏢</span><span>Company Directory</span>
            </button>
            <button onClick={() => { navigate('/resume-upload'); setIsMobileMenuOpen(false); }} className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3">
              <span className="text-sm">📑</span><span>Resume & ATS Builder</span>
            </button>
            <button onClick={() => { navigate('/dashboard'); setIsMobileMenuOpen(false); }} className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3">
              <span className="text-sm">📊</span><span>Applications Tracker</span>
            </button>
            <button onClick={() => { navigate('/profile'); setIsMobileMenuOpen(false); }} className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3">
              <span className="text-sm">👤</span><span>Profile</span>
            </button>
            <button onClick={() => { navigate('/notifications'); setIsMobileMenuOpen(false); }} className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3">
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

      {/* Backdrop for Mobile Drawer */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-40 lg:hidden" 
          onClick={() => setIsMobileMenuOpen(false)} 
        />
      )}

      {/* 2. MAIN WORKSPACE */}
      <div className="flex-grow flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="w-full bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 px-6 py-3 flex justify-between items-center shadow-2xs">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 rounded-xl text-slate-600">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-black text-slate-900 hidden sm:block">Company & Startup Directory</h1>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/notifications')} className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl relative transition">
              <Bell className="w-4 h-4" />
            </button>
            <div onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} className="w-8 h-8 rounded-xl bg-purple-100 border border-purple-300 text-purple-700 font-bold text-xs flex items-center justify-center cursor-pointer">
              AM
            </div>
          </div>
        </header>

        {/* Workspace Body */}
        <main className="flex-grow p-6 max-w-6xl mx-auto w-full space-y-6">
          
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input 
                type="text" 
                placeholder="Search MNCs, Startups by name or industry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-purple-600 transition"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-xs font-bold text-slate-500">Category:</span>
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-purple-600 cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="MNCs">MNCs</option>
                <option value="Startups">Startups</option>
                <option value="Newly Founded">Newly Founded</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Directory Column */}
            <div className="space-y-3">
              {loading ? (
                <div className="p-8 text-center text-xs font-bold text-slate-400 animate-pulse">
                  Loading company listings...
                </div>
              ) : (
                filteredCompanies.map((company) => (
                  <div 
                    key={company.id}
                    onClick={() => setSelectedCompany(company)}
                    className={`p-4 rounded-3xl border transition cursor-pointer space-y-2 ${
                      selectedCompany?.id === company.id 
                        ? 'bg-purple-50/70 border-purple-300 shadow-sm' 
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                          {company.category}
                        </span>
                        <h3 className="text-base font-black text-slate-900 mt-1">{company.name}</h3>
                      </div>
                      {company.isNewlyFounded && (
                        <span className="text-[9px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md">
                          Newly Founded
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 font-medium line-clamp-2">{company.description}</p>
                    
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 pt-1 border-t border-slate-100">
                      <span>{company.size}</span>
                      <span className="text-purple-600">{company.openRolesCount} Open Positions</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Selected Company Details Column */}
            {selectedCompany && (
              <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-2xs space-y-6 h-fit">
                <div className="flex justify-between items-start pb-4 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-full">
                        {selectedCompany.category}
                      </span>
                      {selectedCompany.isNewlyFounded && (
                        <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified Startup
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl font-black text-slate-900">{selectedCompany.name}</h2>
                    <p className="text-xs font-bold text-slate-500">{selectedCompany.industry}</p>
                  </div>

                  <a 
                    href={selectedCompany.website} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-purple-600 rounded-xl transition flex items-center gap-1 text-xs font-bold"
                  >
                    Website <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Headquarters</p>
                    <p className="font-bold text-slate-800 mt-0.5">{selectedCompany.location}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Company Size</p>
                    <p className="font-bold text-slate-800 mt-0.5">{selectedCompany.size}</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100">
                    <p className="text-[10px] font-bold text-purple-600 uppercase">Open Positions</p>
                    <p className="font-black text-purple-900 mt-0.5">{selectedCompany.openRolesCount} Jobs Active</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">About the Company</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">{selectedCompany.description}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Primary Tech Stack</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCompany.techStack.map((tech, i) => (
                      <span key={i} className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-xl">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => navigate('/discovery')}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-2xl shadow-md shadow-purple-600/20 transition flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> View Company Roles in Swipe Deck
                </button>
              </div>
            )}

          </div>

        </main>
      </div>

    </div>
  );
}