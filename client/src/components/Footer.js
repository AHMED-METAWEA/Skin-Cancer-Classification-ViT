// import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

import React from 'react';
// Remove these if you don't use them in the JSX below
// import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  return (
    <footer style={{
      width: '100%',
      background: '#fff',
      borderTop: '1px solid #eee',
      marginTop: 48,
      padding: '40px 0 16px 0',
      fontSize: 15,
      color: '#444'
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 32,
        padding: '0 24px'
      }}>
        {/* Columns */}
        <div>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>About</div>
          <div>Our Story</div>
          <div>Team</div>
          <div>Careers</div>
        </div>
        <div>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Support</div>
          <div>FAQ</div>
          <div>Contact Us</div>
          <div>Help Center</div>
        </div>
        <div>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Legal</div>
          <div>Privacy Policy</div>
          <div>Terms of Service</div>
          <div>Cookie Policy</div>
        </div>
        <div>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Resources</div>
          <div>Blog</div>
          <div>Developers</div>
          <div>Partners</div>
        </div>
      </div>
      {/* Bottom bar */}
      <div style={{
        maxWidth: 1100,
        margin: '32px auto 0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 14,
        color: '#888',
        padding: '0 24px'
      }}>
        <div>
          © 2024 Skin Vision. &nbsp; • &nbsp; 
          <span style={{ cursor: 'pointer' }}>Privacy</span> &nbsp; • &nbsp; 
          <span style={{ cursor: 'pointer' }}>Terms</span> &nbsp; • &nbsp; 
          <span style={{ cursor: 'pointer' }}>Sitemap</span>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          {/* Add icons here if you want, or remove this div if not needed */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;