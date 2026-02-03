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

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/business" element={<Business />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/brain" element={<DigitalBrain />} />
          <Route path="/studio" element={<ImageStudio />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;