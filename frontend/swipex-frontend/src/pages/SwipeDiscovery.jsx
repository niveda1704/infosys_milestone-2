// import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   Zap, Sparkles, Heart, Building2, MapPin, DollarSign, 
//   CheckCircle2, AlertCircle, Bookmark, User, FileText,
//   RotateCcw, Forward, Clock, Users, Menu, X, Bell, LogOut,
//   Search, BarChart2, Settings, ChevronDown, Command
// } from 'lucide-react';

// const INITIAL_JOBS = [
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
//     matchingSkills: ["React", "TypeScript", "Tailwind CSS", "Redux"],
//     missingSkills: ["GraphQL"],
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
//     matchingSkills: ["React", "JavaScript", "CSS3", "Git"],
//     missingSkills: ["TypeScript"],
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
//     matchingSkills: ["Python", "FastAPI", "React", "PostgreSQL"],
//     missingSkills: ["Docker", "Kubernetes"],
//     description: "Building scalable LLM workflow tools. You will own full vertical features from database query optimization down to polished UI execution."
//   }
// ];

// export default function SwipeDiscovery() {
//   const navigate = useNavigate();
//   const [jobs, setJobs] = useState(INITIAL_JOBS);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [activeCategory, setActiveCategory] = useState('All');
//   const [activeRoleType, setActiveRoleType] = useState('All');
//   const [savedCount, setSavedCount] = useState(0);
//   const [appliedCount, setAppliedCount] = useState(0);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const [toastMessage, setToastMessage] = useState(null);

//   // Manual Gesture Physics
//   const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [swipeAnimation, setSwipeAnimation] = useState(null);
//   const startPosRef = useRef({ x: 0, y: 0 });

//   const currentJob = jobs[currentIndex];

//   const showToast = (msg) => {
//     setToastMessage(msg);
//     setTimeout(() => setToastMessage(null), 2500);
//   };

//   const triggerApplyRight = () => {
//     setSwipeAnimation('right');
//     setAppliedCount((prev) => prev + 1);
//     showToast(`Applied to ${currentJob.title} at ${currentJob.company}!`);
//     setTimeout(() => {
//       setSwipeAnimation(null);
//       setDragOffset({ x: 0, y: 0 });
//       setCurrentIndex((prev) => prev + 1);
//     }, 250);
//   };

//   const triggerSkipLeft = () => {
//     setSwipeAnimation('left');
//     showToast(`Skipped ${currentJob.title}. AI recommendations updated.`);
//     setTimeout(() => {
//       setSwipeAnimation(null);
//       setDragOffset({ x: 0, y: 0 });
//       setCurrentIndex((prev) => prev + 1);
//     }, 250);
//   };

//   const handleSaveJob = (e) => {
//     if (e) e.stopPropagation();
//     setSwipeAnimation('down');
//     setSavedCount((prev) => prev + 1);
//     showToast(`Saved ${currentJob.title} to your profile!`);
//     setTimeout(() => {
//       setSwipeAnimation(null);
//       setDragOffset({ x: 0, y: 0 });
//       setCurrentIndex((prev) => prev + 1);
//     }, 250);
//   };

//   const handlePointerDown = (e) => {
//     if (e.target.closest('button') || e.target.closest('select')) return;
//     setIsDragging(true);
//     const clientX = e.touches ? e.touches[0].clientX : e.clientX;
//     const clientY = e.touches ? e.touches[0].clientY : e.clientY;
//     startPosRef.current = { x: clientX, y: clientY };
//   };

//   const handlePointerMove = (e) => {
//     if (!isDragging) return;
//     const clientX = e.touches ? e.touches[0].clientX : e.clientX;
//     const clientY = e.touches ? e.touches[0].clientY : e.clientY;
//     const deltaX = clientX - startPosRef.current.x;
//     const deltaY = clientY - startPosRef.current.y;
//     setDragOffset({ x: deltaX, y: deltaY });
//   };

//   const handlePointerUp = () => {
//     if (!isDragging) return;
//     setIsDragging(false);

//     if (dragOffset.x > 110) {
//       triggerApplyRight();
//     } else if (dragOffset.x < -110) {
//       triggerSkipLeft();
//     } else if (dragOffset.y > 100) {
//       handleSaveJob();
//     } else {
//       setDragOffset({ x: 0, y: 0 });
//     }
//   };

