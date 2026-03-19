import React from 'react';
import { useTranslation } from 'react-i18next';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
  margin: '24px 0',
  borderRadius: '16px',
  overflow: 'hidden'
};

const center = {
  lat: 30.0444, // القاهرة كمثال، يمكن جعله ديناميكي لاحقًا
  lng: 31.2357
};

function Doctors() {
  const { t, i18n } = useTranslation();

  // بحث عن أطباء جلدية قريبين (نضع رابط بحث جوجل بجانب الخريطة)
  const googleSearchUrl = `https://www.google.com/maps/search/${encodeURIComponent(i18n.language === 'ar' ? 'طبيب امراض جلديه' : 'skin doctor')}/@${center.lat},${center.lng},12z`;

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>{t('find_doctor')}</h2>
      <LoadScript googleMapsApiKey="AIzaSyDBBXjy5jmk66fYzhccLDTmyR0ExOyVJI0">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
        >
          {/* يمكن إضافة ماركرز لاحقًا */}
        </GoogleMap>
      </LoadScript>
      <a
        href={googleSearchUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          marginTop: 16,
          color: '#2d6cdf',
          fontWeight: 'bold',
          fontSize: 18
        }}
      >
        {i18n.language === 'ar' ? 'ابحث عن أطباء جلدية بالقرب منك على Google Maps' : 'Find skin doctors near you on Google Maps'}
      </a>
    </div>
  );
}

export default Doctors;