'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import Hyperspeed from '@/components/Hyperspeed';

export default function Home() {
  // Smooth scroll handler on page mount if hash is present
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      }
    }
  }, []);

  return (
    <>
      {/* Hero Section with Hyperspeed Background */}
      <section style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        width: '100%', 
        minHeight: '75vh', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '6rem 2rem', 
        textAlign: 'center',
        borderBottom: '3.5px solid var(--primary)',
        backgroundColor: '#0c0c0c',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Hyperspeed WebGL Animation */}
        <Hyperspeed
          effectOptions={{
            distortion: 'turbulentDistortion',
            length: 400,
            roadWidth: 10,
            islandWidth: 2,
            lanesPerRoad: 3,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 1.5,
            carLightsFade: 0.4,
            totalSideLightSticks: 15,
            lightPairsPerRoadWay: 30,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.1, 0.4],
            lightStickHeight: [1.0, 1.5],
            movingAwaySpeed: [50, 70],
            movingCloserSpeed: [-100, -130],
            carLightsLength: [12, 80],
            carLightsRadius: [0.05, 0.12],
            carWidthPercentage: [0.3, 0.5],
            carShiftX: [-0.8, 0.8],
            carFloorSeparation: [0.05, 3],
            colors: {
              roadColor: 0x080808,
              islandColor: 0x0a0a0a,
              background: 0x0c0c0c,
              shoulderLines: 0x222222,
              brokenLines: 0x222222,
              leftCars: [0xC8102E, 0x990000, 0xFF334B], // Crimson Red lights (moving away)
              rightCars: [0xD4AF37, 0xAA8010, 0xFFE077], // Gold/Amber lights (moving closer)
              sticks: 0xC8102E
            }
          }}
        />

        {/* Semi-transparent Overlay for Text Legibility (Allows click-through to speed up animation) */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(12, 12, 12, 0.65)',
          zIndex: 1,
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '800px', zIndex: 2, position: 'relative' }}>

          <h1 style={{ 
            fontSize: '4.5rem', 
            color: '#FFFFFF', 
            marginBottom: '1.5rem', 
            fontFamily: 'var(--font-title)',
            letterSpacing: '1px',
            lineHeight: '1.05',
            textShadow: '2px 4px 10px rgba(0, 0, 0, 0.9)'
          }}>
            TOKAIDO COSTA RICA
          </h1>
          <p style={{ 
            fontSize: '1.15rem', 
            color: '#E2E2E2', 
            marginBottom: '3rem', 
            lineHeight: '1.8',
            fontFamily: 'var(--font-body)',
            maxWidth: '700px',
            marginLeft: 'auto',
            marginRight: 'auto',
            textShadow: '1px 2px 4px rgba(0, 0, 0, 0.9)'
          }}>
            Distribuidor oficial de uniformes de karate Tokaido y equipamiento deportivo. El estándar de oro en karate tradicional desde Japón, ahora disponible localmente con personalización de bordados oficiales.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/shop" className="btn btn-primary" style={{ padding: '0.9rem 2.8rem', boxShadow: '0 0 15px rgba(200, 16, 46, 0.4)' }}>
              VER TIENDA
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section" style={{ 
        backgroundColor: 'var(--card-bg)', 
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          
          {/* Left Text Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <span style={{ 
              color: 'var(--accent-gold)', 
              fontSize: '0.85rem', 
              fontFamily: 'var(--font-subtitle)', 
              fontWeight: 700, 
              letterSpacing: '2px' 
            }}>
              ARTESANÍA JAPONESA ORIGINAL
            </span>
            <h2 style={{ fontSize: '3rem', color: 'var(--foreground)', fontFamily: 'var(--font-title)' }}>
              SOBRE TOKAIDO
            </h2>
            <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--primary)', marginBottom: '0.5rem' }}></div>
            
            <p style={{ fontSize: '1rem', color: 'var(--dark-gray)', lineHeight: '1.7', fontFamily: 'var(--font-body)' }}>
              Fundada en Japón por Shizuo Sugiura, <strong>Tokaido</strong> es el fabricante de uniformes de karate más antiguo del mundo. Fuimos los pioneros en confeccionar vestimenta específica para la práctica de Karate-Do en la década de 1950, definiendo el estándar clásico que perdura hasta el día de hoy.
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--dark-gray)', lineHeight: '1.7', fontFamily: 'var(--font-body)' }}>
              Cada uniforme (Gi) y cinturón (Obi) Tokaido es sinónimo de maestría, durabilidad y tradición. Contamos con homologación oficial de la <strong>World Karate Federation (WKF)</strong> y de la <strong>Japan Karate Association (JKA)</strong>, garantizando su cumplimiento para alta competencia internacional y práctica en dojo tradicional.
            </p>
            <p style={{ fontSize: '1.05rem', color: 'var(--foreground)', fontWeight: 'bold', lineHeight: '1.7', fontFamily: 'var(--font-subtitle)' }}>
              ✓ Distribución autorizada en Costa Rica<br />
              ✓ Uniformes para Kata, Kumite y entrenamiento diario
            </p>
          </div>

          {/* Right Image/Banner Column */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ 
              position: 'relative', 
              border: '4px solid var(--foreground)', 
              padding: '10px', 
              boxShadow: 'var(--shadow-lg)',
              backgroundColor: 'white',
              width: '100%',
              maxWidth: '450px'
            }}>
              <img 
                src="/tokaido_heritage.png" 
                alt="Herencia y Bordado Tokaido" 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  display: 'block',
                  filter: 'grayscale(0.1) contrast(1.05)'
                }} 
              />
              <div style={{ 
                position: 'absolute', 
                bottom: '25px', 
                right: '25px', 
                backgroundColor: 'var(--primary)', 
                color: 'white', 
                padding: '10px 15px', 
                fontSize: '0.8rem', 
                fontFamily: 'var(--font-subtitle)', 
                fontWeight: 700, 
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                Est. 1956 • Tokyo
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section" style={{ 
        backgroundColor: 'var(--background)',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ 
              color: 'var(--primary)', 
              fontSize: '0.85rem', 
              fontFamily: 'var(--font-subtitle)', 
              fontWeight: 700, 
              letterSpacing: '2px' 
            }}>
              ATENCIÓN PERSONALIZADA
            </span>
            <h2 style={{ fontSize: '3rem', color: 'var(--foreground)', fontFamily: 'var(--font-title)', marginTop: '0.5rem' }}>
              CONTACTO COSTA RICA
            </h2>
            <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--accent-gold)', margin: '10px auto 0' }}></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', width: '100%', maxWidth: '960px' }}>
            {/* WhatsApp Card */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2.5rem 2rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgba(212, 175, 55, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)', marginBottom: '1.25rem' }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', fontFamily: 'var(--font-title)' }}>WhatsApp Oficial</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--dark-gray)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                Escríbenos directamente para consultar tallas, existencias de uniformes de Kata/Kumite, o cotizaciones especiales para dojos.
              </p>
              <a href="https://wa.me/50687378597" target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{ width: '100%', fontSize: '0.8rem', padding: '0.6rem' }}>
                CHATEAR EN WHATSAPP
              </a>
            </div>

            {/* Email Card */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2.5rem 2rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgba(200, 16, 46, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '1.25rem' }}>
                <Mail size={24} />
              </div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', fontFamily: 'var(--font-title)' }}>Correo Electrónico</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--dark-gray)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                Envíanos tus requerimientos de bordado personalizado en kanji, logos de tu escuela, o pedidos grupales especiales.
              </p>
              <a href="mailto:info@tokaidocr.com" className="btn btn-primary" style={{ width: '100%', fontSize: '0.8rem', padding: '0.6rem' }}>
                ENVIAR CORREO
              </a>
            </div>


          </div>
        </div>
      </section>
    </>
  );
}