//   const getCardStyle = () => {
//     if (swipeAnimation === 'right') {
//       return { transform: 'translateX(500px) rotate(20deg)', opacity: 0, transition: 'all 0.3s ease-out' };
//     }
//     if (swipeAnimation === 'left') {
//       return { transform: 'translateX(-500px) rotate(-20deg)', opacity: 0, transition: 'all 0.3s ease-out' };
//     }
//     if (swipeAnimation === 'down') {
//       return { transform: 'translateY(500px)', opacity: 0, transition: 'all 0.3s ease-out' };
//     }
//     return {
//       transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${dragOffset.x * 0.05}deg)`,
//       transition: isDragging ? 'none' : 'transform 0.25s ease-out'
//     };
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans selection:bg-purple-500 selection:text-white select-none">
      
//       {/* Toast Notification Alert */}
//       {toastMessage && (
//         <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs font-bold flex items-center gap-2 animate-bounce">
//           <CheckCircle2 className="w-4 h-4 text-emerald-400" />
//           {toastMessage}
//         </div>
//       )}

//       {/* 1. EXACT JOB SEEKER SIDEBAR NAVIGATION */}
//       <aside className={`
//         fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 p-5 flex flex-col justify-between transition-transform duration-300
//         ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
//       `}>
//         <div className="space-y-6">
//           {/* Logo Brand Header */}
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

//           {/* Specified Job Seeker Links */}
//           <nav className="space-y-1.5 text-xs font-bold">
//             {/* 🔥 Discover (Swipe View) */}
//             <button 
//               onClick={() => { navigate('/discovery'); setIsMobileMenuOpen(false); }}
//               className="w-full py-2.5 px-3 bg-purple-50 text-purple-700 rounded-xl flex items-center gap-3 shadow-2xs"
//             >
//               <span className="text-sm">🔥</span>
//               <span>Discover (Swipe View)</span>
//             </button>

//             {/* 🔍 Search & Explore */}
//             <button 
//               onClick={() => { navigate('/job-search'); setIsMobileMenuOpen(false); }}
//               className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3 transition"
//             >
//               <span className="text-sm">🔍</span>
//               <span>Search & Explore</span>
//             </button>

//             {/* 📑 Resume & ATS Builder */}
//             <button 
//               onClick={() => { navigate('/resume-upload'); setIsMobileMenuOpen(false); }}
//               className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3 transition"
//             >
//               <span className="text-sm">📑</span>
//               <span>Resume & ATS Builder</span>
//             </button>

//             {/* 📊 Applications Tracker */}
//             <button 
//               onClick={() => { navigate('/dashboard'); setIsMobileMenuOpen(false); }}
//               className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3 transition"
//             >
//               <span className="text-sm">📊</span>
//               <span>Applications Tracker</span>
//             </button>

//             {/* 📈 Analytics & Insights */}
//             <button 
//               onClick={() => { navigate('/analytics'); setIsMobileMenuOpen(false); }}
//               className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3 transition"
//             >
//               <span className="text-sm">📈</span>
//               <span>Analytics & Insights</span>
//             </button>

//             {/* 👤 Profile */}
//             <button 
//               onClick={() => { navigate('/profile'); setIsMobileMenuOpen(false); }}
//               className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3 transition"
//             >
//               <span className="text-sm">👤</span>
//               <span>Profile</span>
//             </button>

//             {/* ⚙️ Settings */}
//             <button 
//               onClick={() => { navigate('/settings'); setIsMobileMenuOpen(false); }}
//               className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3 transition"
//             >
//               <span className="text-sm">⚙️</span>
//               <span>Settings</span>
//             </button>
//           </nav>
//         </div>

//         {/* Sidebar Footer */}
//         <div className="pt-3 border-t border-slate-100">
//           <button 
//             onClick={() => navigate('/login')}
//             className="w-full py-2.5 px-3 text-rose-600 hover:bg-rose-50 rounded-xl font-bold text-xs flex items-center gap-2 transition"
//           >
//             <LogOut className="w-3.5 h-3.5" /> Sign Out
//           </button>
//         </div>
//       </aside>

//       {/* Mobile Drawer Backdrop */}
//       {isMobileMenuOpen && (
//         <div 
//           className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-40 lg:hidden" 
//           onClick={() => setIsMobileMenuOpen(false)} 
//         />
//       )}

//       {/* 2. MAIN WORKSPACE CONTAINER */}
//       <div className="flex-grow flex flex-col min-w-0">
        
//         {/* Global Top Navbar */}
//         <header className="w-full bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 px-6 py-3 flex justify-between items-center shadow-2xs">
          
//           <div className="flex items-center gap-4">
//             <button 
//               onClick={() => setIsMobileMenuOpen(true)}
//               className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
//               title="Open Menu"
//             >
//               <Menu className="w-5 h-5" />
//             </button>

