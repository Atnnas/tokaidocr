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
          <span style={{ 
            display: 'inline-block', 
            color: 'var(--accent-gold)', 
            fontSize: '0.85rem', 
            fontFamily: 'var(--font-subtitle)', 
            fontWeight: 700, 
            letterSpacing: '4px', 
            marginBottom: '1.25rem',
            textShadow: '0 0 10px rgba(212, 175, 55, 0.7)'
          }}>
            SITIO EN CONSTRUCCIÓN
          </span>
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
            <Link href="/profile" className="btn btn-secondary" style={{ padding: '0.9rem 2.8rem', borderColor: '#FFFFFF', color: '#FFFFFF', backgroundColor: 'transparent' }}>
              MI PERFIL
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
              ✓ Servicio de bordado oficial en kanji y logo de dojo<br />
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
                <Phone size={24} />
              </div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', fontFamily: 'var(--font-title)' }}>WhatsApp Oficial</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--dark-gray)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                Escríbenos directamente para consultar tallas, existencias de uniformes de Kata/Kumite, o cotizaciones especiales para dojos.
              </p>
              <a href="https://wa.me/50681803125" target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{ width: '100%', fontSize: '0.8rem', padding: '0.6rem' }}>
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

            {/* Location Card */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2.5rem 2rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgba(17, 17, 17, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--foreground)', marginBottom: '1.25rem' }}>
                <MapPin size={24} />
              </div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', fontFamily: 'var(--font-title)' }}>Punto de Entrega</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--dark-gray)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                Coordinamos entregas directas y envíos a todo el territorio de Costa Rica por Correos de Costa Rica o encomiendas autorizadas.
              </p>
              <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--foreground)', fontFamily: 'var(--font-subtitle)' }}>
                San José, Costa Rica
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
