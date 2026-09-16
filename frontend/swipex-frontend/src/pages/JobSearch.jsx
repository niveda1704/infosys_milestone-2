// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   Zap, Sparkles, Heart, Building2, MapPin, DollarSign, 
//   CheckCircle2, AlertCircle, Bookmark, User, FileText,
//   Clock, Users, Menu, X, Bell, LogOut,
//   Search, BarChart2, Settings, ChevronDown, Command, Filter, LayoutGrid, List, SlidersHorizontal, ArrowUpRight
// } from 'lucide-react';

// const JOBS_DATA = [
//   {
//     id: 1,
//     title: "Senior React Architect",
//     company: "NexusTech Global",
//     category: "MNCs",
//     roleType: "Full-Time",
//     location: "Bangalore (Hybrid)",
//     salary: "$120k - $150k / yr",
//     matchScore: 96,
//     posted: "2h ago",
//     competitionLevel: "Low",
//     fresherFriendly: false,
//     matchingSkills: ["React", "TypeScript", "Tailwind CSS"],
//     description: "Leading core frontend migration to Next.js 14, establishing micro-frontend architectures, and optimizing rendering performance for 2M+ daily active users."
//   },
//   {
//     id: 2,
//     title: "Frontend Developer Intern",
//     company: "PulseAI Labs",
//     category: "Startups",
//     roleType: "Internship",
//     location: "Remote",
//     salary: "$2k - $3k / mo",
//     matchScore: 90,
//     posted: "1h ago",
//     competitionLevel: "Low",
//     fresherFriendly: true,
//     matchingSkills: ["React", "JavaScript", "CSS3"],
//     description: "Build responsive UI components, participate in daily design sprints, and work directly with senior engineers on client-facing features."
//   },
//   {
//     id: 3,
//     title: "Full Stack Engineer (Python/React)",
//     company: "Aether AI Solutions",
//     category: "Newly Founded",
//     roleType: "Full-Time",
//     location: "Remote",
//     salary: "$90k - $115k / yr",
//     matchScore: 88,
//     posted: "1d ago",
//     competitionLevel: "Medium",
//     fresherFriendly: false,
//     matchingSkills: ["Python", "FastAPI", "React"],
//     description: "Building scalable LLM workflow tools. You will own full vertical features from database query optimization down to polished UI execution."
//   },
//   {
//     id: 4,
//     title: "Associate Software Developer",
//     company: "Infosys Digital",
//     category: "Fresher Friendly",
//     roleType: "Full-Time",
//     location: "Hyderabad (On-site)",
//     salary: "$45k - $60k / yr",
//     matchScore: 92,
//     posted: "5h ago",
//     competitionLevel: "High",
//     fresherFriendly: true,
//     matchingSkills: ["Java", "SQL", "Git"],
//     description: "Entry-level development role focusing on backend enterprise services, test-driven development, and modular REST API construction."
//   },
//   {
//     id: 5,
//     title: "Backend Specialist (Node/Go)",
//     company: "Vortex Scale-Up",
//     category: "Startups",
//     roleType: "Full-Time",
//     location: "Pune (Hybrid)",
//     salary: "$80k - $105k / yr",
//     matchScore: 85,
//     posted: "3h ago",
//     competitionLevel: "Low",
//     fresherFriendly: false,
//     matchingSkills: ["Node.js", "Express", "PostgreSQL"],
//     description: "Designing real-time event streaming systems and microservices. High availability & query optimization focus."
//   }
// ];

// export default function JobSearch() {
//   const navigate = useNavigate();
//   const [jobs, setJobs] = useState(JOBS_DATA);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [selectedRoleType, setSelectedRoleType] = useState('All');
//   const [onlyFresherFriendly, setOnlyFresherFriendly] = useState(false);
//   const [onlyLowCompetition, setOnlyLowCompetition] = useState(false);
//   const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const [toastMessage, setToastMessage] = useState(null);

//   const showToast = (msg) => {
//     setToastMessage(msg);
//     setTimeout(() => setToastMessage(null), 2500);
//   };