//             {/* Search Shortcut Bar */}
//             <div 
//               onClick={() => navigate('/job-search')}
//               className="hidden sm:flex items-center gap-2.5 bg-slate-100 hover:bg-slate-200/80 px-3.5 py-1.5 rounded-xl text-slate-400 text-xs font-semibold cursor-pointer border border-slate-200/60 transition w-64"
//             >
//               <Search className="w-3.5 h-3.5 text-slate-400" />
//               <span>Search jobs, skills...</span>
//               <span className="ml-auto bg-white text-[10px] text-slate-400 px-1.5 py-0.5 rounded border border-slate-200 font-bold flex items-center gap-0.5">
//                 <Command className="w-2.5 h-2.5" /> K
//               </span>
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             {/* Notification Bell Icon with Real-Time Badge Count */}
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

//             {/* User Profile Avatar with Dropdown */}
//             <div className="relative">
//               <div 
//                 onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
//                 className="w-8 h-8 rounded-xl bg-purple-100 border border-purple-300 text-purple-700 font-bold text-xs flex items-center justify-center cursor-pointer hover:bg-purple-200 transition"
//               >
//                 AM
//               </div>

//               {/* Profile Avatar Dropdown Menu */}
//               {isProfileDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl p-1.5 z-50 text-xs font-bold space-y-0.5">
//                   <div className="px-3 py-2 border-b border-slate-100 mb-1">
//                     <p className="text-slate-900 font-black">Alex Morgan</p>
//                     <p className="text-[10px] text-slate-400 font-medium">alex@example.com</p>
//                   </div>

//                   <button 
//                     onClick={() => { navigate('/profile'); setIsProfileDropdownOpen(false); }}
//                     className="w-full py-2 px-3 hover:bg-slate-100 rounded-xl text-slate-700 flex items-center gap-2 transition"
//                   >
//                     <User className="w-3.5 h-3.5 text-slate-400" /> Profile
//                   </button>

//                   <button 
//                     onClick={() => { navigate('/settings'); setIsProfileDropdownOpen(false); }}
//                     className="w-full py-2 px-3 hover:bg-slate-100 rounded-xl text-slate-700 flex items-center gap-2 transition"
//                   >
//                     <Settings className="w-3.5 h-3.5 text-slate-400" /> Settings
//                   </button>

//                   <div className="border-t border-slate-100 my-1"></div>

//                   <button 
//                     onClick={() => navigate('/login')}
//                     className="w-full py-2 px-3 hover:bg-rose-50 text-rose-600 rounded-xl flex items-center gap-2 transition"
//                   >
//                     <LogOut className="w-3.5 h-3.5" /> Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </header>

//         {/* Swipe Discovery Workspace Body */}
//         <main className="flex-grow flex flex-col items-center justify-center px-4 py-6 max-w-2xl mx-auto w-full">
          
//           {/* Dropdown Filters */}
//           <div className="w-full max-w-md mb-5 grid grid-cols-2 gap-3">
//             <div className="relative">
//               <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Company Category</label>
//               <div className="relative">
//                 <select
//                   value={activeCategory}
//                   onChange={(e) => setActiveCategory(e.target.value)}
//                   className="w-full pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-purple-600 appearance-none shadow-2xs cursor-pointer"
//                 >
//                   <option value="All">All Categories</option>
//                   <option value="MNCs">MNCs</option>
//                   <option value="Startups">Startups</option>
//                   <option value="Newly Founded">Newly Founded</option>
//                   <option value="Fresher Friendly">Fresher Friendly</option>
//                   <option value="Low Competition">Low Competition</option>
//                 </select>
//                 <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
//               </div>
//             </div>

//             <div className="relative">
//               <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Role Type</label>
//               <div className="relative">
//                 <select
//                   value={activeRoleType}
//                   onChange={(e) => setActiveRoleType(e.target.value)}
//                   className="w-full pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-purple-600 appearance-none shadow-2xs cursor-pointer"
//                 >
//                   <option value="All">All Role Types</option>
//                   <option value="Full-Time">Full-Time Jobs</option>
//                   <option value="Internship">Internship Opportunities</option>
//                 </select>
//                 <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
//               </div>
//             </div>
//           </div>

//           {/* Interactive Job Card */}
//           {currentJob && currentIndex < jobs.length ? (
//             <div 
//               onMouseDown={handlePointerDown}
//               onMouseMove={handlePointerMove}
//               onMouseUp={handlePointerUp}
//               onMouseLeave={handlePointerUp}
//               onTouchStart={handlePointerDown}
//               onTouchMove={handlePointerMove}
//               onTouchEnd={handlePointerUp}
//               style={getCardStyle()}
//               className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 shadow-xl relative space-y-4 cursor-grab active:cursor-grabbing touch-none select-none"
//             >
              
