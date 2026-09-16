import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Public Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';

// Candidate Portal Pages
import SwipeDiscovery from './pages/SwipeDiscovery';
import JobSearch from './pages/JobSearch';
import CompanyProfile from './pages/CompanyProfile';
import ResumeUpload from './pages/ResumeUpload';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';

// Recruiter Portal Pages
import RecruiterDashboard from './pages/RecruiterDashboard';
import PostJob from './pages/PostJob';
import AtsRanker from './pages/AtsRanker';
import CandidateReview from './pages/CandidateReview';

// Admin Portal Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public & Auth Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Candidate Portal Routes */}
        <Route path="/discovery" element={<SwipeDiscovery />} />
        <Route path="/job-search" element={<JobSearch />} />
        <Route path="/companies" element={<CompanyProfile />} />
        <Route path="/resume-upload" element={<ResumeUpload />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />

        {/* Recruiter Portal Routes */}
        <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/ats-ranker" element={<AtsRanker />} />
        <Route path="/candidate-review" element={<CandidateReview />} />

        {/* Admin Portal Routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-users" element={<AdminUsers />} />
        {/* Fallback Catch-All Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}