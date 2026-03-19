import React from 'react';
import Footer from './components/Footer';
import ForgotPassword from './pages/ForgotPassword';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UploadDetect from './pages/UploadDetect';
import Doctors from './pages/Doctors';
import Tips from './pages/Tips';
import logo from './assets/SkinVisionLogoo.png';
import bg1 from './assets/bg2.jpg';
import ChatBot from './pages/ChatBot';

function PrivateRoute({ children }) {
  const loggedIn = localStorage.getItem('loggedIn') === 'true';
  return loggedIn ? children : <Navigate to="/login" />;
}

function Header({ loggedIn, i18n, changeLanguage }) {
  const navigate = useNavigate();
  return (
    <header style={{
      width: '100%',
      height: 50, // slim bar
      background: 'rgba(71, 158, 216, 0.85)',
      backdropFilter: 'blur(15px)',
      boxShadow: '0 2px 12px #0001',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 10px'
    }}>
      {/* Left: Logo + Name */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="Skin Vision Logo" style={{ height: 35, marginRight: 6 }} />
        <span style={{
          fontWeight: 700,
          fontSize: 16,
          color: '#fff',
          fontFamily: 'Cairo, Segoe UI, Arial, sans-serif'
        }}>
          Safe Skin
        </span>
      </div>
      {/* Right: Language + Logout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <button
          onClick={() => changeLanguage('en')}
          style={{
            background: i18n.language === 'en' ? 'rgba(7, 73, 241, 0.85)' : '#fff',
            color: i18n.language === 'en' ? '#fff' : 'rgba(7, 73, 241, 0.85)',
            border: 'none',
            borderRadius: 20,
            padding: '8px 15px',
            fontWeight: 600,
            fontSize: 11,
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            boxShadow: i18n.language === 'en' ? '0 2px 8px #388e3c22' : 'none'
          }}
        >EN</button>
        <button
          onClick={() => changeLanguage('ar')}
          style={{
            background: i18n.language === 'ar' ? 'rgba(7, 73, 241, 0.85)' : '#fff',
            color: i18n.language === 'ar' ? '#fff' : 'rgba(7, 73, 241, 0.85)',
            border: 'none',
            borderRadius: 20,
            padding: '8px 15px',
            fontWeight: 600,
            fontSize: 11,
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            boxShadow: i18n.language === 'ar' ? '0 2px 8pxrgba(5, 142, 233, 0.13)' : 'none'
          }}
        >AR</button>
        {loggedIn && (
          <button
            onClick={() => {
              localStorage.removeItem('loggedIn');
              navigate('/login');
            }}
            style={{
              background: '#e53935',
              color: '#fff',
              border: 'none',
              borderRadius: 20,
              padding: '8px 15px',
              fontWeight: 600,
              fontSize: 13,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              marginInlineStart: 20
            }}
          >
            {i18n.language === 'ar' ? 'خروج' : 'Logout'}
          </button>
        )}
      </div>
    </header>
  );
}

function App() {
  const { i18n } = useTranslation();
  const loggedIn = localStorage.getItem('loggedIn') === 'true';

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.body.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        minWidth: '100vw',
        background: `url(${bg1}) center center / cover no-repeat fixed`,
        position: 'relative'
      }}
    >
      <Router>
        <Header loggedIn={loggedIn} i18n={i18n} changeLanguage={changeLanguage} />
        <main style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 150 // a bit more than header height for spacing
        }}>
          <div style={{
            width: '100%',
            maxWidth: 1300,
            background: 'rgba(255,255,255,0.6)',
            borderRadius: 40,
            boxShadow: '0 4px 24px #0001',
            padding: 40,
            minHeight: 400,
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            border: '1px solid rgba(255,255,255,0.3)'
          }}>
            <Routes>
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/upload-detect" element={<PrivateRoute><UploadDetect /></PrivateRoute>} />
              <Route path="/doctors" element={<PrivateRoute><Doctors /></PrivateRoute>} />
              <Route path="/tips" element={<PrivateRoute><Tips /></PrivateRoute>} />
              <Route path="/chatbot" element={<PrivateRoute><ChatBot /></PrivateRoute>} />
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;