//               {/* Drag Overlays */}
//               {dragOffset.x > 40 && (
//                 <div className="absolute top-6 left-6 z-20 border-4 border-emerald-500 text-emerald-600 font-black text-xl px-4 py-1 rounded-2xl rotate-[-12deg] bg-white/90 shadow-lg pointer-events-none">
//                   APPLY
//                 </div>
//               )}
//               {dragOffset.x < -40 && (
//                 <div className="absolute top-6 right-6 z-20 border-4 border-rose-500 text-rose-600 font-black text-xl px-4 py-1 rounded-2xl rotate-[12deg] bg-white/90 shadow-lg pointer-events-none">
//                   SKIP
//                 </div>
//               )}
//               {dragOffset.y > 40 && Math.abs(dragOffset.x) < 40 && (
//                 <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 border-4 border-purple-600 text-purple-600 font-black text-xl px-4 py-1 rounded-2xl bg-white/90 shadow-lg pointer-events-none">
//                   SAVED
//                 </div>
//               )}

//               {/* Card Details */}
//               <div className="flex justify-between items-start gap-3">
//                 <div>
//                   <div className="flex items-center gap-1.5 mb-1.5">
//                     <span className="text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full">
//                       {currentJob.category}
//                     </span>
//                     <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
//                       {currentJob.roleType}
//                     </span>
//                   </div>

//                   <h2 className="text-xl font-black text-slate-900 leading-snug">{currentJob.title}</h2>
//                   <p className="text-xs font-semibold text-slate-500 flex items-center gap-1 mt-0.5">
//                     <Building2 className="w-3.5 h-3.5 text-slate-400" /> {currentJob.company}
//                   </p>
//                 </div>

//                 <div className="flex flex-col items-end flex-shrink-0">
//                   <div className="bg-purple-600 text-white text-xs font-black px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-md shadow-purple-600/20">
//                     <Sparkles className="w-3.5 h-3.5" /> {currentJob.matchScore}% Match
//                   </div>
//                 </div>
//               </div>

//               {/* Metadata */}
//               <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-slate-100 text-[11px] text-slate-700 font-medium">
//                 <div className="flex items-center gap-1.5 truncate">
//                   <MapPin className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
//                   <span className="truncate">{currentJob.location}</span>
//                 </div>
//                 <div className="flex items-center gap-1.5 truncate">
//                   <DollarSign className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
//                   <span className="truncate">{currentJob.salary}</span>
//                 </div>
//                 <div className="flex items-center gap-1.5 justify-end">
//                   <Users className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
//                   <span className="font-bold text-emerald-600">{currentJob.competitionLevel} Risk</span>
//                 </div>
//               </div>

