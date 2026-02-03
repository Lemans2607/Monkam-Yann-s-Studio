import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Students from './pages/Students';
import Business from './pages/Business';
import Admin from './pages/Admin';
import DigitalBrain from './pages/DigitalBrain';
import ImageStudio from './pages/ImageStudio';
import Login from './pages/Login';
import Privacy from './pages/Privacy';
import FAQ from './pages/FAQ';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import { UserRole } from './types';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/faq" element={<FAQ />} />
              
              {/* Protected Student Routes */}
              <Route path="/students" element={
                <ProtectedRoute allowedRoles={[UserRole.STUDENT, UserRole.ADMIN]}>
                  <Students />
                </ProtectedRoute>
              } />

              {/* Protected Business Routes */}
              <Route path="/business" element={
                <ProtectedRoute allowedRoles={[UserRole.BUSINESS, UserRole.ADMIN]}>
                  <Business />
                </ProtectedRoute>
              } />

              {/* Protected General AI Tools (Any Authenticated User) */}
              <Route path="/brain" element={
                <ProtectedRoute allowedRoles={[UserRole.STUDENT, UserRole.BUSINESS, UserRole.ADMIN]}>
                  <DigitalBrain />
                </ProtectedRoute>
              } />
              
              <Route path="/studio" element={
                <ProtectedRoute allowedRoles={[UserRole.STUDENT, UserRole.BUSINESS, UserRole.ADMIN]}>
                  <ImageStudio />
                </ProtectedRoute>
              } />

              {/* Protected Admin Route */}
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                  <Admin />
                </ProtectedRoute>
              } />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;