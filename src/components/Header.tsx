'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import { 
  User, 
  Menu, 
  X, 
  LogOut, 
  ChevronDown, 
  Search, 
  ShoppingBag, 
  Heart,
  PhoneCall,
  ArrowRight
} from 'lucide-react';

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const shopDropdownRef = useRef<HTMLLIElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const shopCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleShopMouseEnter = () => {
    if (shopCloseTimeoutRef.current) {
      clearTimeout(shopCloseTimeoutRef.current);
      shopCloseTimeoutRef.current = null;
    }
    setShopDropdownOpen(true);
  };

  const handleShopMouseLeave = () => {
    if (shopCloseTimeoutRef.current) {
      clearTimeout(shopCloseTimeoutRef.current);
    }
    shopCloseTimeoutRef.current = setTimeout(() => {
      setShopDropdownOpen(false);
    }, 250);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (shopDropdownRef.current && !shopDropdownRef.current.contains(event.target as Node)) {
        setShopDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setShopDropdownOpen(false);
    return () => {
      if (shopCloseTimeoutRef.current) clearTimeout(shopCloseTimeoutRef.current);
    };
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    } else {
      router.push('/shop');
    }
  };

  return (
    <header className="tokaido-header">
      <div className="header-inner">
        {/* 1. BRAND LOGO */}
        <div className="header-logo-area">
          <Link href="/" className="logo-anchor" aria-label="Tokaido Costa Rica - Inicio" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}>
            <div style={{ width: '40px', height: '40px', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
              <img 
                src="/tokaido_symbol.png" 
                alt="Tokaido" 
                style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '0.5px', color: '#111111', fontFamily: 'var(--font-title, sans-serif)' }}>TOKAIDO</span>
              <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '1.8px', color: '#E50914' }}>COSTA RICA</span>
            </div>
          </Link>
        </div>

        {/* 2. MAIN NAVIGATION */}
        <nav className="header-nav-menu desktop-only" aria-label="Navegación principal">
          <ul className="nav-list">
            <li>
              <Link 
                href="/" 
                className={`nav-item ${pathname === '/' ? 'active' : ''}`}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link 
                href="/#about" 
                className="nav-item"
              >
                Nosotros
              </Link>
            </li>
            <li 
              ref={shopDropdownRef} 
              className={`dropdown-li ${shopDropdownOpen ? 'is-open' : ''}`}
              onMouseEnter={handleShopMouseEnter}
              onMouseLeave={handleShopMouseLeave}
            >
              <Link 
                href="/shop" 
                className={`nav-item dropdown-toggle ${pathname?.startsWith('/shop') ? 'active' : ''}`}
                aria-expanded={shopDropdownOpen}
                onClick={() => setShopDropdownOpen(false)}
              >
                <span>Productos</span>
                <ChevronDown size={14} className={`dropdown-arrow ${shopDropdownOpen ? 'rotated' : ''}`} />
              </Link>

              <ul 
                className={`dropdown-flyout ${shopDropdownOpen ? 'is-open' : ''}`}
                role="menu"
                onMouseEnter={handleShopMouseEnter}
                onMouseLeave={handleShopMouseLeave}
              >
                <li className="dropdown-li-item">
                  <Link 
                    href="/shop?search=Kumite" 
                    className="simple-dropdown-item" 
                    onClick={() => setShopDropdownOpen(false)}
                  >
                    Kumite Master II WKF
                  </Link>
                </li>

                <li className="dropdown-li-item">
                  <Link 
                    href="/shop?search=Kata" 
                    className="simple-dropdown-item" 
                    onClick={() => setShopDropdownOpen(false)}
                  >
                    Kata Master WKF - Corte Americano
                  </Link>
                </li>

                <li className="dropdown-li-item">
                  <Link 
                    href="/shop?search=Espinillera" 
                    className="simple-dropdown-item" 
                    onClick={() => setShopDropdownOpen(false)}
                  >
                    Espinillera WKF
                  </Link>
                </li>

                <li className="dropdown-li-item">
                  <Link 
                    href="/shop?search=Guantin" 
                    className="simple-dropdown-item" 
                    onClick={() => setShopDropdownOpen(false)}
                  >
                    Guantin De Competencia WKF
                  </Link>
                </li>

                <li className="dropdown-li-item">
                  <Link 
                    href="/shop?search=Pectoral" 
                    className="simple-dropdown-item" 
                    onClick={() => setShopDropdownOpen(false)}
                  >
                    Pectoral Unisex WKF
                  </Link>
                </li>

                <li className="dropdown-li-item">
                  <Link 
                    href="/shop?search=Femenino" 
                    className="simple-dropdown-item" 
                    onClick={() => setShopDropdownOpen(false)}
                  >
                    Protector Femenino WKF
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link 
                href="/contact" 
                className={`nav-item ${pathname === '/contact' ? 'active' : ''}`}
              >
                Contáctenos
              </Link>
            </li>
          </ul>
        </nav>

        {/* 3. RIGHT UTILITIES */}
        <div className="header-right-cluster">
          {/* Search Trigger */}
          {searchOpen ? (
            <form onSubmit={handleSearchSubmit} className="search-popup-bar" role="search">
              <input 
                ref={searchInputRef}
                type="search" 
                placeholder="Buscar equipo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="search-input-field"
              />
              <button 
                type="button" 
                onClick={() => setSearchOpen(false)}
                className="search-btn-close"
                aria-label="Cerrar búsqueda"
              >
                <X size={15} />
              </button>
            </form>
          ) : (
            <button 
              type="button" 
              onClick={() => {
                setSearchOpen(true);
                setTimeout(() => searchInputRef.current?.focus(), 50);
              }}
              className="icon-utility-btn"
              aria-label="Buscar producto"
            >
              <Search size={18} />
            </button>
          )}

          {/* User Account */}
          <div ref={userDropdownRef} className="user-account-container">
            {status === 'authenticated' && session?.user ? (
              <>
                <button 
                  type="button" 
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="icon-utility-btn"
                  aria-label="Perfil de usuario"
                >
                  <User size={18} />
                </button>
                {userDropdownOpen && (
                  <div className="user-dropdown-card">
                    <div className="user-card-head">
                      <strong>{session.user.name}</strong>
                      <span>{session.user.email}</span>
                    </div>
                    <Link href="/profile" className="user-card-link" onClick={() => setUserDropdownOpen(false)}>
                      Mi Perfil
                    </Link>
                    {session.user.role === 'admin' && (
                      <Link href="/admin" className="user-card-link admin" onClick={() => setUserDropdownOpen(false)}>
                        Panel Admin
                      </Link>
                    )}
                    <button 
                      type="button" 
                      onClick={() => { signOut(); setUserDropdownOpen(false); }}
                      className="user-card-link logout"
                    >
                      <LogOut size={13} />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button 
                type="button" 
                onClick={() => signIn('google')}
                className="icon-utility-btn"
                aria-label="Iniciar sesión"
                title="Iniciar sesión"
              >
                <User size={18} />
              </button>
            )}
          </div>

          {/* Wishlist Icon */}
          <Link href="/shop" className="icon-utility-btn wishlist-btn desktop-only" aria-label="Lista de deseos">
            <Heart size={18} />
            <span className="count-badge">0</span>
          </Link>

          {/* WhatsApp / Phone Box */}
          <div className="phone-cart-capsule desktop-only">
            <Link href="/shop" className="cart-icon-wrap" aria-label="Carrito de compras">
              <ShoppingBag size={19} />
              <span className="cart-badge">0</span>
            </Link>
            <div className="phone-copy-wrap">
              <span className="phone-label">CELULAR/WHATSAPP</span>
              <a 
                href="https://wa.me/50687378597?text=Hola,%20quisiera%20asesoría%20sobre%20equipamiento%20Tokaido%20en%20Costa%20Rica"
                target="_blank"
                rel="noopener noreferrer"
                className="phone-num-link"
              >
                (+506) 8737-8597
              </a>
            </div>
          </div>

          {/* Mobile Hamburger Trigger */}
          <button 
            type="button" 
            className="mobile-hamburger-btn mobile-only"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-sheet">
          <ul className="mobile-nav-list">
            <li>
              <Link href="/" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/#about" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                Nosotros
              </Link>
            </li>
            <li>
              <Link href="/shop" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                Productos
              </Link>
              <div className="mobile-subnav">
                <Link href="/shop?search=Kumite" onClick={() => setMobileMenuOpen(false)}>Kumite Master II WKF</Link>
                <Link href="/shop?search=Kata" onClick={() => setMobileMenuOpen(false)}>Kata Master WKF - Corte Americano</Link>
                <Link href="/shop?search=Espinillera" onClick={() => setMobileMenuOpen(false)}>Espinillera WKF</Link>
                <Link href="/shop?search=Guantin" onClick={() => setMobileMenuOpen(false)}>Guantin De Competencia WKF</Link>
                <Link href="/shop?search=Pectoral" onClick={() => setMobileMenuOpen(false)}>Pectoral Unisex WKF</Link>
                <Link href="/shop?search=Femenino" onClick={() => setMobileMenuOpen(false)}>Protector Femenino WKF</Link>
              </div>
            </li>
            <li>
              <Link href="/contact" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                Contáctenos
              </Link>
            </li>
          </ul>

          <div className="mobile-phone-banner">
            <span className="m-label">CELULAR / WHATSAPP COSTA RICA</span>
            <a 
              href="https://wa.me/50687378597?text=Hola,%20quisiera%20asesoría%20sobre%20equipamiento%20Tokaido%20en%20Costa%20Rica"
              target="_blank"
              rel="noopener noreferrer"
              className="m-phone"
            >
              (+506) 8737-8597
            </a>
          </div>
        </div>
      )}

      {/* STYLES */}
      <style jsx>{`
        .tokaido-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: #FFFFFF;
          border-bottom: 1px solid #EAEAEA;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.04);
          font-family: 'Outfit', 'Inter', -apple-system, sans-serif;
        }

        .header-inner {
          max-width: 1480px;
          margin: 0 auto;
          height: 80px;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        /* 1. Logo */
        .header-logo-area {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .tokaido-brand-logo {
          height: 38px;
          width: auto;
          object-fit: contain;
          display: block;
        }

        /* 2. Navigation */
        .header-nav-menu {
          display: flex;
          align-items: center;
          height: 100%;
        }

        .nav-list {
          display: flex;
          align-items: center;
          height: 100%;
          gap: 2.2rem;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .nav-list > li {
          height: 100%;
          display: flex;
          align-items: center;
        }

        .nav-item {
          font-size: 0.95rem;
          font-weight: 500;
          color: #222222;
          text-decoration: none;
          transition: color 0.15s ease;
          position: relative;
          display: flex;
          align-items: center;
          height: 100%;
          padding: 0 0.25rem;
        }

        .nav-item:hover,
        .nav-item.active {
          color: #E50914;
        }

        .dropdown-li {
          position: relative;
          display: flex;
          align-items: center;
          height: 100%;
        }

        .dropdown-toggle {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          cursor: pointer;
        }

        .dropdown-arrow {
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .dropdown-li:hover .dropdown-arrow,
        .dropdown-li.is-open .dropdown-arrow,
        .dropdown-arrow.rotated {
          transform: rotate(180deg);
        }

        .dropdown-flyout {
          position: absolute;
          top: 100%;
          left: 0;
          width: 290px;
          background: #FFFFFF;
          border: 1px solid #EAEAEA;
          border-radius: 4px;
          padding: 0.8rem 0;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          opacity: 0;
          visibility: hidden;
          transform: translateY(4px);
          pointer-events: none;
          transition: opacity 0.18s ease, transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.18s;
          z-index: 1000;
          list-style: none;
          margin: 0;
          display: flex;
          flex-direction: column;
        }

        /* Invisible bridge connecting the toggle button and the flyout */
        .dropdown-flyout::before {
          content: '';
          position: absolute;
          top: -14px;
          left: 0;
          right: 0;
          height: 14px;
          background: transparent;
        }

        .dropdown-li:hover .dropdown-flyout,
        .dropdown-flyout:hover,
        .dropdown-flyout.is-open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
          pointer-events: auto;
        }

        .dropdown-li-item {
          display: block !important;
          width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          list-style: none !important;
        }

        .dropdown-flyout :global(a.simple-dropdown-item),
        .simple-dropdown-item {
          display: block !important;
          width: 100% !important;
          box-sizing: border-box !important;
          padding: 0.65rem 1.6rem !important;
          font-size: 0.95rem !important;
          font-weight: 600 !important;
          color: #111111 !important;
          line-height: 1.35 !important;
          text-decoration: none !important;
          background-color: transparent !important;
          transition: color 0.15s ease, background-color 0.15s ease, padding-left 0.15s ease !important;
        }

        /* Iluminación al pasar el mouse */
        .dropdown-flyout :global(a.simple-dropdown-item:hover),
        .simple-dropdown-item:hover {
          color: #E50914 !important;
          background-color: #FAFAFA !important;
          padding-left: 1.85rem !important;
        }

        /* 3. Right Cluster */
        .header-right-cluster {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex-shrink: 0;
        }

        .icon-utility-btn {
          background: transparent;
          border: none;
          color: #333333;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.4rem;
          transition: color 0.15s ease;
          position: relative;
        }

        .icon-utility-btn:hover {
          color: #E50914;
        }

        .wishlist-btn {
          position: relative;
        }

        .count-badge {
          position: absolute;
          top: -2px;
          right: -4px;
          background: #E50914;
          color: #FFFFFF;
          font-size: 0.65rem;
          font-weight: 700;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .search-popup-bar {
          display: flex;
          align-items: center;
          border: 1px solid #D0D0D0;
          border-radius: 999px;
          padding: 0.35rem 0.8rem;
          background: #F9F9F9;
        }

        .search-input-field {
          border: none;
          outline: none;
          background: transparent;
          font-size: 0.85rem;
          color: #111111;
          width: 160px;
        }

        .search-btn-close {
          background: transparent;
          border: none;
          color: #888888;
          cursor: pointer;
          padding: 0;
        }

        /* Phone & Cart Capsule */
        .phone-cart-capsule {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding-left: 1rem;
          border-left: 1px solid #EBEBEB;
        }

        .cart-icon-wrap {
          position: relative;
          color: #222222;
          display: flex;
          align-items: center;
          text-decoration: none;
        }

        .cart-badge {
          position: absolute;
          top: -4px;
          right: -8px;
          background: #E50914;
          color: #FFFFFF;
          font-size: 0.65rem;
          font-weight: 700;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .phone-copy-wrap {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }

        .phone-label {
          font-size: 0.65rem;
          font-weight: 600;
          color: #777777;
          letter-spacing: 0.5px;
        }

        .phone-num-link {
          font-size: 0.9rem;
          font-weight: 700;
          color: #E50914;
          text-decoration: none;
        }

        /* User Menu */
        .user-account-container {
          position: relative;
        }

        .user-dropdown-card {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: 220px;
          background: #FFFFFF;
          border: 1px solid #EAEAEA;
          border-radius: 8px;
          padding: 0.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          z-index: 10;
        }

        .user-card-head {
          padding: 0.4rem 0.6rem 0.6rem;
          border-bottom: 1px solid #EEEEEE;
          margin-bottom: 0.35rem;
        }

        .user-card-head strong {
          display: block;
          font-size: 0.85rem;
          color: #111111;
        }

        .user-card-head span {
          display: block;
          font-size: 0.72rem;
          color: #777777;
        }

        .user-card-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.6rem;
          font-size: 0.82rem;
          color: #444444;
          text-decoration: none;
          border-radius: 6px;
          width: 100%;
          border: none;
          background: transparent;
          cursor: pointer;
        }

        .user-card-link:hover {
          background: #F5F5F5;
          color: #111111;
        }

        .user-card-link.admin {
          color: #D4AF37;
          font-weight: 600;
        }

        .user-card-link.logout {
          color: #E50914;
        }

        .mobile-hamburger-btn {
          background: transparent;
          border: none;
          color: #111111;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        /* Mobile Drawer */
        .mobile-drawer-sheet {
          background: #FFFFFF;
          border-top: 1px solid #EAEAEA;
          padding: 1.5rem 2rem 2.5rem;
        }

        .mobile-nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .mobile-nav-item {
          font-size: 1.05rem;
          font-weight: 600;
          color: #111111;
          text-decoration: none;
          display: block;
        }

        .mobile-subnav {
          padding-left: 1rem;
          margin-top: 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .mobile-subnav a {
          font-size: 0.88rem;
          color: #666666;
          text-decoration: none;
        }

        .mobile-phone-banner {
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid #EAEAEA;
        }

        .m-label {
          display: block;
          font-size: 0.7rem;
          font-weight: 700;
          color: #888888;
        }

        .m-phone {
          display: block;
          font-size: 1.1rem;
          font-weight: 800;
          color: #E50914;
          text-decoration: none;
          margin-top: 0.2rem;
        }

        .desktop-only {
          display: flex;
        }

        .mobile-only {
          display: none;
        }

        @media (max-width: 992px) {
          .desktop-only {
            display: none !important;
          }
          .mobile-only {
            display: flex !important;
          }
          .header-inner {
            padding: 0 1.25rem;
            height: 70px;
          }
        }
      `}</style>
    </header>
  );
}