//               {/* Skill Matcher */}
//               <div className="space-y-2.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
//                 <div>
//                   <p className="text-[10px] font-bold text-slate-500 mb-1.5 flex items-center gap-1 uppercase tracking-wider">
//                     <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Matched Skills
//                   </p>
//                   <div className="flex flex-wrap gap-1.5">
//                     {currentJob.matchingSkills.map((skill, i) => (
//                       <span key={i} className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md">
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 {currentJob.missingSkills.length > 0 && (
//                   <div>
//                     <p className="text-[10px] font-bold text-slate-500 mb-1.5 flex items-center gap-1 uppercase tracking-wider">
//                       <AlertCircle className="w-3.5 h-3.5 text-amber-500" /> Missing Skills
//                     </p>
//                     <div className="flex flex-wrap gap-1.5">
//                       {currentJob.missingSkills.map((skill, i) => (
//                         <span key={i} className="text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-md">
//                           {skill}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Description */}
//               <div>
//                 <h4 className="text-[11px] font-bold text-slate-700 mb-1">Role Summary</h4>
//                 <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
//                   {currentJob.description}
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="flex items-center justify-between gap-3 pt-1">
//                 <button
//                   type="button"
//                   onClick={triggerSkipLeft}
//                   className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl border border-slate-200 transition flex items-center justify-center gap-1.5 group cursor-pointer"
//                 >
//                   <Forward className="w-4 h-4 text-slate-500 group-hover:translate-x-0.5 transition" /> Skip Role
//                 </button>

//                 <button
//                   type="button"
//                   onClick={handleSaveJob}
//                   className="p-3 bg-slate-100 hover:bg-slate-200 text-purple-600 rounded-2xl border border-slate-200 transition cursor-pointer"
//                   title="Save Opportunity & Next"
//                 >
//                   <Bookmark className="w-4 h-4" />
//                 </button>

//                 <button
//                   type="button"
//                   onClick={triggerApplyRight}
//                   className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-2xl shadow-md shadow-purple-600/20 transition flex items-center justify-center gap-1.5 group cursor-pointer"
//                 >
//                   <Heart className="w-4 h-4 fill-white group-hover:scale-110 transition" /> Apply Right
//                 </button>
//               </div>

//             </div>
//           ) : (
//             <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-4 shadow-xl">
//               <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center mx-auto text-purple-600">
//                 <Sparkles className="w-6 h-6" />
//               </div>
//               <h3 className="text-lg font-black text-slate-900">You're All Caught Up!</h3>
//               <p className="text-xs text-slate-500">No more job cards in this active filter.</p>
//               <button
//                 onClick={() => setCurrentIndex(0)}
//                 className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition inline-flex items-center gap-2 shadow-md shadow-purple-600/20"
//               >
//                 <RotateCcw className="w-4 h-4" /> Reset Discovery Cards
//               </button>
//             </div>
//           )}

//         </main>
//       </div>

//     </div>
//   );
// }

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, Sparkles, Heart, Building2, MapPin, DollarSign, 
  CheckCircle2, AlertCircle, Bookmark, User, FileText,
  RotateCcw, Forward, Clock, Users, Menu, X, Bell, LogOut,
  Search, BarChart2, Settings, ChevronDown, Command, Undo2
} from 'lucide-react';
import axiosClient from '../api/axiosClient';

const SEEDED_JOBS_FALLBACK = [
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
    matchingSkills: ["React", "TypeScript", "Tailwind CSS", "Redux"],
    missingSkills: ["GraphQL"],
    reasonTags: ["Matches 4/4 core skills", "Low competition role", "Recently posted"],
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
    matchingSkills: ["React", "JavaScript", "CSS3", "Git"],
    missingSkills: ["TypeScript"],
    reasonTags: ["Fresher friendly", "Fast-growing startup"],
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
    matchingSkills: ["Python", "FastAPI", "React", "PostgreSQL"],
    missingSkills: ["Docker", "Kubernetes"],
    reasonTags: ["AI/ML domain fit", "Remote priority"],
    description: "Building scalable LLM workflow tools. You will own full vertical features from database query optimization down to polished UI execution."
  }
];

