import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, PlusCircle, CheckSquare, Zap, LogOut, 
  Menu, X, Bell, Search, Filter, Sparkles, CheckCircle2, 
  FileText, ExternalLink, ArrowUpDown, UserCheck, UserX, ChevronRight, Eye
} from 'lucide-react';

// Seeded ATS Applicant Rankings Dataset (Matches Milestone 2 & 3 Backend Schema)
const SEEDED_APPLICANTS = [
  {
    id: 101,
    candidateName: "Alex Morgan",
    email: "alex@example.com",
    appliedRole: "Senior React Architect",
    atsScore: 96,
    matchReason: "Matches 4/4 core skills (React, TypeScript, Tailwind, Node.js)",
    experienceYears: "5+ yrs",
    location: "Bangalore, India",
    status: "Shortlisted",
    appliedDate: "Sep 8, 2026",
    resumeUrl: "#"
  },
  {
    id: 102,
    candidateName: "Priya Sharma",
    email: "priya.sharma@example.com",
    appliedRole: "Senior React Architect",
    atsScore: 88,
    matchReason: "Strong React & Redux fit; lacks FastAPI experience",
    experienceYears: "4 yrs",
    location: "Remote",
    status: "Under Review",
    appliedDate: "Sep 9, 2026",
    resumeUrl: "#"
  },
  {
    id: 103,
    candidateName: "Rahul Verma",
    email: "rahul.v@example.com",
    appliedRole: "Frontend Developer Intern",
    atsScore: 92,
    matchReason: "Fresher friendly match; strong JavaScript fundamentals",
    experienceYears: "Fresher (2026)",
    location: "Hyderabad, India",
    status: "Shortlisted",
    appliedDate: "Sep 10, 2026",
    resumeUrl: "#"
  },
  {
    id: 104,
    candidateName: "Karan Patel",
    email: "karan.p@example.com",
    appliedRole: "Senior React Architect",
    atsScore: 64,
    matchReason: "Low skill overlap; missing TypeScript & Next.js",
    experienceYears: "2 yrs",
    location: "Pune, India",
    status: "Rejected",
    appliedDate: "Sep 5, 2026",
    resumeUrl: "#"
  }
];

