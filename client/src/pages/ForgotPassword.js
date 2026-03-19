import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function ForgotPassword() {
  const { i18n } = useTranslation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // State for success message
  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setSuccess(''); // Clear previous success messages

    if (!newPassword || !confirmPassword) {
      setError(i18n.language === 'ar' ? 'يرجى إدخال كلمة المرور الجديدة وتأكيدها' : 'Please enter and confirm your new password');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(i18n.language === 'ar' ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match');
      return;
    }

    // Here you would typically send the newPassword and perhaps a token (from the URL)
    // to your backend API to actually reset the password.
    // For this example, we'll just show a success message.
    console.log('New Password:', newPassword);
    // Example API call:
    // axios.post('/api/reset-password', { password: newPassword, token: '...' })
    //   .then(response => {
    //     setSuccess(i18n.language === 'ar' ? 'تم إعادة تعيين كلمة المرور بنجاح!' : 'Password reset successfully!');
    //     // Optionally navigate to login after a delay
    //     // setTimeout(() => navigate('/login'), 2000);
    //   })
    //   .catch(err => {
    //     setError(i18n.language === 'ar' ? 'فشل إعادة تعيين كلمة المرور.' : 'Failed to reset password.');
    //   });

    setSuccess(i18n.language === 'ar' ? 'تم إرسال طلب إعادة تعيين كلمة المرور.' : 'Password reset request submitted.');
     // In a real app, handle the backend response to show actual success/error

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
        borderRadius: 16,
        boxShadow: '0 2px 12px #0001',
        padding: '36px 28px',
        margin: 'auto'
      }}>
         {/* Add your logo here if you have it */}
        {/* <img src="/path/to/your/logo.png" alt="Safe Skin Logo" style={{ display: 'block', margin: '0 auto 20px', width: '80px' }} /> */}
        <h2 style={{
          textAlign: 'center',
          color: '#333',
          fontWeight: 700,
          marginBottom: 8,
          letterSpacing: 1
        }}>
          {i18n.language === 'ar' ? 'إعادة تعيين كلمة المرور' : 'Reset Password'} {/* Title */}
        </h2>
         <p style={{
            textAlign: 'center',
            color: '#555',
            marginBottom: 28,
            fontSize: 16
         }}>
             {i18n.language === 'ar' ? 'أدخل كلمة المرور الجديدة وأكدها.' : 'Enter and confirm your new password.'} {/* Description */}
         </p>
        <form onSubmit={handleResetPassword}>
          {/* New Password Field */}
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 500, color: '#333', marginBottom: 6, display: 'block' }}>
              {i18n.language === 'ar' ? 'كلمة المرور الجديدة' : 'New Password'}
            </label>
            <input
              type="password"
              placeholder={i18n.language === 'ar' ? 'كلمة المرور الجديدة' : 'Enter new password'}
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
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
          {/* Confirm New Password Field */}
          <div style={{ marginBottom: 8 }}> {/* Adjusted margin */}
            <label style={{ fontWeight: 500, color: '#333', marginBottom: 6, display: 'block' }}>
              {i18n.language === 'ar' ? 'تأكيد كلمة المرور الجديدة' : 'Confirm New Password'}
            </label>
            <input
              type="password"
              placeholder={i18n.language === 'ar' ? 'تأكيد كلمة المرور الجديدة' : 'Confirm new password'}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
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
          {error && <div style={{ color: 'red', marginBottom: 12, fontSize: 14, textAlign: 'center' }}>{error}</div>}
          {success && <div style={{ color: 'green', marginBottom: 12, fontSize: 14, textAlign: 'center' }}>{success}</div>}
          <button type="submit" style={{
            width: '100%',
            background: 'rgba(7, 73, 241, 0.85)', // Button color
            color: '#fff',
            border: 'none',
            borderRadius: 40,
            padding: '12px 0',
            fontWeight: 600,
            fontSize: 18,
            marginTop: 16,
            cursor: 'pointer'
          }}>
            {i18n.language === 'ar' ? 'إعادة تعيين' : 'Reset Password'} {/* Button text */}
          </button>
        </form>
        <div style={{ marginTop: 24, textAlign: 'center', fontSize: 14 }}>
          {i18n.language === 'ar' ? 'تذكرت كلمة المرور؟' : "Remember your password?"}
          <button
            style={{
              marginLeft: 4,
              background: 'none',
              color: 'rgba(7, 73, 241, 0.85)', // Login link color
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 14,
              padding: 0
            }}
            onClick={() => navigate('/login')}
          >
            {i18n.language === 'ar' ? 'تسجيل الدخول' : 'Login'} {/* Link text */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;