//   // Advanced Filtering Logic
//   const filteredJobs = jobs.filter(job => {
//     const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                           job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                           job.matchingSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
//     const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
//     const matchesRoleType = selectedRoleType === 'All' || job.roleType === selectedRoleType;
//     const matchesFresher = !onlyFresherFriendly || job.fresherFriendly;
//     const matchesLowComp = !onlyLowCompetition || job.competitionLevel === 'Low';

//     return matchesSearch && matchesCategory && matchesRoleType && matchesFresher && matchesLowComp;
//   });

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans selection:bg-purple-500 selection:text-white">
      
//       {/* Toast Alert */}
//       {toastMessage && (
//         <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs font-bold flex items-center gap-2 animate-bounce">
//           <CheckCircle2 className="w-4 h-4 text-emerald-400" />
//           {toastMessage}
//         </div>
//       )}

//       {/* 1. GLOBAL LEFT SIDEBAR NAVIGATION */}
//       <aside className={`
//         fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 p-5 flex flex-col justify-between transition-transform duration-300
//         ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
//       `}>
//         <div className="space-y-6">
//           <div className="flex justify-between items-center pb-4 border-b border-slate-100">
//             <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
//               <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center shadow-md shadow-purple-600/20">
//                 <Zap className="w-5 h-5 text-white fill-white" />
//               </div>
//               <span className="text-xl font-black tracking-tight text-slate-900">
//                 Swipe<span className="text-purple-600">X</span>
//               </span>
//             </div>
            
//             <button 
//               onClick={() => setIsMobileMenuOpen(false)} 
//               className="lg:hidden p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>

//           <nav className="space-y-1.5 text-xs font-bold">
//             <button 
//               onClick={() => { navigate('/discovery'); setIsMobileMenuOpen(false); }}
//               className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3 transition"
//             >
//               <span className="text-sm">🔥</span>
//               <span>Discover</span>
//             </button>

//             <button 
//               onClick={() => { navigate('/job-search'); setIsMobileMenuOpen(false); }}
//               className="w-full py-2.5 px-3 bg-purple-50 text-purple-700 rounded-xl flex items-center gap-3 shadow-2xs"
//             >
//               <span className="text-sm">🔍</span>
//               <span>Search & Explore</span>
//             </button>
//             <button 
//   onClick={() => { navigate('/companies'); setIsMobileMenuOpen(false); }} 
//   className={`w-full py-2.5 px-3 rounded-xl flex items-center gap-3 transition ${
//     window.location.pathname === '/companies' 
//       ? 'bg-purple-50 text-purple-700 shadow-2xs' 
//       : 'text-slate-600 hover:bg-slate-100'
//   }`}
// >
//   <span className="text-sm">🏢</span>
//   <span>Company Directory</span>
// </button>
//             <button 
//               onClick={() => { navigate('/resume-upload'); setIsMobileMenuOpen(false); }}
//               className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3 transition"
//             >
//               <span className="text-sm">📑</span>
//               <span>Resume & ATS Builder</span>
//             </button>

//             <button 
//               onClick={() => { navigate('/dashboard'); setIsMobileMenuOpen(false); }}
//               className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3 transition"
//             >
//               <span className="text-sm">📊</span>
//               <span>Applications Tracker</span>
//             </button>

//             <button 
//               onClick={() => { navigate('/analytics'); setIsMobileMenuOpen(false); }}
//               className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3 transition"
//             >
//               <span className="text-sm">📈</span>
//               <span>Analytics & Insights</span>
//             </button>

//             <button 
//               onClick={() => { navigate('/profile'); setIsMobileMenuOpen(false); }}
//               className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3 transition"
//             >
//               <span className="text-sm">👤</span>
//               <span>Profile</span>
//             </button>

//             <button 
//               onClick={() => { navigate('/settings'); setIsMobileMenuOpen(false); }}
//               className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3 transition"
//             >
//               <span className="text-sm">⚙️</span>
//               <span>Settings</span>
//             </button>
//           </nav>
//         </div>

