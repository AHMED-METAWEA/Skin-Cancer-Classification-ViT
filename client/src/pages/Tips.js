import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiSun, FiHeart, FiDroplet, FiMapPin } from 'react-icons/fi'; // Icons for cards

// Assume your header image is in src/assets/tips-header.jpg (change path/name if needed)
import headerImg from '../assets/tipsPhoto.jpg';

function Tips() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div style={{
      width: '100%',
      margin: '0 auto',
      padding: '32px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* Top Section: Title, Intro, Image */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 32,
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        maxWidth: 1100,
        marginBottom: 48
      }}>
        {/* Left: Text */}
        <div style={{ flex: 1, minWidth: 300, maxWidth: 500, textAlign: 'left' }}>
          <h1 style={{ fontWeight: 700, fontSize: 36, color: '#222', marginBottom: 16 }}>
            {t('protect_your_skin_title')}
          </h1>
          <p style={{ color: '#444', fontSize: 17 }}>
            {t('protect_your_skin_desc')}
          </p>
        </div>
        {/* Right: Image */}
        <div style={{ flex: 1, minWidth: 300, maxWidth: 500, display: 'flex', justifyContent: 'center' }}>
          <img
            src={headerImg}
            alt={t('protect_your_skin_alt')}
            style={{
              width: '100%',
              maxWidth: 450,
              borderRadius: 12,
              boxShadow: '0 2px 12px #0001',
              objectFit: 'cover'
            }}
          />
        </div>
      </div>

      {/* Tip Cards Section */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 24,
        justifyContent: 'center',
        width: '100%',
        maxWidth: 1100,
        marginBottom: 48
      }}>
        {/* Card 1: Prevention */}
        <div style={{
          background: '#fff',
          borderRadius: 14,
          padding: '24px',
          minWidth: 220,
          maxWidth: 280,
          boxShadow: '0 2px 10px #0001',
          border: '1px solid #eee',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}>
          <FiSun size={28} color="#fbc02d" style={{ marginBottom: 12 }} />
          <div style={{ fontWeight: 700, fontSize: 18, color: '#222', marginBottom: 8 }}>
            {t('prevention_strategies_title')}
          </div>
          <ul style={{ color: '#555', fontSize: 15, paddingLeft: 20, margin: 0, lineHeight: 1.6 }}>
            <li>{t('prevention_tip1')}</li>
            <li>{t('prevention_tip2')}</li>
            <li>{t('prevention_tip3')}</li>
            <li>{t('prevention_tip4')}</li>
            <li>{t('prevention_tip5')}</li>
          </ul>
        </div>
        {/* Card 2: Healthy Lifestyle */}
        <div style={{
          background: '#fff',
          borderRadius: 14,
          padding: '24px',
          minWidth: 220,
          maxWidth: 280,
          boxShadow: '0 2px 10px #0001',
          border: '1px solid #eee',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}>
          <FiHeart size={28} color="#e57373" style={{ marginBottom: 12 }} />
          <div style={{ fontWeight: 700, fontSize: 18, color: '#222', marginBottom: 8 }}>
            {t('healthy_lifestyle_title')}
          </div>
          <ul style={{ color: '#555', fontSize: 15, paddingLeft: 20, margin: 0, lineHeight: 1.6 }}>
            <li>{t('lifestyle_tip1')}</li>
            <li>{t('lifestyle_tip2')}</li>
            <li>{t('lifestyle_tip3')}</li>
            <li>{t('lifestyle_tip4')}</li>
          </ul>
        </div>
        {/* Card 3: Symptom Relief */}
        <div style={{
          background: '#fff',
          borderRadius: 14,
          padding: '24px',
          minWidth: 220,
          maxWidth: 280,
          boxShadow: '0 2px 10px #0001',
          border: '1px solid #eee',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}>
          <FiDroplet size={28} color="#4fc3f7" style={{ marginBottom: 12 }} />
          <div style={{ fontWeight: 700, fontSize: 18, color: '#222', marginBottom: 8 }}>
            {t('symptom_relief_title')}
          </div>
          <ul style={{ color: '#555', fontSize: 15, paddingLeft: 20, margin: 0, lineHeight: 1.6 }}>
            <li>{t('symptom_tip1')}</li>
            <li>{t('symptom_tip2')}</li>
            <li>{t('symptom_tip3')}</li>
          </ul>
        </div>
        {/* Card 4: Doctor Visits */}
        <div style={{
          background: '#fff',
          borderRadius: 14,
          padding: '24px',
          minWidth: 220,
          maxWidth: 280,
          boxShadow: '0 2px 10px #0001',
          border: '1px solid #eee',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}>
          <FiMapPin size={28} color="#81c784" style={{ marginBottom: 12 }} />
          <div style={{ fontWeight: 700, fontSize: 18, color: '#222', marginBottom: 8 }}>
            {t('importance_doctor_visits_title')}
          </div>
          <ul style={{ color: '#555', fontSize: 15, paddingLeft: 20, margin: 0, lineHeight: 1.6 }}>
            <li>{t('doctor_tip1')}</li>
            <li>{t('doctor_tip2')}</li>
            <li>{t('doctor_tip3')}</li>
          </ul>
        </div>
      </div>

      {/* Disclaimer Section */}
      <div style={{
        width: '100%',
        maxWidth: 1100,
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 2px 10px #0001',
        padding: 24,
        marginBottom: 48,
        border: '1px solid #eee'
      }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>{t('disclaimer_title') || 'Disclaimer:'}</div>
        <p style={{ color: '#555', fontSize: 14, margin: 0 }}>
          {t('disclaimer_text') ||
            'These tips provide general information and do not constitute medical advice. They are not a substitute for professional medical consultation, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition, especially if you notice any unusual or changing skin symptoms.'}
        </p>
      </div>

      {/* Call to Action Section */}
      <div style={{
        width: '100%',
        maxWidth: 800,
        background: '#222',
        borderRadius: 18,
        boxShadow: '0 4px 24px #6366f144',
        padding: '32px',
        textAlign: 'center',
        color: '#fff'
      }}>
        <div style={{ fontWeight: 700, fontSize: 24, marginBottom: 12 }}>
          {t('concerned_spot_title') || 'Concerned About a Spot?'}
        </div>
        <p style={{ fontSize: 17, marginBottom: 24 }}>
          {t('concerned_spot_desc') || "Don't wait. Schedule an appointment with a dermatologist today for a professional evaluation. Early detection is key."}
        </p>
        <button
          onClick={() => navigate('/doctors')}
          style={{
            background: '#fff',
            color: '#222',
            border: 'none',
            borderRadius: 8,
            padding: '12px 32px',
            fontWeight: 600,
            fontSize: 17,
            cursor: 'pointer',
            boxShadow: '0 2px 8px #0002'
          }}
        >
          {t('find_a_doctor_button') || 'Find a Doctor'}
        </button>
      </div>
    </div>
  );
}

export default Tips;