export default function AtsRanker() {
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('atsScore'); // 'atsScore' | 'appliedDate'
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Ready for backend integration: GET /api/v1/recruiter/applicants
  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true);
      try {
        // UNCOMMENT WHEN BACKEND API IS LIVE:
        // const response = await fetch('/api/v1/recruiter/applicants');
        // const data = await response.json();
        // setApplicants(data);
        
        setTimeout(() => {
          setApplicants(SEEDED_APPLICANTS);
          setLoading(false);
        }, 300);
      } catch (error) {
        console.error("API Connection Error:", error);
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  const handleUpdateStatus = (e, id, newStatus) => {
    e.stopPropagation(); // Prevents row click navigation when updating status
    setApplicants(prev => prev.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
    showToast(`Applicant status updated to ${newStatus}`);
  };

  const filteredApplicants = applicants
    .filter(app => {
      const matchesSearch = app.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            app.appliedRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            app.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'atsScore') return b.atsScore - a.atsScore;
      return new Date(b.appliedDate) - new Date(a.appliedDate);
    });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans selection:bg-purple-500 selection:text-white">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {toastMessage}
        </div>
      )}

      {/* 1. RECRUITER PORTAL SIDEBAR */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white p-5 flex flex-col justify-between transition-transform duration-300
        ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center shadow-md shadow-purple-600/20">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Swipe<span className="text-purple-400">X</span> <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Recruiter</span>
              </span>
            </div>
            
            <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden p-1 text-slate-400">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-1.5 text-xs font-bold">
            <button 
              onClick={() => { navigate('/recruiter-dashboard'); setIsMobileMenuOpen(false); }}
              className="w-full py-2.5 px-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl flex items-center gap-3 transition cursor-pointer"
            >
              <Building2 className="w-4 h-4" />
              <span>Overview Dashboard</span>
            </button>

            <button 
              onClick={() => { navigate('/post-job'); setIsMobileMenuOpen(false); }}
              className="w-full py-2.5 px-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl flex items-center gap-3 transition cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Job Posting Wizard</span>
            </button>

            <button 
              onClick={() => { navigate('/ats-ranker'); setIsMobileMenuOpen(false); }}
              className="w-full py-2.5 px-3 bg-purple-600 text-white rounded-xl flex items-center gap-3 shadow-2xs cursor-pointer"
            >
              <CheckSquare className="w-4 h-4" />
              <span>Applicant ATS Ranker</span>
            </button>

            {/* ADDED SIDEBAR LINK FOR CANDIDATE REVIEW */}
            <button 
              onClick={() => { navigate('/candidate-review'); setIsMobileMenuOpen(false); }}
              className="w-full py-2.5 px-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl flex items-center gap-3 transition cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>Candidate Review</span>
            </button>
          </nav>
        </div>

        <div className="pt-3 border-t border-slate-800">
          <button 
            onClick={() => navigate('/login')}
            className="w-full py-2.5 px-3 text-rose-400 hover:bg-rose-950/30 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer"
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
        
        {/* Top Header */}
        <header className="w-full bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 px-6 py-3 flex justify-between items-center shadow-2xs">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-slate-600">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-black text-slate-900 hidden sm:block">Applicant Sourcing & ATS Match Ranker</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <div onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} className="w-8 h-8 rounded-xl bg-purple-100 border border-purple-300 text-purple-700 font-bold text-xs flex items-center justify-center cursor-pointer">
                HR
              </div>
            </div>
          </div>
        </header>

        {/* Workspace Body */}
        <main className="flex-grow p-6 max-w-6xl mx-auto w-full space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input 
                type="text" 
                placeholder="Search candidates, roles, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-purple-600 transition"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-purple-600 cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Under Review">Under Review</option>
                <option value="Rejected">Rejected</option>
              </select>

              <button 
                onClick={() => setSortBy(sortBy === 'atsScore' ? 'appliedDate' : 'atsScore')}
                className="px-3 py-2 bg-purple-50 text-purple-700 border border-purple-200 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-purple-100 transition cursor-pointer"
              >
                <ArrowUpDown className="w-3.5 h-3.5" /> 
                Sort by {sortBy === 'atsScore' ? 'ATS Score' : 'Date'}
              </button>
            </div>
          </div>

          {/* Ranked Applicants Directory Table */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xs">
            {loading ? (
              <div className="p-12 text-center text-xs font-bold text-slate-400 animate-pulse">
                Loading ATS applicant rankings...
              </div>
            ) : filteredApplicants.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-black text-slate-400 tracking-wider">
                      <th className="p-4">Candidate Name</th>
                      <th className="p-4">Applied Role</th>
                      <th className="p-4">ATS Match Score</th>
                      <th className="p-4">AI Match Insight</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                    {filteredApplicants.map((app) => (
                      <tr 
                        key={app.id} 
                        /* ROW CLICK REDIRECTS TO CANDIDATE REVIEW */
                        onClick={() => navigate('/candidate-review', { state: { applicantId: app.id } })}
                        className="hover:bg-purple-50/50 transition cursor-pointer"
                      >
                        <td className="p-4">
                          <p className="font-bold text-slate-900">{app.candidateName}</p>
                          <p className="text-[10px] text-slate-400">{app.email} • {app.location}</p>
                        </td>
                        <td className="p-4 font-bold text-slate-800">{app.appliedRole}</td>
                        <td className="p-4">
                          <span className={`text-xs font-black px-2.5 py-1 rounded-xl text-white inline-flex items-center gap-1 ${
                            app.atsScore >= 85 ? 'bg-emerald-600' :
                            app.atsScore >= 70 ? 'bg-amber-500' : 'bg-slate-400'
                          }`}>
                            <Sparkles className="w-3 h-3" /> {app.atsScore}%
                          </span>
                        </td>
                        <td className="p-4 max-w-xs text-[11px] text-slate-600 font-medium leading-tight">
                          {app.matchReason}
                        </td>
                        <td className="p-4">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            app.status === 'Shortlisted' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            app.status === 'Under Review' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                            'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-1.5">
                          <button 
                            onClick={(e) => handleUpdateStatus(e, app.id, 'Shortlisted')}
                            className="p-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg transition cursor-pointer"
                            title="Shortlist Candidate"
                          >
                            <UserCheck className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={(e) => handleUpdateStatus(e, app.id, 'Rejected')}
                            className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition cursor-pointer"
                            title="Reject Candidate"
                          >
                            <UserX className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-xs font-bold text-slate-400">
                No candidate records match your filter criteria.
              </div>
            )}
          </div>

        </main>
      </div>

    </div>
  );
}