//         <div className="pt-3 border-t border-slate-100">
//           <button 
//             onClick={() => navigate('/login')}
//             className="w-full py-2.5 px-3 text-rose-600 hover:bg-rose-50 rounded-xl font-bold text-xs flex items-center gap-2 transition"
//           >
//             <LogOut className="w-3.5 h-3.5" /> Sign Out
//           </button>
//         </div>
//       </aside>

//       {/* Backdrop for Mobile Drawer */}
//       {isMobileMenuOpen && (
//         <div 
//           className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-40 lg:hidden" 
//           onClick={() => setIsMobileMenuOpen(false)} 
//         />
//       )}

//       {/* 2. MAIN WORKSPACE */}
//       <div className="flex-grow flex flex-col min-w-0">
        
//         {/* Global Header */}
//         <header className="w-full bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 px-6 py-3 flex justify-between items-center shadow-2xs">
//           <div className="flex items-center gap-4">
//             <button 
//               onClick={() => setIsMobileMenuOpen(true)}
//               className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
//               title="Open Menu"
//             >
//               <Menu className="w-5 h-5" />
//             </button>

//             <h1 className="text-lg font-black text-slate-900 tracking-tight hidden sm:block">Smart Search & Filters</h1>
//           </div>

//           <div className="flex items-center gap-3">
//             <button 
//               onClick={() => navigate('/notifications')}
//               className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl relative transition"
//               title="Notifications"
//             >
//               <Bell className="w-4 h-4" />
//               <span className="bg-purple-600 text-white text-[9px] font-black w-4 h-4 rounded-full absolute -top-0.5 -right-0.5 ring-2 ring-white flex items-center justify-center">
//                 3
//               </span>
//             </button>

//             <div className="relative">
//               <div 
//                 onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
//                 className="w-8 h-8 rounded-xl bg-purple-100 border border-purple-300 text-purple-700 font-bold text-xs flex items-center justify-center cursor-pointer hover:bg-purple-200 transition"
//               >
//                 AM
//               </div>

//               {isProfileDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl p-1.5 z-50 text-xs font-bold space-y-0.5">
//                   <div className="px-3 py-2 border-b border-slate-100 mb-1">
//                     <p className="text-slate-900 font-black">Alex Morgan</p>
//                     <p className="text-[10px] text-slate-400 font-medium">alex@example.com</p>
//                   </div>
//                   <button onClick={() => navigate('/profile')} className="w-full py-2 px-3 hover:bg-slate-100 rounded-xl text-slate-700 flex items-center gap-2 transition">
//                     <User className="w-3.5 h-3.5 text-slate-400" /> Profile
//                   </button>
//                   <button onClick={() => navigate('/settings')} className="w-full py-2 px-3 hover:bg-slate-100 rounded-xl text-slate-700 flex items-center gap-2 transition">
//                     <Settings className="w-3.5 h-3.5 text-slate-400" /> Settings
//                   </button>
//                   <div className="border-t border-slate-100 my-1"></div>
//                   <button onClick={() => navigate('/login')} className="w-full py-2 px-3 hover:bg-rose-50 text-rose-600 rounded-xl flex items-center gap-2 transition">
//                     <LogOut className="w-3.5 h-3.5" /> Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </header>

//         {/* 3. SEARCH & FILTER DIRECTORY CONTENT */}
//         <main className="flex-grow p-6 max-w-7xl mx-auto w-full space-y-6">
          
//           {/* Top Search Input & Controls */}
//           <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs">
//             <div className="relative w-full md:w-96">
//               <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
//               <input 
//                 type="text" 
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search by role title, company, or skill..." 
//                 className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-purple-600 transition font-medium"
//               />
//             </div>

