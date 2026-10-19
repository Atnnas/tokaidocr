'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PhoneCall, Mail, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="tokaido-cr-footer">
      <div className="footer-top-container">
        <div className="footer-grid">
          {/* Column 1: Brand & Contact Info */}
          <div className="footer-col col-brand">
            <Link href="/" className="footer-logo-link" aria-label="Tokaido Costa Rica" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none', marginBottom: '1.25rem' }}>
              <div style={{ width: '40px', height: '40px', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                <img 
                  src="/tokaido_symbol.png" 
                  alt="Tokaido" 
                  style={{ height: '40px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '0.5px', color: '#FFFFFF', fontFamily: 'var(--font-title, sans-serif)' }}>TOKAIDO</span>
                <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '1.8px', color: '#E50914' }}>COSTA RICA</span>
              </div>
            </Link>
            <p className="footer-brand-desc">
              Distribuidor oficial de indumentaria y equipamiento de Karate-Do en Costa Rica. Trajes homologados WKF, cinturones y protecciones de alta competencia.
            </p>
            <div className="footer-direct-contacts">
              <div className="contact-item">
                <MapPin size={16} className="contact-icon red" />
                <span>San José, Costa Rica (Envíos a todo el país)</span>
              </div>
              <div className="contact-item">
                <PhoneCall size={16} className="contact-icon red" />
                <a href="https://wa.me/50687378597" target="_blank" rel="noopener noreferrer">
                  (+506) 8737-8597
                </a>
              </div>
              <div className="contact-item">
                <Mail size={16} className="contact-icon red" />
                <a href="mailto:info@tokaidocr.com">info@tokaidocr.com</a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Búsqueda Rápida</h4>
            <ul className="footer-links-list">
              <li>
                <Link href="/">Inicio</Link>
              </li>
              <li>
                <Link href="/#about">Nosotros</Link>
              </li>
              <li>
                <Link href="/shop">Catálogo de Productos</Link>
              </li>
              <li>
                <Link href="/shop?category=uniforms">Uniformes WKF (Kata & Kumite)</Link>
              </li>
              <li>
                <Link href="/shop?category=protectors">Protectores Oficiales</Link>
              </li>
              <li>
                <Link href="/contact">Contáctenos</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Information & Services */}
          <div className="footer-col">
            <h4 className="footer-col-title">Información</h4>
            <ul className="footer-links-list">
              <li>
                <span className="info-item">Envíos GAM (24h a 48h)</span>
              </li>
              <li>
                <span className="info-item">Correos de Costa Rica a todo el país</span>
              </li>
              <li>
                <span className="info-item">Pagos por SINPE Móvil y Tarjetas</span>
              </li>
              <li>
                <span className="info-item">Garantía 100% Original de Fábrica</span>
              </li>
              <li>
                <span className="info-item">Asesoría de tallas por WhatsApp</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Approved WKF Badge & Authority */}
          <div className="footer-col col-wkf">
            <h4 className="footer-col-title">Homologación</h4>
            <div className="wkf-badge-card">
              <div className="wkf-badge-header">
                <ShieldCheck size={22} className="shield-icon" />
                <strong>APPROVED WKF</strong>
              </div>
              <p className="wkf-badge-text">
                Equipamiento oficial reglamentario para torneos nacionales e internacionales de la World Karate Federation.
              </p>
              <div className="wkf-seal-tag">
                <CheckCircle2 size={14} />
                <span>Distribución Oficial Costa Rica</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Footer Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <div className="footer-copy-text">
            <span>TOKAIDO COSTA RICA &copy; {new Date().getFullYear()} Todos los derechos reservados.</span>
            <span className="separator-dot">•</span>
            <span className="dev-credit">dev by <span className="dev-name">KUMADEV.INC</span></span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .tokaido-cr-footer {
          background: #141414;
          color: #999999;
          font-family: 'Outfit', 'Inter', -apple-system, sans-serif;
          border-top: 1px solid #222222;
          margin-top: auto;
        }

        .footer-top-container {
          max-width: 1480px;
          margin: 0 auto;
          padding: 4.5rem 2rem 3.5rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
          gap: 3rem;
        }

        .footer-logo-img {
          height: 38px;
          width: auto;
          object-fit: contain;
          margin-bottom: 1.25rem;
          filter: brightness(0) invert(1);
        }

        .footer-brand-desc {
          font-size: 0.88rem;
          line-height: 1.6;
          color: #888888;
          margin-bottom: 1.5rem;
          max-width: 360px;
        }

        .footer-direct-contacts {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          font-size: 0.86rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          color: #AAAAAA;
        }

        .contact-item a {
          color: #BBBBBB;
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .contact-item a:hover {
          color: #E50914;
        }

        .contact-icon.red {
          color: #E50914;
          flex-shrink: 0;
        }

        .footer-col-title {
          font-size: 1.05rem;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0 0 1.5rem;
          position: relative;
          padding-bottom: 0.65rem;
          letter-spacing: 0.3px;
        }

        .footer-col-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 32px;
          height: 2px;
          background: #E50914;
        }

        .footer-links-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          font-size: 0.88rem;
        }

        .footer-links-list a {
          color: #888888;
          text-decoration: none;
          transition: color 0.15s ease, transform 0.15s ease;
          display: inline-block;
        }

        .footer-links-list a:hover {
          color: #FFFFFF;
          transform: translateX(4px);
        }

        .info-item {
          color: #888888;
          display: block;
        }

        .wkf-badge-card {
          background: #1c1c1c;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
          padding: 1.5rem;
        }

        .wkf-badge-header {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          color: #E50914;
          font-size: 0.95rem;
          font-weight: 800;
          margin-bottom: 0.75rem;
          letter-spacing: 0.5px;
        }

        .shield-icon {
          color: #E50914;
        }

        .wkf-badge-text {
          font-size: 0.84rem;
          color: #888888;
          line-height: 1.5;
          margin: 0 0 1rem;
        }

        .wkf-seal-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(229, 9, 20, 0.12);
          color: #E50914;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.3rem 0.65rem;
          border-radius: 4px;
        }

        /* Bottom Bar */
        .footer-bottom-bar {
          background: #0e0e0e;
          border-top: 1px solid #1f1f1f;
          padding: 1.5rem 0;
        }

        .footer-bottom-container {
          max-width: 1480px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .footer-copy-text {
          font-size: 0.82rem;
          color: #666666;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .separator-dot {
          color: #333333;
        }

        .dev-credit {
          color: #888888;
        }

        .dev-name {
          color: #D4AF37;
          font-weight: 700;
        }

        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem;
          }
        }

        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .footer-bottom-container {
            flex-direction: column;
            text-align: center;
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
}
