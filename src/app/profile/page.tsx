import React from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Link from 'next/link';
import { ShieldCheck, User as UserIcon, Calendar, Mail, ClipboardList, LogOut } from 'lucide-react';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ backgroundColor: 'white', border: '1px solid var(--border-color)', padding: '3rem', maxWidth: '480px', textAlign: 'center', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--light-gray)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--primary)' }}>
            <UserIcon size={30} />
          </div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Acceso Requerido</h2>
          <p style={{ color: 'var(--medium-gray)', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: '1.6' }}>
            Inicia sesión con tu cuenta de Google para acceder a tu perfil de Tokaido Costa Rica, guardar tus personalizaciones de cinturones y ver tu historial de pedidos.
          </p>
          <Link href="/api/auth/signin" className="btn btn-primary" style={{ width: '100%' }}>
            INICIAR SESIÓN CON GOOGLE
          </Link>
          <Link href="/" style={{ display: 'inline-block', marginTop: '1.25rem', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--medium-gray)' }}>
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  let dbUser = null;
  let errorMsg = null;

  try {
    await dbConnect();
    dbUser = await User.findOne({ email: session.user.email });
  } catch (err: any) {
    console.error('Error loading profile from DB:', err);
    errorMsg = 'No se pudo conectar a la base de datos de Tokaido, mostrando datos de sesión temporal.';
  }

  // Display user values, fallback to session values if DB load failed
  const profileName = dbUser?.name || session.user.name || 'Karateka';
  const profileEmail = dbUser?.email || session.user.email || '';
  const profileImage = dbUser?.image || session.user.image || '';
  const profileRole = dbUser?.role || (session.user as any)?.role || 'user';
  const profileJoined = dbUser?.createdAt 
    ? new Date(dbUser.createdAt).toLocaleDateString('es-CR', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Hoy';

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      {/* Header */}
      <div style={{ borderBottom: '2px solid var(--foreground)', paddingBottom: '1.5rem', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-title)' }}>Mi Perfil Tokaido</h1>
        <p style={{ color: 'var(--medium-gray)', fontSize: '0.95rem' }}>
          Gestiona tus datos personales y consulta el estado de tus personalizaciones de obis y uniformes.
        </p>
      </div>

      {errorMsg && (
        <div style={{ backgroundColor: '#FFF3CD', border: '1px solid #FFEBAA', color: '#856404', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.85rem', fontWeight: 'bold' }}>
          ⚠️ {errorMsg}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
        {/* User Card */}
        <div className="card" style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2.5rem 2rem', height: 'fit-content' }}>
          {profileImage ? (
            <img 
              src={profileImage} 
              alt={profileName} 
              style={{ width: '90px', height: '90px', borderRadius: '50%', border: '3px solid var(--primary)', marginBottom: '1.5rem', boxShadow: 'var(--shadow-md)' }} 
            />
          ) : (
            <div style={{ width: '90px', height: '90px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontFamily: 'var(--font-title)', marginBottom: '1.5rem' }}>
              {profileName ? profileName[0] : 'U'}
            </div>
          )}

          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>{profileName}</h2>
          <span style={{ 
            backgroundColor: profileRole === 'admin' ? 'var(--primary)' : 'var(--accent-gold)', 
            color: 'white', 
            fontSize: '0.65rem', 
            padding: '4px 10px', 
            fontWeight: 700, 
            fontFamily: 'var(--font-subtitle)', 
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '2rem'
          }}>
            {profileRole === 'admin' ? 'ADMINISTRADOR' : 'CLIENTE PREMIUM'}
          </span>

          <div style={{ width: '100%', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--dark-gray)' }}>
              <Mail size={16} /> <span>{profileEmail}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--dark-gray)' }}>
              <Calendar size={16} /> <span>Miembro desde: {profileJoined}</span>
            </div>
          </div>

          <Link href="/api/auth/signout" className="btn btn-secondary" style={{ width: '100%', marginTop: '2.5rem', fontSize: '0.8rem', padding: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
            <LogOut size={14} /> CERRAR SESIÓN
          </Link>
        </div>

        {/* User Activity / Orders Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', flex: 1.5 }}>

          {/* Section: Orders */}
          <div style={{ border: '1px solid var(--border-color)', padding: '2rem', backgroundColor: 'white' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ClipboardList size={20} color="var(--primary)" /> Mis Pedidos
            </h3>

            {/* Mock Order Table */}
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem', border: '1px dashed var(--border-color)' }}>
              <p style={{ color: 'var(--medium-gray)', fontSize: '0.9rem' }}>
                No tienes pedidos realizados. ¡Los uniformes de tu dojo te están esperando!
              </p>
              <Link href="/shop" style={{ display: 'inline-block', marginTop: '1rem', color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.85rem' }}>
                Ir a la Tienda a comprar &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