//             {/* View Mode Toggle */}
//             <div className="flex items-center gap-2 self-end md:self-auto">
//               <span className="text-xs font-bold text-slate-500 mr-2">{filteredJobs.length} Roles Found</span>
//               <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
//                 <button 
//                   onClick={() => setViewMode('grid')}
//                   className={`p-1.5 rounded-lg transition ${viewMode === 'grid' ? 'bg-white text-purple-600 shadow-2xs' : 'text-slate-400'}`}
//                   title="Grid View"
//                 >
//                   <LayoutGrid className="w-4 h-4" />
//                 </button>
//                 <button 
//                   onClick={() => setViewMode('list')}
//                   className={`p-1.5 rounded-lg transition ${viewMode === 'list' ? 'bg-white text-purple-600 shadow-2xs' : 'text-slate-400'}`}
//                   title="List View"
//                 >
//                   <List className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Main Grid: Left Filters Panel + Right Results Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
//             {/* LEFT FILTERS SIDEBAR */}
//             <div className="lg:col-span-1 bg-white border border-slate-200 rounded-3xl p-5 space-y-5 h-fit shadow-2xs">
//               <div className="flex items-center justify-between pb-3 border-b border-slate-100">
//                 <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
//                   <SlidersHorizontal className="w-3.5 h-3.5 text-purple-600" /> Advanced Filters
//                 </h3>
//                 <button 
//                   onClick={() => {
//                     setSelectedCategory('All');
//                     setSelectedRoleType('All');
//                     setOnlyFresherFriendly(false);
//                     setOnlyLowCompetition(false);
//                     setSearchQuery('');
//                   }}
//                   className="text-[10px] font-bold text-purple-600 hover:underline"
//                 >
//                   Reset
//                 </button>
//               </div>

//               {/* Category Filter */}
//               <div>
//                 <label className="block text-[11px] font-bold text-slate-600 mb-1.5">Company Category</label>
//                 <select 
//                   value={selectedCategory} 
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                   className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-purple-600"
//                 >
//                   <option value="All">All Categories</option>
//                   <option value="MNCs">MNCs</option>
//                   <option value="Startups">Startups</option>
//                   <option value="Newly Founded">Newly Founded</option>
//                   <option value="Fresher Friendly">Fresher Friendly</option>
//                 </select>
//               </div>

//               {/* Role Type */}
//               <div>
//                 <label className="block text-[11px] font-bold text-slate-600 mb-1.5">Role Type</label>
//                 <select 
//                   value={selectedRoleType} 
//                   onChange={(e) => setSelectedRoleType(e.target.value)}
//                   className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-purple-600"
//                 >
//                   <option value="All">All Role Types</option>
//                   <option value="Full-Time">Full-Time Jobs</option>
//                   <option value="Internship">Internship Opportunities</option>
//                 </select>
//               </div>

//               {/* Advanced Checkboxes */}
//               <div className="space-y-2 pt-2 border-t border-slate-100">
//                 <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
//                   <input 
//                     type="checkbox" 
//                     checked={onlyFresherFriendly} 
//                     onChange={(e) => setOnlyFresherFriendly(e.target.checked)}
//                     className="w-3.5 h-3.5 accent-purple-600 rounded" 
//                   />
//                   <span>Fresher Friendly Roles</span>
//                 </label>

//                 <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
//                   <input 
//                     type="checkbox" 
//                     checked={onlyLowCompetition} 
//                     onChange={(e) => setOnlyLowCompetition(e.target.checked)}
//                     className="w-3.5 h-3.5 accent-purple-600 rounded" 
//                   />
//                   <span>Low Competition Roles</span>
//                 </label>
//               </div>
//             </div>

//             {/* RIGHT RESULTS VIEW */}
//             <div className="lg:col-span-3">
//               {filteredJobs.length > 0 ? (
//                 <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-3"}>
//                   {filteredJobs.map((job) => (
//                     <div key={job.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-2xs hover:shadow-md transition space-y-3">
//                       <div className="flex justify-between items-start gap-2">
//                         <div>
//                           <div className="flex items-center gap-1.5 mb-1">
//                             <span className="text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full">
//                               {job.category}
//                             </span>
//                             <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
//                               {job.roleType}
//                             </span>
//                           </div>
//                           <h3 className="text-base font-black text-slate-900">{job.title}</h3>
//                           <p className="text-xs font-semibold text-slate-500 flex items-center gap-1 mt-0.5">
//                             <Building2 className="w-3.5 h-3.5 text-slate-400" /> {job.company}
//                           </p>
//                         </div>

