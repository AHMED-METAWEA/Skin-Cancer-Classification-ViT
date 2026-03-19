import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FiUploadCloud, FiMapPin, FiSun,
  FiBarChart2, FiShield, FiBookOpen,
  FiHeart, FiMessageCircle
} from 'react-icons/fi';
import heroImg from '../assets/analysiss.png';

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div style={{
      width: '100%',
      minHeight: 400,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 32
    }}>
      {/* Welcome */}
      <h2 style={{
        fontWeight: 700,
        fontSize: 41,
        color: '#222',
        marginBottom: 85,
        textAlign: 'center'
      }}>
        {t('welcome_to_skin_vision')}
      </h2>

      {/* Hero Section */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: 950,
        background: '#f6f7fb',
        borderRadius: 18,
        boxShadow: '0 2px 12px #0001',
        padding: 32,
        gap: 40,
        marginBottom: 48
      }}>
        {/* Left: Text */}
        <div style={{ flex: 1 }}>
          <div style={{
            fontWeight: 700,
            fontSize: 36,
            color: '#222',
            marginBottom: 18,
            lineHeight: 1.15
          }}>
            {t('detect_skin_cancer_early')}
          </div>
          <div style={{
            color: '#555',
            fontSize: 17,
            marginBottom: 32,
            maxWidth: 400
          }}>
            {t('ai_tool_description')}
          </div>
          <button
            onClick={() => navigate('/upload-detect')}
            style={{
              background: '#6366f1',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '12px 32px',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              boxShadow: '0 2px 8px #6366f122'
            }}
          >
            {t('start_analysis')}
          </button>
        </div>

        {/* Right: Image */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <img
            src={heroImg}
            alt="Skin Vision Hero"
            style={{
              width: 320,
              maxWidth: '100%',
              borderRadius: 12,
              objectFit: 'cover',
              boxShadow: '0 2px 16px #0002'
            }}
          />
        </div>
      </div>

      {/* Cards Section */}
      <h2 style={{
        fontWeight: 700,
        fontSize: 28,
        marginBottom: 36,
        color: '#222',
        textAlign: 'center'
      }}>
        {t('how_skin_vision_can_help')}
      </h2>

      <div style={{
        display: 'flex',
        gap: 32,
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {/* Upload Detect */}
        <Card
          icon={<FiUploadCloud size={32} color="#7b8cff" />}
          title={t('upload_detect')}
          desc={t('upload_detect_desc')}
          onClick={() => navigate('/upload-detect')}
          borderColor="#e3eafc"
          bgColor="#f4f7fd"
        />

        {/* Find Doctor */}
        <Card
          icon={<FiMapPin size={32} color="#6fcf97" />}
          title={t('find_doctor')}
          desc={t('find_doctor_desc')}
          onClick={() => navigate('/doctors')}
          borderColor="#d6f5e3"
          bgColor="#f4fdf7"
        />

        {/* Tips */}
        <Card
          icon={<FiSun size={32} color="#fbc02d" />}
          title={t('prevention_tips')}
          desc={t('prevention_tips_desc')}
          onClick={() => navigate('/tips')}
          borderColor="#fff9c4"
          bgColor="#fffde7"
        />

        {/* Chatbot */}
        <Card
          icon={<FiMessageCircle size={32} color="#8a74f9" />}
          title={t('ask_skinai')}
          desc={t('ask_skinai_desc')}
          onClick={() => navigate('/chatbot')}
          borderColor="#dcdcff"
          bgColor="#f5f5ff"
        />
      </div>

      {/* Why Choose Section */}
      <h2 style={{
        fontWeight: 700,
        fontSize: 26,
        margin: '64px 0 32px 0',
        color: '#222',
        textAlign: 'center'
      }}>
        {t('why_choose_skin_vision')}
      </h2>

      <div style={{
        display: 'flex',
        gap: 24,
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {/* Reason Cards */}
        <InfoCard
          icon={<FiBarChart2 size={32} color="#7b8cff" />}
          title={t('advanced_ai_analysis')}
          desc={t('advanced_ai_analysis_desc')}
        />
        <InfoCard
          icon={<FiShield size={32} color="#7b8cff" />}
          title={t('secure_data_handling')}
          desc={t('secure_data_handling_desc')}
        />
        <InfoCard
          icon={<FiBookOpen size={32} color="#7b8cff" />}
          title={t('educational_resources')}
          desc={t('educational_resources_desc')}
        />
        <InfoCard
          icon={<FiMapPin size={32} color="#7b8cff" />}
          title={t('find_nearest_doctors')}
          desc={t('find_nearest_doctors_desc')}
        />
      </div>
    </div>
  );
}

function Card({ icon, title, desc, onClick, borderColor, bgColor }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: bgColor,
        borderRadius: 16,
        padding: '28px 32px',
        minWidth: 220,
        maxWidth: 260,
        boxShadow: '0 2px 12px #0001',
        cursor: 'pointer',
        border: `1.5px solid ${borderColor}`,
        transition: 'box-shadow 0.2s',
      }}
    >
      <div style={{ marginBottom: 12 }}>{icon}</div>
      <div style={{ fontWeight: 700, fontSize: 18, color: '#222', marginBottom: 8 }}>
        {title}
      </div>
      <div style={{ color: '#6b7280', fontSize: 15 }}>{desc}</div>
    </div>
  );
}

function InfoCard({ icon, title, desc }) {
  return (
    <div style={{
      background: '#f8fafd',
      borderRadius: 14,
      padding: '28px 24px',
      minWidth: 210,
      maxWidth: 250,
      boxShadow: '0 2px 12px #0001',
      border: '1.5px solid #e3eafc',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    }}>
      <div style={{ marginBottom: 12 }}>{icon}</div>
      <div style={{ fontWeight: 700, fontSize: 17, color: '#222', marginBottom: 8 }}>
        {title}
      </div>
      <div style={{ color: '#6b7280', fontSize: 15 }}>{desc}</div>
    </div>
  );
}