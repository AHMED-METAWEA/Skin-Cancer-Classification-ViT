import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Make sure useNavigate is imported
import { useTranslation } from 'react-i18next';
import { FiUploadCloud } from 'react-icons/fi';
import photoTip from '../assets/howTakePhoto.jpg'; // Change path if needed

function UploadDetect() {
  const navigate = useNavigate(); // Make sure useNavigate is initialized
  const { t } = useTranslation();
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detectedCancerType, setDetectedCancerType] = useState(null); // State to store cancer type
  const [confidencePercentage, setConfidencePercentage] = useState(null); // State to store confidence

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setImageFile(e.target.files[0]);
      setResult(null);
      setDetectedCancerType(null); // Reset type
      setConfidencePercentage(null); // Reset confidence
    }
  };

    const handleDetect = async () => {
    if (!imageFile) return;
    setLoading(true);
    setResult(null);
    setDetectedCancerType(null); // Reset type
    setConfidencePercentage(null); // Reset confidence

    const formData = new FormData();
    formData.append('file', imageFile);

    try {
      const response = await fetch('http://localhost:5001/predict', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.result) {
        const confidence = Math.round(data.confidence * 100);

        // --- Start of modification ---
        // Convert the backend result string to lowercase snake_case for translation key lookup
        const formattedResultKey = data.result.toLowerCase().replace(/ /g, '_');
        // --- End of modification ---


        setResult(
          // Use the formatted key for the result message translation lookup as well
          `${t('result_message', { result: t(`cancer_type.${formattedResultKey}`) || data.result })} (${confidence}%)`
        );
        // Use the formatted key to set the detected cancer type state
        setDetectedCancerType(formattedResultKey);
        setConfidencePercentage(confidence); // Store confidence percentage
      } else {
        setResult(t('error_detect') || 'An error occurred during detection. Please try again.');
        setDetectedCancerType(null);
        setConfidencePercentage(null);
      }
    } catch (error) {
      console.error("Detection error:", error);
      setResult(t('error_detect') || 'An error occurred during detection. Please try again.');
      setDetectedCancerType(null);
      setConfidencePercentage(null);
    }
    setLoading(false);
  };

  // Function to get advice based on detected type
  const getTypeSpecificAdvice = (type) => {
      if (!type) return null;
      // Use localization keys like `advice.<type>.title` and `advice.<type>.text`
      // Ensure your API returns result strings that match the keys you use here (e.g., "Melanoma", "Basal cell carcinoma")
      // Or you can map API results to simpler keys if needed
      return {
          title: t(`advice.${type}.title`),
          text: t(`advice.${type}.text`)
          // Add more fields here if you have multiple points of advice (e.g., tip1, tip2)
      };
  };

  const advice = getTypeSpecificAdvice(detectedCancerType);

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 32,
      justifyContent: 'center',
      alignItems: 'flex-start',
      margin: '0 auto',
      maxWidth: 1100,
      padding: '32px 0'
    }}>
      {/* Left Column */}
      <div style={{ flex: 1, minWidth: 320, maxWidth: 500 }}>
        <h1 style={{ fontWeight: 700, fontSize: 36, marginBottom: 16, textAlign: 'left' }}>
          {t('early_detection_title')}
        </h1>
        <p style={{ color: '#666', fontSize: 17, marginBottom: 28, textAlign: 'left' }}>
          {t('early_detection_desc_long')}
        </p>
        <img
          src={photoTip}
          alt={t('photo_tip_alt')}
          style={{
            width: '100%',
            maxWidth: 350,
            borderRadius: 12,
            marginBottom: 24,
            boxShadow: '0 2px 12px #0001'
          }}
        />
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 17 }}>
            {t('photo_tips_title')}
          </div>
          <ul style={{ color: '#666', fontSize: 14, paddingLeft: 20, margin: 0 }}>
            <li> {t('photo_tip_item1')} </li>
            <li> {t('photo_tip_item2')} </li>
            <li> {t('photo_tip_item3')} </li>
            <li> {t('photo_tip_item4')} </li>
            <li> {t('photo_tip_item5')} </li>
            <li> {t('photo_tip_item6')} </li>
            <li> {t('photo_tip_item7')} </li>
          </ul>
        </div>
      </div>
      {/* Right Column */}
      <div style={{
        flex: 1,
        minWidth: 320,
        maxWidth: 400,
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 2px 12px #0001',
        padding: 28,
        textAlign: 'center'
      }}>
        <div style={{ fontWeight: 700, fontSize: 19, marginBottom: 8 }}>
          {t('upload_skin_lesion_photo_title')}
        </div>
        <div style={{ color: '#888', fontSize: 14, marginBottom: 18 }}>
          {t('upload_skin_lesion_photo_desc_short')}
        </div>
        <label htmlFor="file-upload" style={{
          display: 'block',
          border: '2px dashed #b2dfdb',
          borderRadius: 10,
          padding: '32px 0',
          marginBottom: 18,
          cursor: 'pointer',
          background: '#f8fafc',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <FiUploadCloud size={32} color="#607d8b" style={{ marginBottom: 8 }} />
          <div style={{ color: '#888', fontSize: 15 }}>
            {t('drag_drop_upload')}
          </div>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </label>
        {image && (
          <div style={{ marginBottom: 16 }}>
            <img
              src={image}
              alt="preview"
              style={{ maxWidth: 220, borderRadius: 10, margin: '0 auto', display: 'block' }}
            />
          </div>
        )}
        <button
          onClick={handleDetect}
          disabled={!imageFile || loading}
          style={{
            width: '100%',
            background: '#b2dfdb',
            color: '#222',
            border: 'none',
            borderRadius: 8,
            padding: '12px 0',
            fontWeight: 600,
            fontSize: 17,
            cursor: imageFile && !loading ? 'pointer' : 'not-allowed',
            marginBottom: 10,
            marginTop: 8
          }}
        >
          {loading
            ? t('detecting')
            : t('start_analysis')}
        </button>
        {/* Display Result */}
        {result && (
          <div style={{
            marginTop: 18,
            fontWeight: 'bold',
            color: '#1a237e',
            fontSize: 16
          }}>
            {result}
          </div>
        )}
        {/* New Section: What to do after result */}
        {result && ( // Only show this section if there is a result
          <div style={{
            marginTop: 28,
            padding: 20,
            background: '#e0f7fa', // Light blue background
            borderRadius: 10,
            textAlign: 'left',
            border: '1px solid #b2ebf2'
          }}>
            <div style={{ fontWeight: 700, marginBottom: 8, color: '#00796b' }}>
              {t('next_steps_title') || 'Next Steps After Analysis:'}
            </div>
            <p style={{ fontSize: 14, color: '#00796b', marginBottom: 16 }}>
              {t('next_steps_description') || 'This analysis is AI-powered and not a substitute for professional medical diagnosis. It is crucial to consult a qualified dermatologist for an accurate diagnosis and appropriate treatment plan.'}
            </p>

            {/* Display Type-Specific Advice */}
            {detectedCancerType && confidencePercentage !== null && confidencePercentage > 60 && advice && ( // Show advice if type detected, confidence high, and advice found
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px dashed #b2ebf2' }}>
                {advice.title && (
                  <div style={{ fontWeight: 700, marginBottom: 8, color: '#004d40' }}>
                    {advice.title}
                  </div>
                )}
                {advice.text && (
                  <p style={{ fontSize: 14, color: '#004d40', marginBottom: 16 }}>
                    {advice.text}
                  </p>
                )}
                 {/* Add bullet points for specific tips if needed */}
                 {/* Example: */}
                 {/* {t(`advice.${detectedCancerType}.tip1`) && <li>{t(`advice.${detectedCancerType}.tip1`)}</li>} */}
                 {/* {t(`advice.${detectedCancerType}.tip2`) && <li>{t(`advice.${detectedCancerType}.tip2`)}</li>} */}
                 {/* etc. */}
              </div>
            )}


            <button
              onClick={() => navigate('/doctors')} // Link to Doctors page
              style={{
                background: '#00bcd4', // Cyan button color
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '10px 20px',
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
                boxShadow: '0 2px 8px #00bcd444'
              }}
            >
              {t('find_a_doctor_button') || 'Find a Doctor'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadDetect;