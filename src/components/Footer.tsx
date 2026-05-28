'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--dark-bg)', color: 'var(--dark-text)', padding: '4rem 0 2rem', borderTop: '4px solid var(--primary)', marginTop: 'auto' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <img 
                src="/tokaido.png" 
                alt="Tokaido" 
                style={{ height: '35px', width: 'auto', filter: 'brightness(0) invert(1)' }} 
              />
              <span style={{ fontFamily: 'var(--font-title)', fontSize: '1rem', color: 'var(--primary)', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                Costa Rica
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#BBBBBB', lineHeight: '1.7', fontFamily: 'var(--font-body)' }}>
              Tokaido es el fabricante de uniformes de karate más antiguo del mundo y el estándar de oro en karate tradicional. Fundado en Japón, ofrece la más alta calidad y artesanía.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 style={{ color: 'var(--accent-gold)', marginBottom: '1.25rem', fontSize: '1rem', borderBottom: '1px solid var(--dark-gray)', paddingBottom: '0.5rem' }}>
              Menú Principal
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', fontFamily: 'var(--font-subtitle)', fontWeight: 700 }}>
              <li><Link href="/" className="footer-link">INICIO</Link></li>
              <li><Link href="/shop" className="footer-link">TIENDA</Link></li>
              <li><Link href="/#about" className="footer-link">SOBRE TOKAIDO</Link></li>
              <li><Link href="/#contact" className="footer-link">CONTACTO</Link></li>
            </ul>
          </div>

          {/* Size charts & Care */}
          <div>
            <h4 style={{ color: '#FFFFFF', marginBottom: '1.25rem', fontSize: '1rem', borderBottom: '1px solid var(--dark-gray)', paddingBottom: '0.5rem' }}>
              Soporte y Guías
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: '#BBBBBB' }}>
              <li><a href="#size-charts" className="footer-link-sub">Tabla de Tallas de Uniformes</a></li>
              <li><a href="#care" className="footer-link-sub">Cuidado del Cinturón Negro y Gi</a></li>
              <li><a href="#order-info" className="footer-link-sub">Información de Pedidos Especiales</a></li>
              <li><a href="#shipping" className="footer-link-sub">Envíos y Devoluciones</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 style={{ color: '#FFFFFF', marginBottom: '1.25rem', fontSize: '1rem', borderBottom: '1px solid var(--dark-gray)', paddingBottom: '0.5rem' }}>
              Contacto Costa Rica
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: '#BBBBBB' }}>
              <li>
                <strong style={{ color: '#FFFFFF' }}>WhatsApp:</strong><br />
                <a href="https://wa.me/50681803125" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-gold)' }}>+(506) 8180-3125</a>
              </li>
              <li>
                <strong style={{ color: '#FFFFFF' }}>Ubicación:</strong><br />
                San José, Costa Rica
              </li>
              <li>
                <strong style={{ color: '#FFFFFF' }}>Email:</strong><br />
                <a href="mailto:info@tokaidocr.com" style={{ color: 'var(--primary)' }}>info@tokaidocr.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div style={{ borderTop: '1px solid var(--dark-gray)', paddingTop: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#888888' }}>
          <div>
            &copy; {new Date().getFullYear()} Tokaido Costa Rica. Todos los derechos reservados.
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <span>dev by KUMADEV.INC</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .footer-link {
          color: #FFFFFF;
          transition: color var(--transition-fast);
        }
        .footer-link:hover {
          color: var(--primary);
        }
        .footer-link-sub {
          color: #BBBBBB;
          transition: color var(--transition-fast);
        }
        .footer-link-sub:hover {
          color: #FFFFFF;
        }
      `}</style>
    </footer>
  );
}
