'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, ArrowUpDown, ShieldCheck } from 'lucide-react';
import { gsap } from 'gsap';
import MagicBento from '../../components/MagicBento';

interface CategoryTitleProps {
  text: string;
}

function CategoryTitle({ text }: CategoryTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const chars = containerRef.current.querySelectorAll('.char');
    
    // Initial State: Letters start on the far left (-800px), tiny, highly rotated, gold
    gsap.set(chars, { 
      x: -800, 
      opacity: 0, 
      scale: 0.1,
      rotation: -540,
      color: '#D4AF37'
    });

    const tl = gsap.timeline();

    // 1. Zoom and spin letters from left to right, ending up centered
    tl.to(chars, {
      x: 0,
      opacity: 1,
      scale: 1,
      rotation: 0,
      color: '#C8102E', // Tokaido Lacquer Crimson Red
      duration: 1.1,
      stagger: 0.035,
      ease: 'back.out(1.6)',
    });

    // 2. Add a very elegant, soft multi-layered dark shadow that makes letters float off the screen
    const Pop3DShadow = `
      1px 1px 2px rgba(0, 0, 0, 0.1),
      3px 3px 6px rgba(0, 0, 0, 0.15),
      6px 6px 12px rgba(0, 0, 0, 0.2),
      12px 12px 24px rgba(0, 0, 0, 0.25),
      20px 20px 40px rgba(0, 0, 0, 0.3)
    `;

    tl.to(chars, {
      textShadow: Pop3DShadow,
      duration: 0.4,
      stagger: 0.015,
    }, '-=0.5');

    // 3. Subtle, desopilante stagger bounce/pulse to finish
    tl.to(chars, {
      scale: 1.08,
      yoyo: true,
      repeat: 1,
      duration: 0.12,
      stagger: {
        each: 0.02,
        from: 'center'
      }
    }, '-=0.1');

  }, [text]);

  const characters = text.split('');

  return (
    <div 
      ref={containerRef} 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        width: '100%',
        padding: '1.8rem 0',
        overflow: 'hidden',
        position: 'relative',
        background: 'radial-gradient(circle, rgba(200, 16, 46, 0.04) 0%, rgba(0, 0, 0, 0.02) 50%, transparent 80%)',
        margin: '0.5rem 0 1.5rem',
        borderRadius: '12px',
        border: '1px solid rgba(0, 0, 0, 0.04)'
      }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.2rem' }}>
        {characters.map((char, index) => (
          <span 
            key={index} 
            className="char"
            style={{ 
              display: 'inline-block', 
              fontFamily: 'var(--font-title)', 
              fontSize: 'clamp(1.6rem, 5vw, 3.5rem)', 
              fontWeight: 'normal',
              textTransform: 'uppercase', 
              whiteSpace: char === ' ' ? 'pre' : 'normal',
              letterSpacing: 'clamp(1px, 0.3vw, 3px)',
              userSelect: 'none',
              transformStyle: 'preserve-3d'
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}

interface Product {
  _id: string;
  name: string;
  category: 'uniforms' | 'belts' | 'protectors';
  price: number;
  description: string;
  image: string;
  badge?: string;
  badgeColor?: string;
  createdAt: string;
  updatedAt: string;
}

function ShopContent() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get('category');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('default');
  const [addedProduct, setAddedProduct] = useState<string | null>(null);

  // Load products from DB API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/products');
        if (!res.ok) {
          throw new Error('No se pudo cargar el catálogo de productos de la base de datos.');
        }
        const data = await res.json();
        setProducts(data.products || []);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Error al conectar con la tienda.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Sync category state with search parameters on mount/change
  useEffect(() => {
    setSelectedCategory(catParam || 'all');
  }, [catParam]);

  const handleAddToCart = (productName: string) => {
    setAddedProduct(productName);
    setTimeout(() => setAddedProduct(null), 3000);
  };

  // Filtering Logic
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    return 0; // default order
  });

  const categoryText = selectedCategory === 'uniforms' ? 'KARATEGUIS' : 
                       selectedCategory === 'protectors' ? 'PROTECCIONES' : 
                       selectedCategory === 'equipment' ? 'EQUIPOS DE ENTRENAMIENTO' : 
                       selectedCategory === 'belts' ? 'CINTURONES (OBIS)' : 
                       'TODOS LOS PRODUCTOS';

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      {/* Header */}
      <div style={{ borderBottom: '2px solid var(--foreground)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-title)' }}>Catálogo Tokaido</h1>
        <p style={{ color: 'var(--medium-gray)', fontSize: '0.95rem' }}>
          Equipamiento oficial e importado directo de Japón. Tradición y protección garantizada.
        </p>
      </div>

      {/* Mind-blowing Animated Category Title Banner */}
      <CategoryTitle text={categoryText} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        {/* Controls Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'var(--light-gray)', padding: '1rem', border: '1px solid var(--border-color)' }}>
          {/* Search and Sort */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', flex: 1, justifyContent: 'flex-end' }}>
            {/* Search Input */}
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', border: '1px solid var(--border-color)', padding: '0.4rem 0.8rem', minWidth: '220px' }}>
              <Search size={16} color="var(--medium-gray)" style={{ marginRight: '5px' }} />
              <input 
                type="text" 
                placeholder="Buscar equipo..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ border: 'none', outline: 'none', fontSize: '0.85rem', width: '100%' }}
              />
            </div>

            {/* Sort Select */}
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', border: '1px solid var(--border-color)', padding: '0.4rem 0.8rem' }}>
              <ArrowUpDown size={16} color="var(--medium-gray)" style={{ marginRight: '5px' }} />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                style={{ border: 'none', outline: 'none', fontSize: '0.85rem', cursor: 'pointer', backgroundColor: 'transparent' }}
              >
                <option value="default">Ordenar por</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="name-asc">Nombre: A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dynamic Success Notification - Hidden for future release */}
        {/* 
        {addedProduct && (
          <div style={{ backgroundColor: '#D4EDDA', border: '1px solid #C3E6CB', color: '#155724', padding: '1rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>
            <ShieldCheck size={18} /> ¡Añadido al carrito: "{addedProduct}"!
          </div>
        )}
        */}

        {/* Loading and Catalog Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '6rem 0', color: 'var(--medium-gray)' }}>
            <div style={{ display: 'inline-block', width: '35px', height: '35px', border: '3px solid var(--border-color)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '1.25rem' }}></div>
            <p style={{ fontFamily: 'var(--font-subtitle)', fontWeight: 700 }}>CARGANDO CATÁLOGO TOKAIDO DESDE LA BASE DE DATOS...</p>
            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}} />
          </div>
        ) : error ? (
          <div style={{ backgroundColor: '#FFF3CD', border: '1px solid #FFEBAA', color: '#856404', padding: '1.5rem', marginBottom: '2rem', textAlign: 'center', fontFamily: 'var(--font-subtitle)', fontWeight: 700 }}>
            ⚠️ ERROR: {error}
          </div>
        ) : sortedProducts.length > 0 ? (
          <MagicBento 
            products={sortedProducts}
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={350}
            particleCount={10}
            glowColor="200, 16, 46"
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 0', border: '1px dashed var(--border-color)' }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--medium-gray)' }}>No se encontraron productos</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--medium-gray)', marginTop: '0.5rem' }}>
              Intenta cambiar tu término de búsqueda o selecciona otra categoría.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function ShopWrapper() {
  const searchParams = useSearchParams();
  const key = searchParams.toString();
  return <ShopContent key={key} />;
}

export default function Shop() {
  return (
    <Suspense fallback={
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.5rem', color: 'var(--medium-gray)', fontFamily: 'var(--font-title)' }}>CARGANDO CATÁLOGO TOKAIDO...</h3>
      </div>
    }>
      <ShopWrapper />
    </Suspense>
  );
}