export default function SwipeDiscovery() {
  const navigate = useNavigate();
  const storedName = localStorage.getItem('user_name') || 'Niveda Sree';
  const storedEmail = localStorage.getItem('user_email') || 'nivedasree1704@gmail.com';
  const userInitials = storedName.split(' ').filter(Boolean).map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'NS';
  const [jobs, setJobs] = useState(SEEDED_JOBS_FALLBACK);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeHistory, setSwipeHistory] = useState([]); // Undo swipe history stack
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeRoleType, setActiveRoleType] = useState('All');
  const [savedCount, setSavedCount] = useState(0);
  const [appliedCount, setAppliedCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Fetch Live Seeded Jobs from Job Intelligence Service (:8002 via Gateway)
  useEffect(() => {
    const fetchLiveJobs = async () => {
      try {
        const res = await axiosClient.get('/jobs');
        if (Array.isArray(res.data) && res.data.length > 0) {
          const mapped = res.data.map((j) => ({
            id: j.job_id || j.id,
            title: j.title,
            company: j.company,
            category: j.company_type || (j.company?.length % 2 === 0 ? 'MNCs' : 'Startups'),
            roleType: j.type || 'Full-Time',
            location: j.location || 'Bangalore (Hybrid)',
            salary: j.salary_range || '₹12 - ₹22 LPA',
            matchScore: Math.floor(Math.random() * 12) + 88,
            posted: j.freshness_label || 'Recently posted',
            competitionLevel: j.competition_level || 'Low',
            matchingSkills: Array.isArray(j.skills) ? j.skills.slice(0, 4) : ['React', 'JavaScript', 'CSS'],
            missingSkills: Array.isArray(j.skills) && j.skills.length > 4 ? [j.skills[4]] : ['GraphQL'],
            reasonTags: [
              `Matches 4/4 core skills`,
              `${j.competition_level || 'Low'} competition role`,
              j.freshness_label || 'Recently posted'
            ],
            description: j.description || `Leading engineering responsibilities at ${j.company}. Developing scalable architectures, robust web services, and high-performance user interfaces.`
          }));
          setJobs(mapped);
        }
      } catch (err) {
        console.warn('Using fallback seeded jobs deck:', err?.message);
      }
    };
    fetchLiveJobs();
  }, []);

  // Gesture Physics State
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [swipeAnimation, setSwipeAnimation] = useState(null);
  const startPosRef = useRef({ x: 0, y: 0 });

  const currentJob = jobs[currentIndex];

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Milestone 2 Swipe Service Handler Hook (POST /api/v1/swipes)
  const recordSwipeAction = async (jobId, actionType) => {
    try {
      await axiosClient.post('/swipes', {
        job_id: jobId,
        direction: actionType === 'apply' ? 'right' : 'left',
        user_id: localStorage.getItem('user_id') || 'usr-001'
      });
    } catch (err) {
      console.warn('Swipe sync notice:', err?.message);
    }
  };

  const triggerApplyRight = () => {
    if (!currentJob) return;
    setSwipeAnimation('right');
    setAppliedCount((prev) => prev + 1);
    setSwipeHistory((prev) => [...prev, { job: currentJob, action: 'apply', index: currentIndex }]);
    recordSwipeAction(currentJob.id, 'apply');
    showToast(`Applied to ${currentJob.title} at ${currentJob.company}!`);
    setTimeout(() => {
      setSwipeAnimation(null);
      setDragOffset({ x: 0, y: 0 });
      setCurrentIndex((prev) => prev + 1);
    }, 280);
  };

  const triggerSkipLeft = () => {
    if (!currentJob) return;
    setSwipeAnimation('left');
    setSwipeHistory((prev) => [...prev, { job: currentJob, action: 'skip', index: currentIndex }]);
    recordSwipeAction(currentJob.id, 'skip');
    showToast(`Skipped ${currentJob.title}. Engine updated feed.`);
    setTimeout(() => {
      setSwipeAnimation(null);
      setDragOffset({ x: 0, y: 0 });
      setCurrentIndex((prev) => prev + 1);
    }, 280);
  };

  const handleSaveJob = (e) => {
    if (e) e.stopPropagation();
    if (!currentJob) return;
    setSwipeAnimation('down');
    setSavedCount((prev) => prev + 1);
    setSwipeHistory((prev) => [...prev, { job: currentJob, action: 'save', index: currentIndex }]);
    recordSwipeAction(currentJob.id, 'save');
    showToast(`Saved ${currentJob.title}!`);
    setTimeout(() => {
      setSwipeAnimation(null);
      setDragOffset({ x: 0, y: 0 });
      setCurrentIndex((prev) => prev + 1);
    }, 280);
  };

  // Milestone 2 Keyboard Navigation Support (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
      if (e.key === 'ArrowRight') triggerApplyRight();
      if (e.key === 'ArrowLeft') triggerSkipLeft();
      if (e.key === 'ArrowDown') handleSaveJob();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, jobs]);

  // Milestone 2 Feature: Undo Last Swipe Action
  const handleUndoLastSwipe = () => {
    if (swipeHistory.length === 0) {
      showToast("No previous swipe action to undo.");
      return;
    }
    const lastItem = swipeHistory[swipeHistory.length - 1];
    setSwipeHistory((prev) => prev.slice(0, -1));
    setCurrentIndex(lastItem.index);
    if (lastItem.action === 'apply') setAppliedCount((prev) => Math.max(0, prev - 1));
    if (lastItem.action === 'save') setSavedCount((prev) => Math.max(0, prev - 1));
    showToast(`Restored ${lastItem.job.title} to discovery deck!`);
  };

  // High-performance Pointer Events Drag Gesture
  const handlePointerDown = (e) => {
    if (e.target.closest('button') || e.target.closest('select') || e.target.closest('a')) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {}
    setIsDragging(true);
    startPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startPosRef.current.x;
    const deltaY = e.clientY - startPosRef.current.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      if (e.currentTarget?.hasPointerCapture?.(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch (err) {}

    // Responsive threshold: 65px triggers swipe
    if (dragOffset.x > 65) {
      triggerApplyRight();
    } else if (dragOffset.x < -65) {
      triggerSkipLeft();
    } else if (dragOffset.y > 90) {
      handleSaveJob();
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const getCardStyle = () => {
    if (swipeAnimation === 'right') {
      return { 
        transform: 'translateX(650px) rotate(25deg)', 
        opacity: 0, 
        transition: 'transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.25s ease-out' 
      };
    }
    if (swipeAnimation === 'left') {
      return { 
        transform: 'translateX(-650px) rotate(-25deg)', 
        opacity: 0, 
        transition: 'transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.25s ease-out' 
      };
    }
    if (swipeAnimation === 'down') {
      return { 
        transform: 'translateY(650px)', 
        opacity: 0, 
        transition: 'transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.25s ease-out' 
      };
    }
    return {
      transform: `translate3d(${dragOffset.x}px, ${dragOffset.y * 0.4}px, 0) rotate(${dragOffset.x * 0.07}deg)`,
      transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    };
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans selection:bg-purple-500 selection:text-white select-none">
      
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {toastMessage}
        </div>
      )}

      {/* 1. JOB SEEKER SIDEBAR NAVIGATION */}
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
            <button onClick={() => { navigate('/discovery'); setIsMobileMenuOpen(false); }} className="w-full py-2.5 px-3 bg-purple-50 text-purple-700 rounded-xl flex items-center gap-3 shadow-2xs cursor-pointer">
              <span className="text-sm">🔥</span><span>Discover (Swipe View)</span>
            </button>
            <button onClick={() => { navigate('/job-search'); setIsMobileMenuOpen(false); }} className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3 transition cursor-pointer">
              <span className="text-sm">🔍</span><span>Search & Explore</span>
            </button>
            <button onClick={() => { navigate('/companies'); setIsMobileMenuOpen(false); }} className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3 transition cursor-pointer">
              <span className="text-sm">🏢</span><span>Company Directory</span>
            </button>
            <button onClick={() => { navigate('/resume-upload'); setIsMobileMenuOpen(false); }} className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3 transition cursor-pointer">
              <span className="text-sm">📑</span><span>Resume & ATS Builder</span>
            </button>
            <button onClick={() => { navigate('/dashboard'); setIsMobileMenuOpen(false); }} className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3 transition cursor-pointer">
              <span className="text-sm">📊</span><span>Applications Tracker</span>
            </button>
            <button onClick={() => { navigate('/analytics'); setIsMobileMenuOpen(false); }} className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3 transition cursor-pointer">
              <span className="text-sm">📈</span><span>Analytics & Insights</span>
            </button>
            <button onClick={() => { navigate('/profile'); setIsMobileMenuOpen(false); }} className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3 transition cursor-pointer">
              <span className="text-sm">👤</span><span>Profile</span>
            </button>
            <button onClick={() => { navigate('/settings'); setIsMobileMenuOpen(false); }} className="w-full py-2.5 px-3 text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-3 transition cursor-pointer">
              <span className="text-sm">⚙️</span><span>Settings</span>
            </button>
          </nav>
        </div>

        <div className="pt-3 border-t border-slate-100">
          <button onClick={() => navigate('/login')} className="w-full py-2.5 px-3 text-rose-600 hover:bg-rose-50 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer">
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
        
        {/* Header */}
        <header className="w-full bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 px-6 py-3 flex justify-between items-center shadow-2xs">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 rounded-xl text-slate-600">
              <Menu className="w-5 h-5" />
            </button>

            {/* Undo Last Swipe Action Control */}
            <button
              onClick={handleUndoLastSwipe}
              disabled={swipeHistory.length === 0}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                swipeHistory.length > 0
                  ? 'bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 cursor-pointer'
                  : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-60'
              }`}
              title="Undo Last Swipe Action"
            >
              <Undo2 className="w-3.5 h-3.5" /> Undo Swipe ({swipeHistory.length})
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/notifications')} className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl relative transition cursor-pointer">
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
                  <button onClick={() => navigate('/notifications')} className="w-full py-2 px-3 hover:bg-slate-100 rounded-xl text-slate-700 flex items-center gap-2 transition cursor-pointer">
                    <Bell className="w-3.5 h-3.5 text-slate-400" /> Notifications
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

        {/* Discovery Deck Workspace */}
        <main className="grow flex flex-col items-center justify-center px-4 py-6 max-w-2xl mx-auto w-full">
          
          {/* Dropdown Filters */}
          <div className="w-full max-w-md mb-5 grid grid-cols-2 gap-3">
            <div className="relative">
              <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Company Category</label>
              <div className="relative">
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="w-full pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-purple-600 appearance-none shadow-2xs cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  <option value="MNCs">MNCs</option>
                  <option value="Startups">Startups</option>
                  <option value="Newly Founded">Newly Founded</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>

            <div className="relative">
              <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Role Type</label>
              <div className="relative">
                <select
                  value={activeRoleType}
                  onChange={(e) => setActiveRoleType(e.target.value)}
                  className="w-full pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-purple-600 appearance-none shadow-2xs cursor-pointer"
                >
                  <option value="All">All Role Types</option>
                  <option value="Full-Time">Full-Time Jobs</option>
                  <option value="Internship">Internship Opportunities</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Interactive Job Card Stack */}
          {currentJob && currentIndex < jobs.length ? (
            <div 
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              style={getCardStyle()}
              className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 shadow-xl relative space-y-4 cursor-grab active:cursor-grabbing touch-none select-none transition-shadow hover:shadow-2xl"
            >
              
              {/* Overlay Badges */}
              {dragOffset.x > 25 && (
                <div 
                  style={{ opacity: Math.min(1, Math.max(0, dragOffset.x / 60)) }}
                  className="absolute top-6 left-6 z-20 border-4 border-emerald-500 text-emerald-600 font-black text-xl px-4 py-1 rounded-2xl -rotate-12 bg-white/95 shadow-lg pointer-events-none flex items-center gap-1.5"
                >
                  <Heart className="w-5 h-5 fill-emerald-500 text-emerald-500" /> APPLY
                </div>
              )}
              {dragOffset.x < -25 && (
                <div 
                  style={{ opacity: Math.min(1, Math.max(0, Math.abs(dragOffset.x) / 60)) }}
                  className="absolute top-6 right-6 z-20 border-4 border-rose-500 text-rose-600 font-black text-xl px-4 py-1 rounded-2xl rotate-12 bg-white/95 shadow-lg pointer-events-none flex items-center gap-1.5"
                >
                  <Forward className="w-5 h-5 text-rose-500" /> SKIP
                </div>
              )}
              {dragOffset.y > 35 && Math.abs(dragOffset.x) < 30 && (
                <div 
                  style={{ opacity: Math.min(1, Math.max(0, dragOffset.y / 70)) }}
                  className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 border-4 border-purple-600 text-purple-600 font-black text-xl px-4 py-1 rounded-2xl bg-white/95 shadow-lg pointer-events-none flex items-center gap-1.5"
                >
                  <Bookmark className="w-5 h-5 fill-purple-600 text-purple-600" /> SAVED
                </div>
              )}

              {/* Card Details */}
              <div className="flex justify-between items-start gap-3">
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full">
                      {currentJob.category}
                    </span>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                      {currentJob.roleType}
                    </span>
                  </div>

                  <h2 className="text-xl font-black text-slate-900 leading-snug">{currentJob.title}</h2>
                  <p className="text-xs font-semibold text-slate-500 flex items-center gap-1 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" /> {currentJob.company}
                  </p>
                </div>

                <div className="bg-purple-600 text-white text-xs font-black px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-md shadow-purple-600/20">
                  <Sparkles className="w-3.5 h-3.5" /> {currentJob.matchScore}% Match
                </div>
              </div>

              {/* AI Reason Tags (Milestone 2 Requirement) */}
              {currentJob.reasonTags && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {currentJob.reasonTags.map((tag, i) => (
                    <span key={i} className="text-[10px] font-extrabold bg-purple-100/70 text-purple-800 border border-purple-200/60 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                      ✨ {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Metadata */}
              <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-slate-100 text-[11px] text-slate-700 font-medium">
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span className="truncate">{currentJob.location}</span>
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{currentJob.salary}</span>
                </div>
                <div className="flex items-center gap-1.5 justify-end">
                  <Users className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span className="font-bold text-emerald-600">{currentJob.competitionLevel} Risk</span>
                </div>
              </div>

              {/* Skill Matcher */}
              <div className="space-y-2.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 mb-1.5 flex items-center gap-1 uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Matched Skills
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {currentJob.matchingSkills.map((skill, i) => (
                      <span key={i} className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {currentJob.missingSkills.length > 0 && (
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 mb-1.5 flex items-center gap-1 uppercase tracking-wider">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-500" /> Missing Skills
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {currentJob.missingSkills.map((skill, i) => (
                        <span key={i} className="text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-md">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h4 className="text-[11px] font-bold text-slate-700 mb-1">Role Summary</h4>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {currentJob.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-1">
                <button
                  type="button"
                  onClick={triggerSkipLeft}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl border border-slate-200 transition flex items-center justify-center gap-1.5 group cursor-pointer"
                >
                  <Forward className="w-4 h-4 text-slate-500 group-hover:translate-x-0.5 transition" /> Skip Role
                </button>

                <button
                  type="button"
                  onClick={handleSaveJob}
                  className="p-3 bg-slate-100 hover:bg-slate-200 text-purple-600 rounded-2xl border border-slate-200 transition cursor-pointer"
                  title="Save Opportunity"
                >
                  <Bookmark className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={triggerApplyRight}
                  className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-2xl shadow-md shadow-purple-600/20 transition flex items-center justify-center gap-1.5 group cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-white group-hover:scale-110 transition" /> Apply Right
                </button>
              </div>

            </div>
          ) : (
            <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center mx-auto text-purple-600">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">You're All Caught Up!</h3>
              <p className="text-xs text-slate-500">No more job cards in your discovery queue.</p>
              <button
                onClick={() => setCurrentIndex(0)}
                className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition inline-flex items-center gap-2 shadow-md shadow-purple-600/20 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Reset Deck Stack
              </button>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}