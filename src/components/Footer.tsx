'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer style={{ 
      backgroundColor: '#0c0c0c', // Matte Black matching the Header
      color: '#BBBBBB', 
      padding: '2rem 0', 
      borderTop: '3.5px solid var(--primary)', // Matching crimson border from Header
      marginTop: 'auto',
      boxShadow: '0 -5px 25px rgba(0, 0, 0, 0.95)'
    }}>
      <div className="container footer-content" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: '1rem',
        fontFamily: 'var(--font-subtitle)',
        fontSize: '0.8rem',
        fontWeight: 700,
        letterSpacing: '0.8px'
      }}>
        {/* Copyright */}
        <div style={{ color: '#E2E2E2', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
          &copy; {new Date().getFullYear()} Tokaido Costa Rica. Todos los derechos reservados.
        </div>

        {/* Developer Credits */}
        <div style={{ 
          color: 'var(--accent-gold)', 
          textShadow: '0 0 8px rgba(212, 175, 55, 0.3)',
          letterSpacing: '1.2px'
        }}>
          dev by <span style={{ color: '#FFFFFF', textShadow: '0 0 10px rgba(255,255,255,0.2)' }}>KUMADEV.INC</span>
        </div>
      </div>

      {/* Responsive Stacking Style */}
      <style jsx>{`
        @media (max-width: 640px) {
          .footer-content {
            flex-direction: column !important;
            text-align: center !important;
            justify-content: center !important;
            gap: 0.75rem !important;
          }
        }
      `}</style>
    </footer>
  );
}
