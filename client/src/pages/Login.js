import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { login, loginWithGoogle, loginWithGithub } from '../authService';
import googleLogo from '../assets/google.svg';
import githubLogo from '../assets/github.svg';

function Login() {
  const { i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        await login(email, password);
        localStorage.setItem('loggedIn', 'true');
        navigate('/');
      } catch (err) {
        setError(i18n.language === 'ar' ? 'البريد أو كلمة المرور غير صحيحة' : 'Invalid email or password');
      }
    } else {
      setError(i18n.language === 'ar' ? 'يرجى إدخال البريد وكلمة المرور' : 'Please enter email and password');
    }
  };

  // Social login handlers
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      localStorage.setItem('loggedIn', 'true');
      navigate('/');
    } catch (err) {
      setError('Google login failed: ' + err.message);
    }
  };

  const handleGithubLogin = async () => {
    try {
      await loginWithGithub();
      localStorage.setItem('loggedIn', 'true');
      navigate('/');
    } catch (err) {
      setError('GitHub login failed: ' + err.message);
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
          marginBottom: 28,
          letterSpacing: 1
        }}>
          {i18n.language === 'ar' ? 'أهلاً بعودتك' : 'Welcome Back'}
        </h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 500, color: '#333', marginBottom: 6, display: 'block' }}>
              {i18n.language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
            </label>
            <input
              type="email"
              placeholder={i18n.language === 'ar' ? 'البريد الإلكتروني' : 'your.email@example.com'}
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
            {i18n.language === 'ar' ? 'دخول' : 'Login'}
          </button>
          {/* Forgot Password under Login button */}
          <div style={{ textAlign: 'right', marginTop: 8 }}>
            <button
              type="button"
              style={{
                background: 'none',
                color: 'rgba(7, 73, 241, 0.85)',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 14,
                padding: 0
              }}
              onClick={() => navigate('/forgot-password')}
            >
              {i18n.language === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot Password?'}
            </button>
          </div>
        </form>

        {/* Social Login Buttons Horizontal with Logos */}
        <div style={{
          marginTop: 24,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: '16px'
        }}>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#fff',
              color: '#333',
              border: '1px solid #bdbdbd',
              borderRadius: 40,
              padding: '10px 24px',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer'
            }}
            onClick={handleGoogleLogin}
          >
            <img src={googleLogo} alt="Google" style={{ width: 22, height: 22, marginRight: 10 }} />
            {i18n.language === 'ar' ? 'تسجيل باستخدام google' : 'Sign in with Google'}
          </button>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#333',
              color: '#fff',
              border: 'none',
              borderRadius: 40,
              padding: '10px 24px',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer'
            }}
            onClick={handleGithubLogin}
          >
            <img src={githubLogo} alt="GitHub" style={{ width: 24, height: 22, marginRight: 10, filter: 'invert(1)' }} />
            {i18n.language === 'ar' ? 'تسجيل باستخدام github' : 'Sign in with GitHub'}
          </button>
        </div>

        <div style={{ marginTop: 24, textAlign: 'center', fontSize: 14 }}>
          {i18n.language === 'ar' ? 'ليس لديك حساب؟' : "Don't have an account?"}
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
            onClick={() => navigate('/signup')}
          >
            {i18n.language === 'ar' ? 'إنشاء حساب' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;