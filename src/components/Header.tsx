'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { ShoppingBag, User, Search, Menu, X, LogOut, ChevronDown, Shield } from 'lucide-react';

export default function Header() {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `/#${targetId}`);
      }
    }
  };

  return (
    <header 
      className="header-wrapper" 
      style={{ 
        width: '100%', 
        position: 'sticky', 
        top: 0, 
        zIndex: 100, 
        // 3D Shadow with a Crimson Glow effect
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.9), 0 2px 10px rgba(200, 16, 46, 0.45)'
      }}
    >
      
      {/* Main Navbar */}
      <div 
        className="main-nav" 
        style={{ 
          padding: '0.85rem 0', 
          backgroundColor: '#0c0c0c', // Deeper black for higher contrast
          borderBottom: '3.5px solid var(--primary)',
          position: 'relative'
        }}
      >
        {/* Subtle metallic reflection line on top of the border */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.15)', zIndex: 2 }}></div>

        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          {/* Brand Logo & Title */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <img 
              src="/tokaido.png" 
              alt="Tokaido" 
              // Premium red glow on logo icon
              style={{ 
                height: '52px', 
                width: 'auto', 
                filter: 'brightness(1) drop-shadow(0 0 8px rgba(200, 16, 46, 0.7))' 
              }} 
            />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ 
                fontFamily: 'var(--font-title)', 
                fontSize: '1.75rem', 
                color: '#FFFFFF', 
                letterSpacing: '1px', 
                textTransform: 'uppercase', 
                lineHeight: 1, 
                fontWeight: 'bold',
                // Metallic 3D drop shadow
                textShadow: '1px 2px 3px rgba(0, 0, 0, 0.8), 0 0 10px rgba(255, 255, 255, 0.1)'
              }}>
                Tokaido
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                <span style={{ 
                  fontFamily: 'var(--font-subtitle)', 
                  fontSize: '0.75rem', 
                  color: 'var(--accent-gold)', 
                  letterSpacing: '2.5px', 
                  textTransform: 'uppercase', 
                  fontWeight: 700, 
                  // Elegant gold glow
                  textShadow: '0 0 6px rgba(212, 175, 55, 0.45)'
                }}>
                  Costa Rica
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 6" width="15" height="9" style={{ border: '0.5px solid rgba(255,255,255,0.2)', display: 'inline-block', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                  <rect width="10" height="6" fill="#002F6C"/>
                  <rect y="1" width="10" height="4" fill="#FFFFFF"/>
                  <rect y="2" width="10" height="2" fill="#C8102E"/>
                </svg>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-only" style={{ display: 'flex', gap: '3.75rem', fontFamily: 'var(--font-subtitle)', fontWeight: 700, letterSpacing: '1.2px', fontSize: '1.06rem' }}>
            <Link href="/" className="nav-link">INICIO</Link>
            <Link href="/shop" className="nav-link">TIENDA</Link>
            <Link href="/#about" className="nav-link" onClick={(e) => handleScrollToSection(e, 'about')}>SOBRE TOKAIDO</Link>
            <Link href="/#contact" className="nav-link" onClick={(e) => handleScrollToSection(e, 'contact')}>CONTACTO</Link>
          </nav>

          {/* Action Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: '#FFFFFF' }}>
            
            {/* Auth Buttons */}
            <div style={{ position: 'relative' }}>
              {status === 'authenticated' ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => setUserDropdownOpen(!userDropdownOpen)}>
                  {session.user?.image ? (
                    <img 
                      src={session.user.image} 
                      alt={session.user.name || 'User'} 
                      style={{ 
                        width: '30px', 
                        height: '30px', 
                        borderRadius: '50%', 
                        border: '2px solid var(--accent-gold)', 
                        objectFit: 'cover',
                        boxShadow: '0 0 8px rgba(212, 175, 55, 0.5)'
                      }}
                    />
                  ) : (
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                      {session.user?.name ? session.user.name[0] : 'U'}
                    </div>
                  )}
                  <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-subtitle)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px', color: '#FFFFFF' }} className="desktop-only">
                    {session.user?.name?.split(' ')[0]} <ChevronDown size={12} />
                  </span>
                </div>
              ) : (
                <button 
                  onClick={() => signIn('google')} 
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#FFFFFF' }}
                  title="Iniciar Sesión"
                >
                  <User size={20} />
                  <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-subtitle)', fontWeight: 700 }} className="desktop-only">INGRESAR</span>
                </button>
              )}

              {/* User Dropdown */}
              {userDropdownOpen && status === 'authenticated' && (
                <div style={{ 
                  position: 'absolute', 
                  right: 0, 
                  marginTop: '0.75rem', 
                  backgroundColor: '#0c0c0c', 
                  border: '2px solid var(--accent-gold)', 
                  padding: '0.5rem 0', 
                  minWidth: '180px', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.9), 0 0 10px rgba(212, 175, 55, 0.2)', 
                  zIndex: 110 
                }}>
                  <Link 
                    href="/profile" 
                    onClick={() => setUserDropdownOpen(false)}
                    style={{ display: 'block', padding: '0.6rem 1.2rem', fontSize: '0.85rem', fontFamily: 'var(--font-subtitle)', fontWeight: 700, color: '#FFFFFF' }}
                  >
                    MI PERFIL
                  </Link>

                  {/* Admin Panel Link */}
                  <Link 
                    href="/admin" 
                    onClick={() => setUserDropdownOpen(false)}
                    style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '0.6rem 1.2rem', 
                      fontSize: '0.85rem', 
                      color: 'var(--accent-gold)', 
                      fontFamily: 'var(--font-subtitle)', 
                      fontWeight: 700,
                      borderTop: '1px solid #222222',
                      textShadow: '0 0 4px rgba(212, 175, 55, 0.3)'
                    }}
                  >
                    <Shield size={13} />
                    ADMINISTRACIÓN
                  </Link>

                  <button 
                    onClick={() => { signOut(); setUserDropdownOpen(false); }} 
                    style={{ 
                      display: 'flex', 
                      width: '100%', 
                      alignItems: 'center', 
                      gap: '0.5rem', 
                      padding: '0.6rem 1.2rem', 
                      border: 'none', 
                      background: 'transparent', 
                      cursor: 'pointer', 
                      textAlign: 'left', 
                      fontSize: '0.85rem', 
                      fontFamily: 'var(--font-subtitle)', 
                      fontWeight: 700, 
                      borderTop: '1px solid #222222', 
                      color: 'var(--primary)' 
                    }}
                  >
                    <LogOut size={14} /> CERRAR SESIÓN
                  </button>
                </div>
              )}
            </div>

            {/* Shopping Cart Icon (Static Badge) - Hidden for future implementation */}
            {/* 
            <Link href="/shop" style={{ position: 'relative', display: 'flex', alignItems: 'center', color: '#FFFFFF' }}>
              <ShoppingBag size={20} />
              <span style={{ position: 'absolute', top: '-8px', right: '-8px', backgroundColor: 'var(--primary)', color: 'white', fontSize: '0.65rem', padding: '1px 5px', borderRadius: '50%', fontWeight: 'bold', boxShadow: '0 0 8px var(--primary)' }}>
                0
              </span>
            </Link>
            */}

            {/* Mobile Menu Icon */}
            <button 
              className="mobile-only" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'none', color: '#FFFFFF' }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div style={{ backgroundColor: '#0c0c0c', borderTop: '1px solid #222222', padding: '1rem 0', position: 'absolute', width: '100%', left: 0, boxShadow: '0 10px 20px rgba(0,0,0,0.8)' }}>
          <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontFamily: 'var(--font-subtitle)', fontWeight: 700 }}>
            <Link href="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>INICIO</Link>
            <Link href="/shop" className="nav-link" onClick={() => setMobileMenuOpen(false)}>TIENDA</Link>
            <Link 
              href="/#about" 
              className="nav-link" 
              onClick={(e) => { 
                setMobileMenuOpen(false); 
                handleScrollToSection(e, 'about'); 
              }}
            >
              SOBRE TOKAIDO
            </Link>
            <Link 
              href="/#contact" 
              className="nav-link" 
              onClick={(e) => { 
                setMobileMenuOpen(false); 
                handleScrollToSection(e, 'contact'); 
              }}
            >
              CONTACTO
            </Link>
          </div>
        </div>
      )}

      {/* Custom inline Styles for links */}
      <style jsx global>{`
        .nav-link {
          position: relative;
          color: #E2E2E2;
          transition: all var(--transition-fast);
        }
        .nav-link:hover {
          color: var(--accent-gold) !important;
          text-shadow: 0 0 8px rgba(212, 175, 55, 0.6);
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2.5px;
          bottom: -4px;
          left: 0;
          background-color: var(--accent-gold);
          box-shadow: 0 0 8px var(--accent-gold);
          transition: width var(--transition-fast);
        }
        .nav-link:hover::after {
          width: 100%;
        }

        .desktop-only {
          display: flex;
        }
        .mobile-only {
          display: none;
        }

        @media (max-width: 768px) {
          .desktop-only {
            display: none !important;
          }
          .mobile-only {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
