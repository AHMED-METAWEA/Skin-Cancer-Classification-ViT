import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { signup } from '../authService';

function Signup() {
  const { i18n } = useTranslation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (fullName && email && password) {
      try {
        await signup(email, password);
        // Optionally, save fullName to Firestore if you want (let me know if you want this)
        localStorage.setItem('loggedIn', 'true'); // Optional: for your own logic
        navigate('/');
      } catch (err) {
        setError(i18n.language === 'ar' ? 'حدث خطأ أثناء إنشاء الحساب' : 'Error creating account: ' + err.message);
      }
    } else {
      setError(i18n.language === 'ar' ? 'يرجى إدخال الاسم الكامل والبريد وكلمة المرور' : 'Please enter full name, email, and password');
    }
  };

  return (
    <div style={{
      width: '100%',
      minHeight: 450,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        width: 450,
        background: '#f8fafc',
        borderRadius: 40,
        boxShadow: '0 2px 12px #0001',
        padding: '36px 28px',
        margin: 'auto'
      }}>
        <h2 style={{
          textAlign: 'center',
          color: '#333',
          fontWeight: 700,
          marginBottom: 8,
          letterSpacing: 1
        }}>
          {i18n.language === 'ar' ? 'إنشاء حساب Safe Skin الخاص بك' : 'Create Your Safe Skin Account'}
        </h2>
        <p style={{
          textAlign: 'center',
          color: '#555',
          marginBottom: 28,
          fontSize: 16
        }}>
          {i18n.language === 'ar' ? 'انضم إلى Safe Skin لتتبع صحة بشرتك بكفاءة.' : 'Join Safe Skin to track your skin health efficiently.'}
        </p>
        <form onSubmit={handleSignup}>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 500, color: '#333', marginBottom: 6, display: 'block' }}>
              {i18n.language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
            </label>
            <input
              type="text"
              placeholder={i18n.language === 'ar' ? 'الاسم الكامل' : 'John Doe'}
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              style={{
                width: '100%',
                padding: '13px 12px',
                borderRadius: 40,
                border: '1px solid #bdbdbd',
                background: '#fff',
                fontSize: 16,
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 500, color: '#333', marginBottom: 6, display: 'block' }}>
              {i18n.language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
            </label>
            <input
              type="email"
              placeholder={i18n.language === 'ar' ? 'البريد الإلكتروني' : 'john.doe@example.com'}
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '13px 12px',
                borderRadius: 40,
                border: '1px solid #bdbdbd',
                background: '#fff',
                fontSize: 16,
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <label style={{ fontWeight: 500, color: '#333', marginBottom: 6, display: 'block' }}>
              {i18n.language === 'ar' ? 'كلمة المرور' : 'Password'}
            </label>
            <input
              type="password"
              placeholder={i18n.language === 'ar' ? 'كلمة المرور' : 'Password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '13px 12px',
                borderRadius: 40,
                border: '1px solid #bdbdbd',
                background: '#fff',
                fontSize: 16,
                boxSizing: 'border-box'
              }}
            />
          </div>
          {error && <div style={{ color: 'red', marginBottom: 12, fontSize: 14 }}>{error}</div>}
          <button type="submit" style={{
            width: '100%',
            background: 'rgba(7, 73, 241, 0.85)',
            color: '#fff',
            border: 'none',
            borderRadius: 40,
            padding: '12px 0',
            fontWeight: 600,
            fontSize: 18,
            marginTop: 16,
            cursor: 'pointer'
          }}>
            {i18n.language === 'ar' ? 'إنشاء حساب' : 'Sign Up'}
          </button>
        </form>
        <div style={{ marginTop: 24, textAlign: 'center', fontSize: 14 }}>
          {i18n.language === 'ar' ? 'لديك حساب بالفعل؟' : "Already have an account?"}
          <button
            style={{
              marginLeft: 4,
              background: 'none',
              color: 'rgba(7, 73, 241, 0.85)',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 14,
              padding: 0
            }}
            onClick={() => navigate('/login')}
          >
            {i18n.language === 'ar' ? 'تسجيل الدخول' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;