//                         <div className="bg-purple-600 text-white text-[11px] font-black px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-xs">
//                           <Sparkles className="w-3 h-3" /> {job.matchScore}%
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 font-medium py-2 border-y border-slate-100">
//                         <div className="flex items-center gap-1.5">
//                           <MapPin className="w-3.5 h-3.5 text-purple-600" /> {job.location}
//                         </div>
//                         <div className="flex items-center gap-1.5">
//                           <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> {job.salary}
//                         </div>
//                       </div>

//                       <div className="flex flex-wrap gap-1">
//                         {job.matchingSkills.map((skill, i) => (
//                           <span key={i} className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md">
//                             {skill}
//                           </span>
//                         ))}
//                       </div>

//                       <div className="flex items-center justify-between gap-2 pt-2">
//                         <button 
//                           onClick={() => showToast(`Saved ${job.title}!`)}
//                           className="p-2 text-slate-400 hover:text-purple-600 bg-slate-50 hover:bg-purple-50 rounded-xl transition"
//                           title="Save Job"
//                         >
//                           <Bookmark className="w-4 h-4" />
//                         </button>

//                         <button 
//                           onClick={() => showToast(`Applied to ${job.title}!`)}
//                           className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5"
//                         >
//                           Apply Now <ArrowUpRight className="w-3.5 h-3.5" />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-3">
//                   <Search className="w-8 h-8 text-slate-400 mx-auto" />
//                   <h3 className="text-base font-black text-slate-900">No Matching Roles Found</h3>
//                   <p className="text-xs text-slate-500">Try adjusting your filters or search keywords.</p>
//                 </div>
//               )}
//             </div>

//           </div>

//         </main>
//       </div>

//     </div>
//   );
// }

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, Sparkles, Heart, Building2, MapPin, DollarSign, 
  CheckCircle2, AlertCircle, Bookmark, User, FileText,
  Clock, Users, Menu, X, Bell, LogOut,
  Search, BarChart2, Settings, ChevronDown, Command, Filter, LayoutGrid, List, SlidersHorizontal, ArrowUpRight
} from 'lucide-react';

const SEEDED_JOBS_SEARCH_DATA = [
  {
    id: 1,
    title: "Senior React Architect",
    company: "NexusTech Global",
    category: "MNCs",
    roleType: "Full-Time",
    location: "Bangalore (Hybrid)",
    salary: "$120k - $150k / yr",
    matchScore: 96,
    posted: "2h ago",
    competitionLevel: "Low",
    fresherFriendly: false,
    recentlyPosted: true,
    matchingSkills: ["React", "TypeScript", "Tailwind CSS"],
    description: "Leading core frontend migration to Next.js 14, establishing micro-frontend architectures, and optimizing rendering performance for 2M+ daily active users."
  },
  {
    id: 2,
    title: "Frontend Developer Intern",
    company: "PulseAI Labs",
    category: "Startups",
    roleType: "Internship",
    location: "Remote",
    salary: "$2k - $3k / mo",
    matchScore: 90,
    posted: "1h ago",
    competitionLevel: "Low",
    fresherFriendly: true,
    recentlyPosted: true,
    matchingSkills: ["React", "JavaScript", "CSS3"],
    description: "Build responsive UI components, participate in daily design sprints, and work directly with senior engineers on client-facing features."
  },
  {
    id: 3,
    title: "Full Stack Engineer (Python/React)",
    company: "Aether AI Solutions",
    category: "Newly Founded",
    roleType: "Full-Time",
    location: "Remote",
    salary: "$90k - $115k / yr",
    matchScore: 88,
    posted: "1d ago",
    competitionLevel: "Medium",
    fresherFriendly: false,
    recentlyPosted: false,
    matchingSkills: ["Python", "FastAPI", "React"],
    description: "Building scalable LLM workflow tools. You will own full vertical features from database query optimization down to polished UI execution."
  },
  {
    id: 4,
    title: "Associate Software Developer",
    company: "Infosys Digital",
    category: "Fresher Friendly",
    roleType: "Full-Time",
    location: "Hyderabad (On-site)",
    salary: "$45k - $60k / yr",
    matchScore: 92,
    posted: "5h ago",
    competitionLevel: "High",
    fresherFriendly: true,
    recentlyPosted: true,
    matchingSkills: ["Java", "SQL", "Git"],
    description: "Entry-level development role focusing on backend enterprise services, test-driven development, and modular REST API construction."
  },
  {
    id: 5,
    title: "Backend Specialist (Node/Go)",
    company: "Vortex Scale-Up",
    category: "Startups",
    roleType: "Full-Time",
    location: "Pune (Hybrid)",
    salary: "$80k - $105k / yr",
    matchScore: 85,
    posted: "3h ago",
    competitionLevel: "Low",
    fresherFriendly: false,
    recentlyPosted: true,
    matchingSkills: ["Node.js", "Express", "PostgreSQL"],
    description: "Designing real-time event streaming systems and microservices. High availability & query optimization focus."
  }
];

