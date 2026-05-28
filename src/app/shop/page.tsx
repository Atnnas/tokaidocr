'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, ArrowUpDown, ShieldCheck } from 'lucide-react';
import MagicBento from '../../components/MagicBento';

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
  const catParam = searchParams.get('cat');
  
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
    if (catParam) {
      setSelectedCategory(catParam);
    }
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

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      {/* Header */}
      <div style={{ borderBottom: '2px solid var(--foreground)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-title)' }}>Catálogo Tokaido</h1>
        <p style={{ color: 'var(--medium-gray)', fontSize: '0.95rem' }}>
          Equipamiento oficial e importado directo de Japón. Tradición y protección garantizada.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        {/* Controls Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--light-gray)', padding: '1rem', border: '1px solid var(--border-color)' }}>
          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setSelectedCategory('all')} 
              style={{ 
                padding: '0.5rem 1rem', 
                border: 'none', 
                background: selectedCategory === 'all' ? 'var(--foreground)' : 'white', 
                color: selectedCategory === 'all' ? 'white' : 'var(--foreground)',
                fontSize: '0.8rem',
                fontWeight: 700,
                fontFamily: 'var(--font-subtitle)',
                cursor: 'pointer'
              }}
            >
              TODOS
            </button>
            <button 
              onClick={() => setSelectedCategory('uniforms')} 
              style={{ 
                padding: '0.5rem 1rem', 
                border: 'none', 
                background: selectedCategory === 'uniforms' ? 'var(--foreground)' : 'white', 
                color: selectedCategory === 'uniforms' ? 'white' : 'var(--foreground)',
                fontSize: '0.8rem',
                fontWeight: 700,
                fontFamily: 'var(--font-subtitle)',
                cursor: 'pointer'
              }}
            >
              UNIFORMES (DOGIS)
            </button>
            <button 
              onClick={() => setSelectedCategory('belts')} 
              style={{ 
                padding: '0.5rem 1rem', 
                border: 'none', 
                background: selectedCategory === 'belts' ? 'var(--foreground)' : 'white', 
                color: selectedCategory === 'belts' ? 'white' : 'var(--foreground)',
                fontSize: '0.8rem',
                fontWeight: 700,
                fontFamily: 'var(--font-subtitle)',
                cursor: 'pointer'
              }}
            >
              CINTURONES (OBIS)
            </button>
            <button 
              onClick={() => setSelectedCategory('protectors')} 
              style={{ 
                padding: '0.5rem 1rem', 
                border: 'none', 
                background: selectedCategory === 'protectors' ? 'var(--foreground)' : 'white', 
                color: selectedCategory === 'protectors' ? 'white' : 'var(--foreground)',
                fontSize: '0.8rem',
                fontWeight: 700,
                fontFamily: 'var(--font-subtitle)',
                cursor: 'pointer'
              }}
            >
              PROTECCIONES
            </button>
          </div>

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

export default function Shop() {
  return (
    <Suspense fallback={
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.5rem', color: 'var(--medium-gray)', fontFamily: 'var(--font-title)' }}>CARGANDO CATÁLOGO TOKAIDO...</h3>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
