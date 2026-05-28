import React from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Link from 'next/link';
import { User as UserIcon } from 'lucide-react';
import AdminDashboard from './AdminDashboard';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ backgroundColor: 'white', border: '1px solid var(--border-color)', padding: '3rem', maxWidth: '480px', textAlign: 'center', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--light-gray)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--primary)' }}>
            <UserIcon size={30} />
          </div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontFamily: 'var(--font-title)' }}>Acceso Requerido</h2>
          <p style={{ color: 'var(--medium-gray)', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: '1.6', fontFamily: 'var(--font-body)' }}>
            Inicia sesión con tu cuenta de Google para acceder al Panel de Administración de Tokaido Costa Rica.
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
  
  try {
    await dbConnect();
    dbUser = await User.findOne({ email: session.user.email });
    
    // Fallback: If user is logged in via OAuth but not registered in MongoDB, create it
    if (!dbUser) {
      dbUser = await User.create({
        name: session.user.name || session.user.email.split('@')[0],
        email: session.user.email,
        image: session.user.image || '',
        role: 'user',
      });
    }
  } catch (err) {
    console.error('Error connecting to database inside Admin page route:', err);
  }

  const currentUser = {
    id: dbUser ? dbUser._id.toString() : '',
    name: dbUser ? dbUser.name : (session.user.name || ''),
    email: dbUser ? dbUser.email : (session.user.email || ''),
    image: dbUser ? dbUser.image : (session.user.image || undefined),
    role: dbUser ? dbUser.role : 'user',
  };

  return <AdminDashboard currentUser={currentUser} />;
}
