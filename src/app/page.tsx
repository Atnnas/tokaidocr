'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Truck, 
  ShieldCheck, 
  Headphones, 
  CreditCard, 
  Star, 
  ArrowRight, 
  Heart,
  MessageCircle,
  CheckCircle2
} from 'lucide-react';

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'uniforms' | 'protectors' | 'belts'>('all');

  const products = [
    {
      id: 'kumite-master',
      name: 'Kumite Master II WKF',
      category: 'uniforms',
      desc: 'Set de 2 chaquetas (azul + rojo) y 1 pantalón.',
      price: '₡115.000',
      image: '/products/kumite_master.jpg',
      badge: 'WKF Approved'
    },
    {
      id: 'kata-master',
      name: 'Kata Master WKF - Corte Americano',
      category: 'uniforms',
      desc: '1 chaqueta pesada y 1 pantalón con snap sound.',
      price: '₡135.000',
      image: '/products/kata_master.jpg',
      badge: 'Kata Master'
    },
    {
      id: 'espinillera',
      name: 'Espinillera WKF',
      category: 'protectors',
      desc: '1 Par. Colores disponibles: Rojo y azul.',
      price: '₡38.000',
      image: '/products/espinillera.jpg',
      badge: 'Protección'
    },
    {
      id: 'guantin',
      name: 'Guantín de competencia WKF',
      category: 'protectors',
      desc: '1 Par. Colores disponibles: Rojo y azul.',
      price: '₡28.000',
      image: '/products/guantin.jpg',
      badge: 'Competencia'
    },
    {
      id: 'pectoral',
      name: 'Protector Pectoral Unisex WKF',
      category: 'protectors',
      desc: 'Unidad. Color disponible: Blanco.',
      price: '₡35.000',
      image: '/products/pectoral.jpg',
      badge: 'Seguridad'
    },
    {
      id: 'femenino',
      name: 'Protector Femenino WKF',
      category: 'protectors',
      desc: 'Unidad anatómica. Color disponible: Blanco.',
      price: '₡36.000',
      image: '/products/femenino.jpg',
      badge: 'Femenino'
    }
  ];

  const filteredProducts = products.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  return (
    <div className="tokaido-cr-root">
      {/* ========================================================
          1. HERO BANNER
         ======================================================== */}
      <section className="main-hero-slider">
        <div className="hero-dark-chassis">
          <div className="hero-inner-container">
            {/* Left Title Column */}
            <div className="hero-content-col">
              <span className="hero-eyebrow-red">Colección 2026</span>
              <h1 className="hero-giant-title">
                TOKAIDO <br />
                COSTA RICA
              </h1>
              <div className="hero-wkf-tag">
                <span>Aprobado</span> <strong>WKF</strong>
              </div>
              <div className="hero-action-row">
                <Link 
                  href="/shop" 
                  className="theme-btn-red"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    background: '#E50914',
                    color: '#FFFFFF',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    padding: '0.85rem 1.8rem',
                    borderRadius: '4px',
                    textDecoration: 'none'
                  }}
                >
                  <span>Ver Colección</span>
                  <ArrowRight size={16} />
                </Link>
                <Link 
                  href="/contact" 
                  className="theme-btn-outline"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    background: 'transparent',
                    color: '#FFFFFF',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    padding: '0.85rem 1.6rem',
                    borderRadius: '4px',
                    textDecoration: 'none'
                  }}
                >
                  <span>Contáctenos</span>
                </Link>
              </div>
            </div>

            {/* Right Athlete Image with WKF Badge */}
            <div className="hero-visual-col" style={{ position: 'relative' }}>
              <img 
                src="/tokaido_cr_hero_athletes.jpg" 
                alt="Atletas Oficiales Tokaido Costa Rica Aprobado WKF"
                className="hero-athletes-img"
                style={{ 
                  borderRadius: '12px', 
                  boxShadow: '0 20px 40px rgba(0,0,0,0.7)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              />
              <img 
                src="/wkf_approved_seal.png" 
                alt="WKF Seal"
                style={{
                  position: 'absolute',
                  bottom: '-15px',
                  right: '-15px',
                  width: '95px',
                  height: '95px',
                  filter: 'drop-shadow(0 6px 15px rgba(0,0,0,0.6))'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. FEATURED SERVICES STRIP (4 BOXES)
         ======================================================== */}
      <section className="services-strip-section">
        <div className="services-container">
          <div className="services-grid">
            <div className="service-box">
              <div className="service-icon red">
                <Truck size={28} />
              </div>
              <div className="service-text">
                <strong>Envíos</strong>
                <span>A todo el País (GAM en 24h)</span>
              </div>
            </div>

            <div className="service-box">
              <div className="service-icon red">
                <ShieldCheck size={28} />
              </div>
              <div className="service-text">
                <strong>Pagos</strong>
                <span>100% Seguros (SINPE y Tarjetas)</span>
              </div>
            </div>

            <div className="service-box">
              <div className="service-icon red">
                <Headphones size={28} />
              </div>
              <div className="service-text">
                <strong>Atención Directa</strong>
                <span>Celular o WhatsApp (+506 8737-8597)</span>
              </div>
            </div>

            <div className="service-box">
              <div className="service-icon red">
                <CreditCard size={28} />
              </div>
              <div className="service-text">
                <strong>Garantía</strong>
                <span>100% Original Tokaido Japón</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. IMPLEMENTATION & COLLECTION CALLOUT SECTION
         ======================================================== */}
      <section id="about" className="collection-callout-section">
        <div className="collection-container">
          <div className="collection-card-shell">
            <div className="collection-split">
              {/* Left Copy */}
              <div className="collection-copy-col">
                <span className="col-tag">Approved WKF</span>
                <h2 className="col-title">TOKAIDO COSTA RICA</h2>
                <div className="col-sub">
                  Implementación deportiva para <span>Karate</span>
                </div>
                <p className="col-desc">
                  Equipamiento reglamentario para kata y kumite. Diseñado para ofrecer la máxima durabilidad, ventilación y sonoridad tradicional en combate y entrenamiento diario.
                </p>
                <div className="col-action-wrap">
                  <a 
                    href="https://wa.me/50687378597?text=Hola,%20quisiera%20cotizar%20equipamiento%20Tokaido%20en%20Costa%20Rica"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shop-now-btn"
                  >
                    <span>Cotizar</span>
                    <ArrowRight size={15} />
                  </a>
                  <img src="/tokaido_arrow.png" alt="" className="decorative-arrow" />
                </div>
              </div>

              <div className="collection-img-col">
                <div className="img-holder-bezel">
                  <img 
                    src="/tokaido_cr_collection_athletes.jpg" 
                    alt="Implementación deportiva Tokaido Costa Rica"
                    className="chair-athletes-img"
                    style={{
                      maxHeight: '440px',
                      borderRadius: '8px',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
                    }}
                  />
                  <div className="guarantee-round-stamp">
                    <span className="stamp-num">100%</span>
                    <span className="stamp-txt">ORIGINAL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. FEATURED PRODUCTS SECTION WITH TABS
         ======================================================== */}
      <section className="products-showcase-section">
        <div className="products-container">
          <div className="section-head-center">
            <h3>Implementación deportiva para karate!</h3>
          </div>

          {/* Filter Tabs */}
          <div className="filters-tab-bar">
            <button 
              type="button" 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              Todos
            </button>
            <button 
              type="button" 
              className={`filter-btn ${activeFilter === 'uniforms' ? 'active' : ''}`}
              onClick={() => setActiveFilter('uniforms')}
            >
              Uniformes
            </button>
            <button 
              type="button" 
              className={`filter-btn ${activeFilter === 'protectors' ? 'active' : ''}`}
              onClick={() => setActiveFilter('protectors')}
            >
              Protectores
            </button>
          </div>

          {/* Product Cards Grid */}
          <div className="products-catalog-grid">
            {filteredProducts.map((prod) => (
              <div key={prod.id} className="tokaido-item-card">
                <div className="item-image-wrapper">
                  <img src={prod.image} alt={prod.name} className="product-photo" />
                  <span className="heart-badge" aria-label="Favorito">
                    <Heart size={16} />
                  </span>
                  <div className="hover-detail-bar">
                    <Link href={`/shop?search=${encodeURIComponent(prod.name)}`} className="detail-action-link">
                      Detalles
                    </Link>
                  </div>
                </div>

                <div className="item-lower-content">
                  <div className="five-stars-row" aria-label="5 de 5 estrellas">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={13} fill="#F5A623" color="#F5A623" />
                    ))}
                  </div>

                  <h4 className="product-name">
                    <Link href="/shop">{prod.name}</Link>
                  </h4>

                  <span className="product-variant-note">{prod.desc}</span>

                  <div className="item-bottom-row">
                    <span className="product-price-val">{prod.price}</span>
                    <a 
                      href={`https://wa.me/50687378597?text=${encodeURIComponent(`Hola, quisiera cotizar el producto: ${prod.name}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-quote-cta"
                    >
                      <span>Cotizar</span>
                      <ArrowRight size={13} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Centered Bottom CTA */}
          <div className="products-bottom-cta">
            <Link href="/shop" className="theme-btn-black">
              <span>Ver Todo el Catálogo</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. QUALITY & MASTER TESTIMONIAL (SUMI-E ART SECTION)
         ======================================================== */}
      <section className="testimonial-sumie-section">
        <div className="testimonial-container">
          <div className="testimonial-box-card">
            <div className="testimonial-flex">
              {/* Left Ink Drawing */}
              <div className="sumie-photo-col">
                <div className="sumie-circle-frame">
                  <img 
                    src="/tokaido_sensei_sumie.jpg" 
                    alt="Tradición Marcial Tokaido"
                    className="sumie-img"
                  />
                </div>
              </div>

              {/* Right Quote Column */}
              <div className="sumie-text-col">
                <div className="stars-row">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={16} fill="#F5A623" color="#F5A623" />
                  ))}
                </div>

                <blockquote className="quote-text">
                  Nuestros <strong>protectores y cinturones</strong> están elaborados con los más altos estándares de calidad, durabilidad y comodidad marcial.
                </blockquote>

                <div className="quote-author-sign">
                  <strong>Tokaido Costa Rica</strong>
                  <span>Distribuidor Autorizado</span>
                </div>

                <div className="quote-action">
                  <a 
                    href="https://wa.me/50687378597?text=Hola,%20quisiera%20asesoría%20sobre%20equipamiento%20Tokaido%20en%20Costa%20Rica"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="quote-cotizar-btn"
                  >
                    <span>Cotizar</span>
                    <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. FLOATING WHATSAPP BUTTON (PULSE ANIMATION)
         ======================================================== */}
      <a 
        href="https://wa.me/50687378597?text=Hola,%20me%20gustaría%20obtener%20más%20información%20sobre%20los%20productos%20Tokaido"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-trigger pulse"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={30} color="#FFFFFF" />
      </a>

      {/* STYLES */}
      <style jsx>{`
        .tokaido-cr-root {
          font-family: 'Outfit', 'Inter', -apple-system, sans-serif;
          background: #FFFFFF;
          color: #222222;
          overflow-x: clip;
        }

        /* 1. Hero Slider */
        .main-hero-slider {
          background: #101010;
          position: relative;
          overflow: hidden;
          padding: 3rem 0 4rem;
        }

        .hero-dark-chassis {
          max-width: 1480px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .hero-inner-container {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          align-items: center;
          gap: 2rem;
          min-height: 520px;
        }

        .hero-content-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
          z-index: 2;
        }

        .hero-eyebrow-red {
          color: #E50914;
          font-size: 1.1rem;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .hero-giant-title {
          font-size: clamp(2.8rem, 5.5vw, 4.4rem);
          font-weight: 900;
          line-height: 1.08;
          color: #FFFFFF;
          margin: 0;
          letter-spacing: -0.5px;
        }

        .hero-wkf-tag {
          font-size: 1.3rem;
          color: #E50914;
          font-weight: 500;
        }

        .hero-wkf-tag strong {
          color: #E50914;
          font-weight: 800;
        }

        .hero-action-row {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-top: 1rem;
          flex-wrap: wrap;
        }

        .theme-btn-red {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: #E50914;
          color: #FFFFFF;
          font-size: 0.95rem;
          font-weight: 700;
          padding: 0.85rem 1.8rem;
          border-radius: 4px;
          text-decoration: none;
          transition: background 0.18s ease;
        }

        .theme-btn-red:hover {
          background: #C80812;
        }

        .theme-btn-outline {
          display: inline-flex;
          align-items: center;
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #FFFFFF;
          font-size: 0.95rem;
          font-weight: 600;
          padding: 0.85rem 1.6rem;
          border-radius: 4px;
          text-decoration: none;
          transition: border-color 0.18s ease, background 0.18s ease;
        }

        .theme-btn-outline:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: #FFFFFF;
        }

        .hero-visual-col {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-athletes-img {
          max-width: 100%;
          height: auto;
          max-height: 480px;
          object-fit: contain;
          filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.7));
        }

        /* 2. Services Strip */
        .services-strip-section {
          background: #FFFFFF;
          border-bottom: 1px solid #EEEEEE;
          padding: 2.25rem 0;
        }

        .services-container {
          max-width: 1480px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .service-box {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.5rem 0;
        }

        .service-icon.red {
          color: #E50914;
          flex-shrink: 0;
        }

        .service-text strong {
          display: block;
          font-size: 0.95rem;
          color: #111111;
        }

        .service-text span {
          display: block;
          font-size: 0.82rem;
          color: #777777;
        }

        /* 3. Collection Callout Section */
        .collection-callout-section {
          background: #F9F9F9;
          padding: 4.5rem 0;
          border-bottom: 1px solid #ECECEC;
        }

        .collection-container {
          max-width: 1480px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .collection-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 3.5rem;
        }

        .col-tag {
          display: inline-block;
          color: #E50914;
          font-size: 0.85rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .col-title {
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          font-weight: 900;
          color: #111111;
          margin: 0 0 0.5rem;
          letter-spacing: -0.5px;
        }

        .col-sub {
          font-size: 1.15rem;
          color: #444444;
          margin-bottom: 1rem;
        }

        .col-sub span {
          color: #E50914;
          font-weight: 700;
        }

        .col-desc {
          font-size: 0.92rem;
          color: #666666;
          line-height: 1.6;
          max-width: 520px;
          margin-bottom: 1.5rem;
        }

        .col-action-wrap {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .shop-now-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #111111;
          color: #FFFFFF;
          font-size: 0.92rem;
          font-weight: 700;
          padding: 0.75rem 1.6rem;
          border-radius: 4px;
          text-decoration: none;
          transition: background 0.18s ease;
        }

        .shop-now-btn:hover {
          background: #E50914;
        }

        .decorative-arrow {
          width: 60px;
          height: auto;
          object-fit: contain;
        }

        .collection-img-col {
          display: flex;
          justify-content: center;
        }

        .img-holder-bezel {
          position: relative;
        }

        .chair-athletes-img {
          max-width: 100%;
          height: auto;
          max-height: 420px;
          object-fit: contain;
        }

        .guarantee-round-stamp {
          position: absolute;
          bottom: 20px;
          left: 0;
          width: 75px;
          height: 75px;
          border-radius: 50%;
          background: #E50914;
          color: #FFFFFF;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 15px rgba(229, 9, 20, 0.4);
        }

        .stamp-num {
          font-size: 1.15rem;
          font-weight: 900;
          line-height: 1;
        }

        .stamp-txt {
          font-size: 0.55rem;
          font-weight: 800;
          letter-spacing: 0.5px;
        }

        /* 4. Products Showcase Section */
        .products-showcase-section {
          padding: 4.5rem 0 5rem;
          background: #FFFFFF;
        }

        .products-container {
          max-width: 1480px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .section-head-center {
          text-align: center;
          margin-bottom: 2rem;
        }

        .section-head-center h3 {
          font-size: clamp(1.6rem, 2.8vw, 2.2rem);
          font-weight: 800;
          color: #111111;
          margin: 0;
        }

        .filters-tab-bar {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          background: transparent;
          border: none;
          font-size: 0.95rem;
          font-weight: 600;
          color: #777777;
          padding: 0.4rem 1.25rem;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.15s ease;
        }

        .filter-btn:hover {
          color: #111111;
        }

        .filter-btn.active {
          color: #E50914;
          border-bottom-color: #E50914;
          font-weight: 700;
        }

        .products-catalog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .tokaido-item-card {
          background: #FFFFFF;
          border: 1px solid #EBEBEB;
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .tokaido-item-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
        }

        .item-image-wrapper {
          position: relative;
          height: 260px;
          background: #F9F9F9;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .product-photo {
          max-width: 85%;
          max-height: 85%;
          object-fit: contain;
          transition: transform 0.25s ease;
        }

        .tokaido-item-card:hover .product-photo {
          transform: scale(1.05);
        }

        .heart-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 32px;
          height: 32px;
          background: #FFFFFF;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #888888;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          cursor: pointer;
          transition: color 0.15s ease;
        }

        .heart-badge:hover {
          color: #E50914;
        }

        .hover-detail-bar {
          position: absolute;
          bottom: -40px;
          left: 0;
          right: 0;
          background: rgba(17, 17, 17, 0.9);
          padding: 0.5rem;
          text-align: center;
          transition: bottom 0.2s ease;
        }

        .tokaido-item-card:hover .hover-detail-bar {
          bottom: 0;
        }

        .detail-action-link {
          color: #FFFFFF;
          font-size: 0.85rem;
          font-weight: 700;
          text-decoration: none;
        }

        .item-lower-content {
          padding: 1.25rem 1.25rem 1.5rem;
        }

        .five-stars-row {
          display: flex;
          gap: 2px;
          margin-bottom: 0.5rem;
        }

        .product-name {
          font-size: 1.05rem;
          font-weight: 700;
          color: #111111;
          margin: 0 0 0.4rem;
        }

        .product-name a {
          color: inherit;
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .product-name a:hover {
          color: #E50914;
        }

        .product-variant-note {
          display: block;
          font-size: 0.82rem;
          color: #E50914;
          margin-bottom: 1rem;
        }

        .item-bottom-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.75rem;
          border-top: 1px solid #EEEEEE;
        }

        .product-price-val {
          font-size: 1.15rem;
          font-weight: 800;
          color: #111111;
        }

        .card-quote-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: #E50914;
          font-size: 0.85rem;
          font-weight: 700;
          text-decoration: none;
        }

        .products-bottom-cta {
          text-align: center;
          margin-top: 3.5rem;
        }

        .theme-btn-black {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #111111;
          color: #FFFFFF;
          font-size: 0.92rem;
          font-weight: 700;
          padding: 0.85rem 2rem;
          border-radius: 4px;
          text-decoration: none;
          transition: background 0.18s ease;
        }

        .theme-btn-black:hover {
          background: #E50914;
        }

        /* 5. Testimonial / Quality Guarantee Section */
        .testimonial-sumie-section {
          background: #F9F9F9;
          padding: 5rem 0;
          border-top: 1px solid #EBEBEB;
          border-bottom: 1px solid #EBEBEB;
        }

        .testimonial-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .testimonial-flex {
          display: flex;
          align-items: center;
          gap: 3rem;
        }

        .sumie-circle-frame {
          width: 170px;
          height: 170px;
          border-radius: 50%;
          overflow: hidden;
          background: #FFFFFF;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          flex-shrink: 0;
        }

        .sumie-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .sumie-text-col {
          flex: 1;
        }

        .stars-row {
          display: flex;
          gap: 3px;
          margin-bottom: 0.75rem;
        }

        .quote-text {
          font-size: 1.35rem;
          line-height: 1.5;
          color: #222222;
          font-weight: 500;
          margin: 0 0 1rem;
        }

        .quote-text strong {
          color: #E50914;
        }

        .quote-author-sign strong {
          display: block;
          font-size: 0.95rem;
          color: #111111;
        }

        .quote-author-sign span {
          display: block;
          font-size: 0.8rem;
          color: #777777;
        }

        .quote-action {
          margin-top: 1.25rem;
        }

        .quote-cotizar-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #111111;
          color: #FFFFFF;
          font-size: 0.88rem;
          font-weight: 700;
          padding: 0.65rem 1.4rem;
          border-radius: 4px;
          text-decoration: none;
          transition: background 0.18s ease;
        }

        .quote-cotizar-btn:hover {
          background: #E50914;
        }

        /* 6. Floating WhatsApp Button */
        .floating-whatsapp-trigger {
          position: fixed;
          bottom: 25px;
          right: 25px;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: #25D366;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 25px rgba(37, 211, 102, 0.45);
          z-index: 999;
          transition: transform 0.2s ease;
        }

        .floating-whatsapp-trigger:hover {
          transform: scale(1.1);
        }

        .pulse {
          animation: pulseAnim 2s infinite;
        }

        @keyframes pulseAnim {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.6);
          }
          70% {
            box-shadow: 0 0 0 16px rgba(37, 211, 102, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
          }
        }

        @media (max-width: 992px) {
          .hero-inner-container {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .hero-content-col {
            align-items: center;
          }
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .collection-split {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .col-action-wrap {
            justify-content: center;
          }
          .products-catalog-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .testimonial-flex {
            flex-direction: column;
            text-align: center;
          }
          .stars-row {
            justify-content: center;
          }
        }

        @media (max-width: 640px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
          .products-catalog-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
