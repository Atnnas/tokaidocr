'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, ArrowUpDown, X, Star, Heart, ArrowRight, ShieldCheck, Truck, Headphones, MessageCircle } from 'lucide-react';

export interface Product {
  _id: string;
  name: string;
  category: 'uniforms' | 'belts' | 'protectors' | 'equipment';
  price: number;
  description: string;
  image: string;
  badge?: string;
  badgeColor?: string;
}

// Fallback authentic Tokaido products in case DB is starting up
const FALLBACK_PRODUCTS: Product[] = [
  {
    _id: 'prod-kumite-master',
    name: 'Kumite Master II WKF',
    category: 'uniforms',
    price: 115000,
    description: 'Set de 2 chaquetas (azul + rojo) y 1 pantalón. Ultraligero y de secado rápido.',
    image: '/products/kumite_master.jpg',
    badge: 'WKF Approved'
  },
  {
    _id: 'prod-kata-master',
    name: 'Kata Master WKF - Corte Americano',
    category: 'uniforms',
    price: 135000,
    description: '1 chaqueta pesada y 1 pantalón con snap sound inigualable para kata de alta competencia.',
    image: '/products/kata_master.jpg',
    badge: 'Kata Master'
  },
  {
    _id: 'prod-espinillera',
    name: 'Espinillera WKF',
    category: 'protectors',
    price: 38000,
    description: '1 Par con empeine desmontable. Colores disponibles: Rojo y Azul.',
    image: '/products/espinillera.jpg',
    badge: 'WKF Approved'
  },
  {
    _id: 'prod-guantin',
    name: 'Guantín de competencia WKF',
    category: 'protectors',
    price: 28000,
    description: '1 Par con espuma de alta absorción y cierre ergonómico. Colores: Rojo y Azul.',
    image: '/products/guantin.jpg',
    badge: 'Competencia'
  },
  {
    _id: 'prod-pectoral',
    name: 'Protector Pectoral Unisex WKF',
    category: 'protectors',
    price: 35000,
    description: 'Unidad homologada para torneos oficiales. Color disponible: Blanco.',
    image: '/products/pectoral.jpg',
    badge: 'Seguridad'
  },
  {
    _id: 'prod-femenino',
    name: 'Protector Femenino WKF',
    category: 'protectors',
    price: 36000,
    description: 'Unidad anatómica con copas protectoras integradas. Color disponible: Blanco.',
    image: '/products/femenino.jpg',
    badge: 'Femenino'
  }
];

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const catParam = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>(catParam);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<string>('default');

  // Load products from DB API with fallback
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          if (data.products && data.products.length > 0) {
            setProducts(data.products);
          }
        }
        setError(null);
      } catch (err: any) {
        // Fallback already pre-loaded
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Sync category state with search parameters
  useEffect(() => {
    setSelectedCategory(catParam);
  }, [catParam]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      router.push('/shop', { scroll: false });
    } else {
      router.push(`/shop?category=${category}`, { scroll: false });
    }
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
    <div className="shop-catalog-page">
      {/* 1. Header Banner */}
      <section className="shop-header-banner">
        <div className="banner-container">
          <span className="banner-eyebrow">TOKAIDO COSTA RICA • CATÁLOGO OFICIAL</span>
          <h1 className="banner-title">Implementación Deportiva para Karate</h1>
          <p className="banner-subline">
            Equipamiento reglamentario homologado por la World Karate Federation (WKF). Envíos a todo el país y atención personalizada.
          </p>
        </div>
      </section>

      {/* 2. Main Store Chassis */}
      <section className="shop-main-section">
        <div className="shop-container">
          {/* Category Tabs */}
          <div className="category-filter-tabs">
            {[
              { id: 'all', label: 'Todos' },
              { id: 'uniforms', label: 'Uniformes' },
              { id: 'protectors', label: 'Protectores' },
              { id: 'belts', label: 'Cinturones' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`tab-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Controls Bar: Count, Search & Sort */}
          <div className="shop-toolbar-bar">
            <div className="count-label">
              <span>Mostrando <strong>{sortedProducts.length}</strong> {sortedProducts.length === 1 ? 'producto' : 'productos'}</span>
            </div>

            <div className="toolbar-actions">
              {/* Search Box */}
              <div className="search-input-pill">
                <Search size={15} className="search-icon" />
                <input 
                  type="search"
                  placeholder="Buscar modelo o equipo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-field"
                />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery('')} className="clear-btn">
                    <X size={13} />
                  </button>
                )}
              </div>

              {/* Sort Selector */}
              <div className="sort-input-pill">
                <ArrowUpDown size={14} className="sort-icon" />
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-dropdown"
                >
                  <option value="default">Recomendados</option>
                  <option value="price-asc">Precio: Menor a Mayor</option>
                  <option value="price-desc">Precio: Mayor a Menor</option>
                  <option value="name-asc">Nombre: A - Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {loading && products.length === 0 ? (
            <div className="loading-state">
              <div className="loading-spinner" />
              <p>Cargando catálogo Tokaido Costa Rica...</p>
            </div>
          ) : sortedProducts.length > 0 ? (
            <div className="shop-catalog-grid">
              {sortedProducts.map((prod) => (
                <div key={prod._id} className="tokaido-item-card">
                  <div className="item-image-wrapper">
                    <img src={prod.image} alt={prod.name} className="product-photo" />
                    <span className="heart-badge" aria-label="Guardar en favoritos">
                      <Heart size={15} />
                    </span>
                    {prod.badge && (
                      <span className="product-badge-flag">
                        {prod.badge}
                      </span>
                    )}
                  </div>

                  <div className="item-lower-content">
                    <div className="five-stars-row" aria-label="5 de 5 estrellas">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={13} fill="#F5A623" color="#F5A623" />
                      ))}
                    </div>

                    <h3 className="product-name">
                      {prod.name}
                    </h3>

                    <p className="product-variant-note">
                      {prod.description}
                    </p>

                    <div className="item-bottom-row">
                      <span className="product-price-val">
                        ₡{prod.price.toLocaleString('es-CR')}
                      </span>
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
          ) : (
            <div className="empty-catalog-state">
              <h3>No se encontraron productos</h3>
              <p>Prueba con otro término de búsqueda o selecciona la categoría "Todos".</p>
              <button 
                type="button" 
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); router.push('/shop'); }}
                className="reset-btn"
              >
                Ver todo el catálogo
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. Floating WhatsApp Trigger */}
      <a 
        href="https://wa.me/50687378597?text=Hola,%20quisiera%20asesoría%20sobre%20el%20catálogo%20Tokaido"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-wa-btn"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={28} color="#FFFFFF" />
      </a>

      <style jsx>{`
        .shop-catalog-page {
          background: #FFFFFF;
          color: #222222;
          font-family: 'Outfit', 'Inter', -apple-system, sans-serif;
          min-height: 85vh;
        }

        /* 1. Header Banner */
        .shop-header-banner {
          background: #101010;
          color: #FFFFFF;
          padding: 3.5rem 1.5rem 3rem;
          text-align: center;
          border-bottom: 3px solid #E50914;
        }

        .banner-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .banner-eyebrow {
          display: inline-block;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #E50914;
          margin-bottom: 0.75rem;
        }

        .banner-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          letter-spacing: -0.5px;
          margin: 0 0 0.75rem;
          line-height: 1.15;
        }

        .banner-subline {
          font-size: 0.98rem;
          color: #AAAAAA;
          margin: 0 auto;
          max-width: 650px;
          line-height: 1.5;
        }

        /* 2. Main Store Chassis */
        .shop-main-section {
          padding: 3rem 1.5rem 6rem;
        }

        .shop-container {
          max-width: 1480px;
          margin: 0 auto;
        }

        /* Category Filter Tabs */
        .category-filter-tabs {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .tab-btn {
          background: transparent;
          border: none;
          font-size: 0.98rem;
          font-weight: 600;
          color: #666666;
          padding: 0.5rem 1.4rem;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.15s ease;
        }

        .tab-btn:hover {
          color: #111111;
        }

        .tab-btn.active {
          color: #E50914;
          border-bottom-color: #E50914;
          font-weight: 700;
        }

        /* Toolbar */
        .shop-toolbar-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #F9F9F9;
          border: 1px solid #ECECEC;
          border-radius: 8px;
          padding: 0.85rem 1.5rem;
          margin-bottom: 2.5rem;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .count-label {
          font-size: 0.88rem;
          color: #666666;
        }

        .count-label strong {
          color: #111111;
        }

        .toolbar-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .search-input-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #FFFFFF;
          border: 1px solid #D5D5D5;
          border-radius: 6px;
          padding: 0.45rem 0.85rem;
          min-width: 250px;
        }

        .search-icon {
          color: #888888;
        }

        .search-field {
          background: transparent;
          border: none;
          outline: none;
          font-size: 0.88rem;
          color: #111111;
          width: 100%;
        }

        .clear-btn {
          background: transparent;
          border: none;
          color: #888888;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 0;
        }

        .sort-input-pill {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          background: #FFFFFF;
          border: 1px solid #D5D5D5;
          border-radius: 6px;
          padding: 0.45rem 0.85rem;
        }

        .sort-icon {
          color: #888888;
        }

        .sort-dropdown {
          background: transparent;
          border: none;
          outline: none;
          font-size: 0.88rem;
          color: #111111;
          cursor: pointer;
        }

        /* Catalog Grid */
        .shop-catalog-grid {
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
          height: 270px;
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

        .product-badge-flag {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #E50914;
          color: #FFFFFF;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
          letter-spacing: 0.5px;
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
          font-size: 1.08rem;
          font-weight: 700;
          color: #111111;
          margin: 0 0 0.4rem;
        }

        .product-variant-note {
          font-size: 0.84rem;
          color: #666666;
          line-height: 1.45;
          margin: 0 0 1rem;
          min-height: 2.5em;
        }

        .item-bottom-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.85rem;
          border-top: 1px solid #EEEEEE;
        }

        .product-price-val {
          font-size: 1.2rem;
          font-weight: 800;
          color: #111111;
        }

        .card-quote-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: #111111;
          color: #FFFFFF;
          font-size: 0.85rem;
          font-weight: 700;
          padding: 0.55rem 1.15rem;
          border-radius: 4px;
          text-decoration: none;
          transition: background 0.18s ease;
        }

        .card-quote-cta:hover {
          background: #E50914;
        }

        /* States */
        .loading-state, .empty-catalog-state {
          text-align: center;
          padding: 5rem 1rem;
          background: #F9F9F9;
          border-radius: 8px;
          border: 1px dashed #DDDDDD;
        }

        .loading-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid #EBEBEB;
          border-top-color: #E50914;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 1rem;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .reset-btn {
          margin-top: 1rem;
          background: #111111;
          color: #FFFFFF;
          border: none;
          padding: 0.65rem 1.5rem;
          border-radius: 4px;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
        }

        .reset-btn:hover {
          background: #E50914;
        }

        /* Floating WA */
        .floating-wa-btn {
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

        .floating-wa-btn:hover {
          transform: scale(1.1);
        }

        @media (max-width: 992px) {
          .shop-catalog-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .shop-catalog-grid {
            grid-template-columns: 1fr;
          }
          .shop-toolbar-bar {
            flex-direction: column;
            align-items: stretch;
          }
          .toolbar-actions {
            flex-direction: column;
          }
          .search-input-pill, .sort-input-pill {
            width: 100%;
          }
        }
      `}</style>
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
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFFFFF', color: '#666666' }}>
        <span>Cargando catálogo Tokaido Costa Rica...</span>
      </div>
    }>
      <ShopWrapper />
    </Suspense>
  );
}
