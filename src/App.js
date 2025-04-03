import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import JobListings from './components/JobListings/JobListings';
import CompanyShowcase from './components/CompanyShowcase/CompanyShowcase';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';

import AdminEmployees from './pages/AdminEmployees';
import AddJob from './pages/AddJob';
import AdminDashboard from './pages/AdminDashboard'; // ✅ add this

import { ProtectedRoute } from './routes/ProtectedRoute';

function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <BrowserRouter>
      {user && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/jobs" element={
          <ProtectedRoute allowedRoles={['employee']}>
            <JobListings />
          </ProtectedRoute>
        } />
        <Route path="/companies" element={
          <ProtectedRoute allowedRoles={['employee']}>
            <CompanyShowcase />
          </ProtectedRoute>
        } />
        <Route path="/about" element={
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        } />
        <Route path="/contact" element={
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        } />
        <Route path="/employees" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminEmployees />
          </ProtectedRoute>
        } />
        <Route path="/add-job" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AddJob />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