export default function JobSearch() {
  const navigate = useNavigate();
  const storedName = localStorage.getItem('user_name') || 'Niveda Sree';
  const storedEmail = localStorage.getItem('user_email') || 'nivedasree1704@gmail.com';
  const userInitials = storedName.split(' ').filter(Boolean).map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'NS';
  const [jobs, setJobs] = useState(SEEDED_JOBS_SEARCH_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRoleType, setSelectedRoleType] = useState('All');
  
  // Milestone 2 Advanced Filter Chips
  const [onlyFresherFriendly, setOnlyFresherFriendly] = useState(false);
  const [onlyLowCompetition, setOnlyLowCompetition] = useState(false);
  const [onlyRecentlyPosted, setOnlyRecentlyPosted] = useState(false);
  
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Milestone 2 Advanced Multi-Param Filtering Logic
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.matchingSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
    const matchesRoleType = selectedRoleType === 'All' || job.roleType === selectedRoleType;
    const matchesFresher = !onlyFresherFriendly || job.fresherFriendly;
    const matchesLowComp = !onlyLowCompetition || job.competitionLevel === 'Low';
    const matchesRecent = !onlyRecentlyPosted || job.recentlyPosted;

    return matchesSearch && matchesCategory && matchesRoleType && matchesFresher && matchesLowComp && matchesRecent;
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
              className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3 transition cursor-pointer"
            >
              <span className="text-sm">🔥</span>
              <span>Discover</span>
            </button>

            <button 
              onClick={() => { navigate('/job-search'); setIsMobileMenuOpen(false); }}
              className="w-full py-2.5 px-3 bg-purple-50 text-purple-700 rounded-xl flex items-center gap-3 shadow-2xs cursor-pointer"
            >
              <span className="text-sm">🔍</span>
              <span>Search & Explore</span>
            </button>

            <button 
              onClick={() => { navigate('/companies'); setIsMobileMenuOpen(false); }} 
              className={`w-full py-2.5 px-3 rounded-xl flex items-center gap-3 transition cursor-pointer ${
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
              className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3 transition cursor-pointer"
            >
              <span className="text-sm">📑</span>
              <span>Resume & ATS Builder</span>
            </button>

            <button 
              onClick={() => { navigate('/dashboard'); setIsMobileMenuOpen(false); }}
              className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3 transition cursor-pointer"
            >
              <span className="text-sm">📊</span>
              <span>Applications Tracker</span>
            </button>

            <button 
              onClick={() => { navigate('/analytics'); setIsMobileMenuOpen(false); }}
              className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3 transition cursor-pointer"
            >
              <span className="text-sm">📈</span>
              <span>Analytics & Insights</span>
            </button>

            <button 
              onClick={() => { navigate('/profile'); setIsMobileMenuOpen(false); }}
              className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3 transition cursor-pointer"
            >
              <span className="text-sm">👤</span>
              <span>Profile</span>
            </button>

            <button 
              onClick={() => { navigate('/settings'); setIsMobileMenuOpen(false); }}
              className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3 transition cursor-pointer"
            >
              <span className="text-sm">⚙️</span>
              <span>Settings</span>
            </button>
          </nav>
        </div>

        <div className="pt-3 border-t border-slate-100">
          <button 
            onClick={() => navigate('/login')}
            className="w-full py-2.5 px-3 text-rose-600 hover:bg-rose-50 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer"
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

            <h1 className="text-lg font-black text-slate-900 tracking-tight hidden sm:block">Smart Search & Catalog Filters</h1>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/notifications')}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl relative transition cursor-pointer"
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
                  <button onClick={() => navigate('/profile')} className="w-full py-2 px-3 hover:bg-slate-100 rounded-xl text-slate-700 flex items-center gap-2 transition cursor-pointer">
                    <User className="w-3.5 h-3.5 text-slate-400" /> Profile
                  </button>
                  <button onClick={() => navigate('/settings')} className="w-full py-2 px-3 hover:bg-slate-100 rounded-xl text-slate-700 flex items-center gap-2 transition cursor-pointer">
                    <Settings className="w-3.5 h-3.5 text-slate-400" /> Settings
                  </button>
                  <div className="border-t border-slate-100 my-1"></div>
                  <button onClick={() => navigate('/login')} className="w-full py-2 px-3 hover:bg-rose-50 text-rose-600 rounded-xl flex items-center gap-2 transition cursor-pointer">
                    <LogOut className="w-3.5 h-3.5" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* 3. SEARCH & FILTER DIRECTORY CONTENT */}
        <main className="flex-grow p-6 max-w-7xl mx-auto w-full space-y-6">
          
          {/* Top Search Bar & Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by role title, company, or skill..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-purple-600 transition font-medium"
              />
            </div>

            {/* Quick Filter Tag Chips (Milestone 2 Requirement) */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <button
                onClick={() => setOnlyFresherFriendly(!onlyFresherFriendly)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
                  onlyFresherFriendly ? 'bg-purple-600 text-white border-purple-600' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                🎓 Fresher Friendly
              </button>

              <button
                onClick={() => setOnlyLowCompetition(!onlyLowCompetition)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
                  onlyLowCompetition ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                ⚡ Low Competition
              </button>

              <button
                onClick={() => setOnlyRecentlyPosted(!onlyRecentlyPosted)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
                  onlyRecentlyPosted ? 'bg-purple-600 text-white border-purple-600' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                🔥 Recently Posted
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 self-end md:self-auto">
              <span className="text-xs font-bold text-slate-500 mr-2">{filteredJobs.length} Roles Found</span>
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition cursor-pointer ${viewMode === 'grid' ? 'bg-white text-purple-600 shadow-2xs' : 'text-slate-400'}`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition cursor-pointer ${viewMode === 'list' ? 'bg-white text-purple-600 shadow-2xs' : 'text-slate-400'}`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Main Grid: Left Filters Panel + Right Results Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* LEFT FILTERS SIDEBAR */}
            <div className="lg:col-span-1 bg-white border border-slate-200 rounded-3xl p-5 space-y-5 h-fit shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-purple-600" /> Advanced Filters
                </h3>
                <button 
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedRoleType('All');
                    setOnlyFresherFriendly(false);
                    setOnlyLowCompetition(false);
                    setOnlyRecentlyPosted(false);
                    setSearchQuery('');
                  }}
                  className="text-[10px] font-bold text-purple-600 hover:underline cursor-pointer"
                >
                  Reset
                </button>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1.5">Company Category</label>
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-purple-600 cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  <option value="MNCs">MNCs</option>
                  <option value="Startups">Startups</option>
                  <option value="Newly Founded">Newly Founded</option>
                  <option value="Fresher Friendly">Fresher Friendly</option>
                </select>
              </div>

              {/* Role Type */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1.5">Role Type</label>
                <select 
                  value={selectedRoleType} 
                  onChange={(e) => setSelectedRoleType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-purple-600 cursor-pointer"
                >
                  <option value="All">All Role Types</option>
                  <option value="Full-Time">Full-Time Jobs</option>
                  <option value="Internship">Internship Opportunities</option>
                </select>
              </div>

              {/* Checkbox Toggles */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input 
                    type="checkbox" 
                    checked={onlyFresherFriendly} 
                    onChange={(e) => setOnlyFresherFriendly(e.target.checked)}
                    className="w-3.5 h-3.5 accent-purple-600 rounded" 
                  />
                  <span>Fresher Friendly Roles</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input 
                    type="checkbox" 
                    checked={onlyLowCompetition} 
                    onChange={(e) => setOnlyLowCompetition(e.target.checked)}
                    className="w-3.5 h-3.5 accent-purple-600 rounded" 
                  />
                  <span>Low Competition Roles</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input 
                    type="checkbox" 
                    checked={onlyRecentlyPosted} 
                    onChange={(e) => setOnlyRecentlyPosted(e.target.checked)}
                    className="w-3.5 h-3.5 accent-purple-600 rounded" 
                  />
                  <span>Recently Posted</span>
                </label>
              </div>
            </div>

            {/* RIGHT RESULTS VIEW */}
            <div className="lg:col-span-3">
              {filteredJobs.length > 0 ? (
                <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-3"}>
                  {filteredJobs.map((job) => (
                    <div key={job.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-2xs hover:shadow-md transition space-y-3">
                      
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full">
                              {job.category}
                            </span>
                            <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                              {job.roleType}
                            </span>
                            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Clock className="w-3 h-3 text-emerald-600" /> {job.posted}
                            </span>
                          </div>
                          
                          <h3 className="text-base font-black text-slate-900">{job.title}</h3>
                          <p className="text-xs font-semibold text-slate-500 flex items-center gap-1 mt-0.5">
                            <Building2 className="w-3.5 h-3.5 text-slate-400" /> {job.company}
                          </p>
                        </div>

                        <div className="bg-purple-600 text-white text-[11px] font-black px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-xs">
                          <Sparkles className="w-3 h-3" /> {job.matchScore}%
                        </div>
                      </div>

                      {/* Metadata */}
                      <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-600 font-medium py-2 border-y border-slate-100">
                        <div className="flex items-center gap-1.5 truncate">
                          <MapPin className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                          <span className="truncate">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5 truncate">
                          <DollarSign className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span className="truncate">{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-1.5 justify-end">
                          <Users className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                          <span className="font-bold text-emerald-600">{job.competitionLevel} Risk</span>
                        </div>
                      </div>

                      {/* Matching Skill Chips */}
                      <div className="flex flex-wrap gap-1">
                        {job.matchingSkills.map((skill, i) => (
                          <span key={i} className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md">
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Action Controls */}
                      <div className="flex items-center justify-between gap-2 pt-2">
                        <button 
                          onClick={() => showToast(`Saved ${job.title}!`)}
                          className="p-2 text-slate-400 hover:text-purple-600 bg-slate-50 hover:bg-purple-50 rounded-xl transition cursor-pointer"
                          title="Save Job"
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>

                        <button 
                          onClick={() => showToast(`Applied to ${job.title}!`)}
                          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                        >
                          Apply Now <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-3">
                  <Search className="w-8 h-8 text-slate-400 mx-auto" />
                  <h3 className="text-base font-black text-slate-900">No Matching Roles Found</h3>
                  <p className="text-xs text-slate-500">Try adjusting your filters or search keywords.</p>
                </div>
              )}
            </div>

          </div>

        </main>
      </div>

    </div>
  );
}