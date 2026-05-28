'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, UserCheck, Shield, Users, Mail, Calendar, ArrowRight, 
  Trash2, Plus, X, ShieldAlert, Eye, Settings, ShoppingBag, Tag, 
  Image as ImageIcon, FileText, Edit, Check
} from 'lucide-react';

interface UserType {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: 'viewer' | 'editor' | 'admin';
  createdAt: string;
  updatedAt: string;
}

interface ProductType {
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

interface AdminDashboardProps {
  currentUser: {
    id: string;
    name: string;
    email: string;
    image?: string;
    role: string;
  };
}

export default function AdminDashboard({ currentUser }: AdminDashboardProps) {
  // Tabs State: 'users' | 'shop'
  const [activeTab, setActiveTab] = useState<'users' | 'shop'>('users');

  // General States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Normalize 'user' role to 'viewer' for backward compatibility
  const initialRole = currentUser.role === 'user' ? 'viewer' : currentUser.role;
  const [myRole, setMyRole] = useState(initialRole);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  // --- Users Section States ---
  const [users, setUsers] = useState<UserType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'editor' | 'viewer'>('all');
  
  // Form states for pre-registering a user
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'viewer' | 'editor' | 'admin'>('viewer');
  const [submittingUser, setSubmittingUser] = useState(false);

  // --- Shop Section States ---
  const [products, setProducts] = useState<ProductType[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productSearchQuery, setProductSearchQuery] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState<'all' | 'uniforms' | 'belts' | 'protectors'>('all');
  
  // Form states for adding a product
  const [showProductForm, setShowProductForm] = useState(false);
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState<'uniforms' | 'belts' | 'protectors'>('uniforms');
  const [prodPrice, setProdPrice] = useState<number | ''>('');
  const [prodDescription, setProdDescription] = useState('');
  const [prodImage, setProdImage] = useState('');
  const [prodBadge, setProdBadge] = useState('');
  const [prodBadgeColor, setProdBadgeColor] = useState('var(--primary)');
  const [submittingProduct, setSubmittingProduct] = useState(false);

  // Edit product modal states
  const [editingProduct, setEditingProduct] = useState<ProductType | null>(null);
  const [editProdName, setEditProdName] = useState('');
  const [editProdCategory, setEditProdCategory] = useState<'uniforms' | 'belts' | 'protectors'>('uniforms');
  const [editProdPrice, setEditProdPrice] = useState<number>(0);
  const [editProdDescription, setEditProdDescription] = useState('');
  const [editProdImage, setEditProdImage] = useState('');
  const [editProdBadge, setEditProdBadge] = useState('');
  const [editProdBadgeColor, setEditProdBadgeColor] = useState('var(--primary)');
  const [updatingProduct, setUpdatingProduct] = useState(false);

  // --- Fetch Operations ---
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users');
      if (!res.ok) {
        throw new Error('No se pudieron cargar los usuarios. Verifica tus permisos.');
      }
      const data = await res.json();
      setUsers(data.users || []);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error al obtener usuarios.');
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    setProductsLoading(true);
    try {
      const res = await fetch('/api/products');
      if (!res.ok) {
        throw new Error('No se pudo cargar el catálogo de productos.');
      }
      const data = await res.json();
      setProducts(data.products || []);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error al obtener productos.');
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
    } else {
      fetchProducts();
    }
  }, [activeTab, myRole]);

  // --- User Operations ---
  const handleRoleChange = async (userId: string, newRole: 'viewer' | 'editor' | 'admin') => {
    setUpdatingUserId(userId);
    setSuccessMessage(null);
    setError(null);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, role: newRole }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al actualizar el rol.');
      }

      const data = await res.json();
      const updatedUser = data.user;

      setUsers(users.map((u) => (u._id === userId ? { ...u, role: updatedUser.role } : u)));
      
      if (userId === currentUser.id) {
        setMyRole(updatedUser.role);
      }

      setSuccessMessage(`Rol de ${updatedUser.name} actualizado a ${updatedUser.role.toUpperCase()}`);
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      setError(err.message || 'Error al actualizar el rol.');
    } finally {
      setUpdatingUserId(null);
    }
  };

  const devChangeMyRole = async (targetRole: 'viewer' | 'editor' | 'admin') => {
    setUpdatingUserId(currentUser.id);
    setError(null);
    setSuccessMessage(null);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: currentUser.id, role: targetRole }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al cambiar rol demo.');
      }

      setMyRole(targetRole);
      setSuccessMessage(`Rol de prueba cambiado a: ${targetRole.toUpperCase()}`);
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      setError(err.message || 'Error al cambiar tu rol de prueba.');
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!window.confirm(`¿Estás seguro de que deseas eliminar a "${userName}" del sistema?\nEsto revocará de inmediato su acceso.`)) {
      return;
    }

    setUpdatingUserId(userId);
    setSuccessMessage(null);
    setError(null);
    try {
      const res = await fetch(`/api/admin/users?userId=${userId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al eliminar el usuario.');
      }

      setUsers(users.filter((u) => u._id !== userId));
      setSuccessMessage(`Acceso revocado y usuario "${userName}" eliminado con éxito.`);
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      setError(err.message || 'Error al eliminar el usuario.');
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handlePreRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) {
      setError('Por favor completa todos los campos del formulario.');
      return;
    }

    setSubmittingUser(true);
    setSuccessMessage(null);
    setError(null);

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newUserName,
          email: newUserEmail,
          role: newUserRole,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al pre-registrar al usuario.');
      }

      const data = await res.json();
      const createdUser = data.user;

      setUsers([createdUser, ...users]);
      setSuccessMessage(`Usuario ${createdUser.name} pre-registrado con éxito.`);
      
      setNewUserName('');
      setNewUserEmail('');
      setNewUserRole('viewer');
      setShowAddForm(false);
      
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      setError(err.message || 'Error al guardar el pre-registro.');
    } finally {
      setSubmittingUser(false);
    }
  };

  // --- Shop Operations ---
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName || !prodCategory || prodPrice === '' || !prodDescription || !prodImage) {
      setError('Por favor completa todos los campos requeridos del producto.');
      return;
    }

    setSubmittingProduct(true);
    setSuccessMessage(null);
    setError(null);

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: prodName,
          category: prodCategory,
          price: Number(prodPrice),
          description: prodDescription,
          image: prodImage,
          badge: prodBadge,
          badgeColor: prodBadgeColor,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al crear el producto.');
      }

      const data = await res.json();
      const createdProduct = data.product;

      setProducts([createdProduct, ...products]);
      setSuccessMessage(`Producto "${createdProduct.name}" agregado con éxito.`);
      
      // Reset form
      setProdName('');
      setProdCategory('uniforms');
      setProdPrice('');
      setProdDescription('');
      setProdImage('');
      setProdBadge('');
      setProdBadgeColor('var(--primary)');
      setShowProductForm(false);
      
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      setError(err.message || 'Error al crear el producto.');
    } finally {
      setSubmittingProduct(false);
    }
  };

  const startEditProduct = (product: ProductType) => {
    setEditingProduct(product);
    setEditProdName(product.name);
    setEditProdCategory(product.category);
    setEditProdPrice(product.price);
    setEditProdDescription(product.description);
    setEditProdImage(product.image);
    setEditProdBadge(product.badge || '');
    setEditProdBadgeColor(product.badgeColor || 'var(--primary)');
  };

  const handleEditProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setUpdatingProduct(true);
    setSuccessMessage(null);
    setError(null);

    try {
      const res = await fetch('/api/admin/products', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: editingProduct._id,
          name: editProdName,
          category: editProdCategory,
          price: editProdPrice,
          description: editProdDescription,
          image: editProdImage,
          badge: editProdBadge,
          badgeColor: editProdBadgeColor,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al actualizar el producto.');
      }

      const data = await res.json();
      const updatedProduct = data.product;

      setProducts(products.map((p) => (p._id === updatedProduct._id ? updatedProduct : p)));
      setSuccessMessage(`Producto "${updatedProduct.name}" actualizado con éxito.`);
      setEditingProduct(null);
      
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      setError(err.message || 'Error al actualizar el producto.');
    } finally {
      setUpdatingProduct(false);
    }
  };

  const handleDeleteProduct = async (productId: string, productName: string) => {
    if (!window.confirm(`¿Estás seguro de que deseas eliminar el producto "${productName}" del catálogo?\nEsta acción es permanente.`)) {
      return;
    }

    setProductsLoading(true);
    setSuccessMessage(null);
    setError(null);

    try {
      const res = await fetch(`/api/admin/products?productId=${productId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al eliminar el producto.');
      }

      setProducts(products.filter((p) => p._id !== productId));
      setSuccessMessage(`Producto "${productName}" eliminado con éxito.`);
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      setError(err.message || 'Error al eliminar el producto.');
    } finally {
      setProductsLoading(false);
    }
  };

  // --- Filtering Logic ---
  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const filteredProducts = products.filter((prod) => {
    const matchesSearch = 
      prod.name.toLowerCase().includes(productSearchQuery.toLowerCase()) || 
      prod.description.toLowerCase().includes(productSearchQuery.toLowerCase());
    
    const matchesCategory = productCategoryFilter === 'all' || prod.category === productCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  // --- Stats Counts ---
  const totalUsersCount = users.length;
  const adminUsersCount = users.filter(u => u.role === 'admin').length;
  const editorUsersCount = users.filter(u => u.role === 'editor').length;
  const viewerUsersCount = users.filter(u => u.role === 'viewer').length;

  const totalProductsCount = products.length;
  const uniformsCount = products.filter(p => p.category === 'uniforms').length;
  const beltsCount = products.filter(p => p.category === 'belts').length;
  const protectorsCount = products.filter(p => p.category === 'protectors').length;

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      
      {/* Dev Switcher Panel (Top) */}
      <div style={{ 
        backgroundColor: 'rgba(212, 175, 55, 0.08)', 
        border: '1px dashed var(--accent-gold)', 
        padding: '1.25rem', 
        marginBottom: '2rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: '1rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Settings size={18} color="var(--accent-gold)" />
          <span style={{ fontSize: '0.85rem', color: 'var(--foreground)', fontWeight: 'bold', fontFamily: 'var(--font-subtitle)', letterSpacing: '0.5px' }}>
            CONSOLA DE PRUEBAS: Alterna tu nivel de acceso simulado
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => devChangeMyRole('viewer')} 
            className="btn btn-secondary" 
            disabled={updatingUserId === currentUser.id}
            style={{ 
              padding: '0.4rem 0.8rem', 
              fontSize: '0.7rem', 
              backgroundColor: myRole === 'viewer' ? 'var(--foreground)' : 'transparent', 
              color: myRole === 'viewer' ? 'white' : 'var(--foreground)',
              borderColor: 'var(--foreground)'
            }}
          >
            Ver como VISOR
          </button>
          <button 
            onClick={() => devChangeMyRole('editor')} 
            className="btn btn-secondary" 
            disabled={updatingUserId === currentUser.id}
            style={{ 
              padding: '0.4rem 0.8rem', 
              fontSize: '0.7rem', 
              backgroundColor: myRole === 'editor' ? 'var(--foreground)' : 'transparent', 
              color: myRole === 'editor' ? 'white' : 'var(--foreground)',
              borderColor: 'var(--foreground)'
            }}
          >
            Ver como EDITOR
          </button>
          <button 
            onClick={() => devChangeMyRole('admin')} 
            className="btn btn-secondary" 
            disabled={updatingUserId === currentUser.id}
            style={{ 
              padding: '0.4rem 0.8rem', 
              fontSize: '0.7rem', 
              backgroundColor: myRole === 'admin' ? 'var(--foreground)' : 'transparent', 
              color: myRole === 'admin' ? 'white' : 'var(--foreground)',
              borderColor: 'var(--foreground)'
            }}
          >
            Ver como ADMINISTRADOR
          </button>
        </div>
      </div>

      {/* Tab Switcher */}
      <div style={{ 
        display: 'flex', 
        borderBottom: '2px solid var(--border-color)', 
        marginBottom: '2.5rem', 
        gap: '4px',
        backgroundColor: 'var(--light-gray)',
        padding: '4px 4px 0 4px'
      }}>
        <button
          onClick={() => setActiveTab('users')}
          style={{
            padding: '1rem 2rem',
            background: activeTab === 'users' ? 'white' : 'transparent',
            color: 'var(--foreground)',
            border: 'none',
            borderBottom: activeTab === 'users' ? '3px solid var(--accent-gold)' : '3px solid transparent',
            fontWeight: 700,
            fontSize: '0.9rem',
            fontFamily: 'var(--font-subtitle)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
          }}
        >
          <Users size={18} color={activeTab === 'users' ? 'var(--primary)' : 'var(--medium-gray)'} />
          CONTRASENAS Y ACCESOS
        </button>
        <button
          onClick={() => setActiveTab('shop')}
          style={{
            padding: '1rem 2rem',
            background: activeTab === 'shop' ? 'white' : 'transparent',
            color: 'var(--foreground)',
            border: 'none',
            borderBottom: activeTab === 'shop' ? '3px solid var(--accent-gold)' : '3px solid transparent',
            fontWeight: 700,
            fontSize: '0.9rem',
            fontFamily: 'var(--font-subtitle)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
          }}
        >
          <ShoppingBag size={18} color={activeTab === 'shop' ? 'var(--primary)' : 'var(--medium-gray)'} />
          CATÁLOGO DE TIENDA
        </button>
      </div>

      {/* Dynamic Alerts */}
      {successMessage && (
        <div style={{ backgroundColor: '#D4EDDA', border: '1px solid #C3E6CB', color: '#155724', padding: '1rem', marginBottom: '2rem', fontSize: '0.9rem', fontWeight: 'bold', borderLeft: '5px solid #28A745' }}>
          ✓ {successMessage}
        </div>
      )}

      {error && (
        <div style={{ backgroundColor: '#FFF3CD', border: '1px solid #FFEBAA', color: '#856404', padding: '1rem', marginBottom: '2rem', fontSize: '0.9rem', fontWeight: 'bold', borderLeft: '5px solid var(--accent-gold)' }}>
          ⚠️ {error}
        </div>
      )}

      {/* ==================== TAB: USERS ==================== */}
      {activeTab === 'users' && (
        <>
          {/* Header */}
          <div style={{ borderBottom: '2px solid var(--foreground)', paddingBottom: '1.5rem', marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '2.25rem', fontFamily: 'var(--font-title)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Shield size={32} color="var(--primary)" /> Control de Accesos (Allowlist)
              </h1>
              <p style={{ color: 'var(--medium-gray)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
                Solo los correos pre-registrados en esta lista podrán iniciar sesión en la plataforma.
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ 
                fontSize: '0.7rem', 
                fontFamily: 'var(--font-subtitle)', 
                fontWeight: 700, 
                letterSpacing: '1px',
                padding: '6px 12px',
                color: 'white',
                backgroundColor: myRole === 'admin' ? 'var(--primary)' : myRole === 'editor' ? 'var(--accent-gold)' : 'var(--medium-gray)',
                border: 'none',
                marginRight: '8px'
              }}>
                ROL SIMULADO: {myRole.toUpperCase()}
              </span>

              {myRole !== 'viewer' && (
                <button 
                  onClick={() => setShowAddForm(!showAddForm)} 
                  className="btn btn-gold" 
                  style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  {showAddForm ? <X size={16} /> : <Plus size={16} />}
                  {showAddForm ? 'Cerrar' : 'Pre-registrar Usuario'}
                </button>
              )}

              <button onClick={fetchUsers} className="btn btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem' }} disabled={loading}>
                {loading ? 'Sincronizando...' : 'Sincronizar DB'}
              </button>
            </div>
          </div>

          {/* Form */}
          {showAddForm && myRole !== 'viewer' && (
            <div style={{ backgroundColor: 'white', border: '2px solid var(--accent-gold)', padding: '2rem', marginBottom: '2.5rem', boxShadow: 'var(--shadow-md)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--foreground)' }}>
                <Plus size={20} color="var(--accent-gold)" /> Pre-registrar Usuario Autorizado
              </h3>
              <form onSubmit={handlePreRegister} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', alignItems: 'end' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-subtitle)', fontWeight: 700, marginBottom: '6px', color: 'var(--dark-gray)' }}>
                    NOMBRE COMPLETO
                  </label>
                  <input 
                    type="text" 
                    placeholder="Ej. Gichin Funakoshi" 
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.85rem' }}
                    required
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-subtitle)', fontWeight: 700, marginBottom: '6px', color: 'var(--dark-gray)' }}>
                    CORREO ELECTRÓNICO (GOOGLE)
                  </label>
                  <input 
                    type="email" 
                    placeholder="ejemplo@gmail.com" 
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.85rem' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-subtitle)', fontWeight: 700, marginBottom: '6px', color: 'var(--dark-gray)' }}>
                    NIVEL DE PERMISOS
                  </label>
                  <select 
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value as any)}
                    style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.85rem', height: '37px', backgroundColor: 'white', fontWeight: 'bold' }}
                  >
                    <option value="viewer">VISOR (Lectura de datos)</option>
                    <option value="editor">EDITOR (Edición de tienda/catálogo)</option>
                    {myRole === 'admin' && (
                      <option value="admin">ADMINISTRADOR (Acceso total)</option>
                    )}
                  </select>
                </div>

                <div>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ width: '100%', height: '37px', fontSize: '0.8rem' }}
                    disabled={submittingUser}
                  >
                    {submittingUser ? 'GUARDANDO...' : 'REGISTRAR ACCESO'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
            <div style={{ backgroundColor: 'white', border: '1px solid var(--border-color)', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--light-gray)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--foreground)' }}>
                <Users size={20} />
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--medium-gray)', fontFamily: 'var(--font-subtitle)', fontWeight: 700, letterSpacing: '0.5px' }}>TOTAL PERMITIDOS</span>
                <h3 style={{ fontSize: '1.5rem', marginTop: '2px' }}>{loading ? '...' : totalUsersCount}</h3>
              </div>
            </div>

            <div style={{ backgroundColor: 'white', border: '1px solid var(--border-color)', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(200, 16, 46, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                <Shield size={20} />
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontFamily: 'var(--font-subtitle)', fontWeight: 700, letterSpacing: '0.5px' }}>ADMINISTRADORES</span>
                <h3 style={{ fontSize: '1.5rem', marginTop: '2px', color: 'var(--primary)' }}>{loading ? '...' : adminUsersCount}</h3>
              </div>
            </div>

            <div style={{ backgroundColor: 'white', border: '1px solid var(--border-color)', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(212, 175, 55, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)' }}>
                <UserCheck size={20} />
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', fontFamily: 'var(--font-subtitle)', fontWeight: 700, letterSpacing: '0.5px' }}>EDITORES</span>
                <h3 style={{ fontSize: '1.5rem', marginTop: '2px', color: 'var(--accent-gold)' }}>{loading ? '...' : editorUsersCount}</h3>
              </div>
            </div>

            <div style={{ backgroundColor: 'white', border: '1px solid var(--border-color)', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(136, 136, 136, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--medium-gray)' }}>
                <Users size={20} />
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--medium-gray)', fontFamily: 'var(--font-subtitle)', fontWeight: 700, letterSpacing: '0.5px' }}>VISORES</span>
                <h3 style={{ fontSize: '1.5rem', marginTop: '2px', color: 'var(--dark-gray)' }}>{loading ? '...' : viewerUsersCount}</h3>
              </div>
            </div>
          </div>

          {/* User Table Card */}
          <div style={{ backgroundColor: 'white', border: '1px solid var(--border-color)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
            
            {/* Filters */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', padding: '0.6rem 1rem', width: '100%', maxWidth: '380px', backgroundColor: 'var(--background)' }}>
                <input 
                  type="text" 
                  placeholder="Buscar usuarios por nombre o email..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.85rem', width: '100%', color: 'var(--foreground)' }}
                />
                <Search size={18} color="var(--medium-gray)" />
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => setRoleFilter('all')}
                  style={{ 
                    border: '1px solid var(--border-color)', 
                    background: roleFilter === 'all' ? 'var(--foreground)' : 'white', 
                    color: roleFilter === 'all' ? 'white' : 'var(--foreground)',
                    padding: '0.5rem 1.2rem', 
                    fontSize: '0.75rem', 
                    fontFamily: 'var(--font-subtitle)',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  TODOS
                </button>
                <button 
                  onClick={() => setRoleFilter('admin')}
                  style={{ 
                    border: '1px solid var(--border-color)', 
                    background: roleFilter === 'admin' ? 'var(--primary)' : 'white', 
                    color: roleFilter === 'admin' ? 'white' : 'var(--foreground)',
                    padding: '0.5rem 1.2rem', 
                    fontSize: '0.75rem', 
                    fontFamily: 'var(--font-subtitle)',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  ADMINISTRADORES
                </button>
                <button 
                  onClick={() => setRoleFilter('editor')}
                  style={{ 
                    border: '1px solid var(--border-color)', 
                    background: roleFilter === 'editor' ? 'var(--accent-gold)' : 'white', 
                    color: roleFilter === 'editor' ? 'white' : 'var(--foreground)',
                    padding: '0.5rem 1.2rem', 
                    fontSize: '0.75rem', 
                    fontFamily: 'var(--font-subtitle)',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  EDITORES
                </button>
                <button 
                  onClick={() => setRoleFilter('viewer')}
                  style={{ 
                    border: '1px solid var(--border-color)', 
                    background: roleFilter === 'viewer' ? 'var(--medium-gray)' : 'white', 
                    color: roleFilter === 'viewer' ? 'white' : 'var(--foreground)',
                    padding: '0.5rem 1.2rem', 
                    fontSize: '0.75rem', 
                    fontFamily: 'var(--font-subtitle)',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  VISORES
                </button>
              </div>
            </div>

            {/* Table */}
            {loading ? (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--medium-gray)' }}>
                <div style={{ display: 'inline-block', width: '30px', height: '30px', border: '3px solid var(--border-color)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '1rem' }}></div>
                <p style={{ fontFamily: 'var(--font-subtitle)', fontWeight: 700 }}>CARGANDO REGISTRO DE ACCESOS...</p>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 1rem', border: '1px dashed var(--border-color)' }}>
                <p style={{ color: 'var(--medium-gray)', fontSize: '0.95rem' }}>
                  No se encontraron usuarios en esta lista.
                </p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '650px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--foreground)', paddingBottom: '0.5rem' }}>
                      <th style={{ padding: '0.75rem 0.5rem', fontSize: '0.8rem', fontFamily: 'var(--font-subtitle)', fontWeight: 700, color: 'var(--medium-gray)' }}>USUARIO</th>
                      <th style={{ padding: '0.75rem 0.5rem', fontSize: '0.8rem', fontFamily: 'var(--font-subtitle)', fontWeight: 700, color: 'var(--medium-gray)' }}>EMAIL</th>
                      <th style={{ padding: '0.75rem 0.5rem', fontSize: '0.8rem', fontFamily: 'var(--font-subtitle)', fontWeight: 700, color: 'var(--medium-gray)' }}>ESTADO DEL REGISTRO</th>
                      <th style={{ padding: '0.75rem 0.5rem', fontSize: '0.8rem', fontFamily: 'var(--font-subtitle)', fontWeight: 700, color: 'var(--medium-gray)' }}>ROL ASIGNADO</th>
                      <th style={{ padding: '0.75rem 0.5rem', fontSize: '0.8rem', fontFamily: 'var(--font-subtitle)', fontWeight: 700, color: 'var(--medium-gray)', textAlign: 'right' }}>ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user._id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }} className="user-row">
                        <td style={{ padding: '1rem 0.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {user.image ? (
                            <img 
                              src={user.image} 
                              alt={user.name} 
                              style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-color)' }}
                            />
                          ) : (
                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--light-gray)', color: 'var(--dark-gray)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 'bold' }}>
                              {user.name ? user.name[0] : 'U'}
                            </div>
                          )}
                          <div>
                            <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--foreground)' }}>
                              {user.name} 
                              {user._id === currentUser.id && (
                                <span style={{ fontSize: '0.7rem', color: 'var(--medium-gray)', fontWeight: 'normal', marginLeft: '6px' }}>
                                  (Tú)
                                </span>
                              )}
                            </strong>
                          </div>
                        </td>

                        <td style={{ padding: '1rem 0.5rem', fontSize: '0.85rem' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--dark-gray)' }}>
                            <Mail size={14} /> {user.email}
                          </span>
                        </td>

                        <td style={{ padding: '1rem 0.5rem', fontSize: '0.85rem' }}>
                          {user.image ? (
                            <span style={{ color: '#28A745', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              ● Vinculado (Google)
                            </span>
                          ) : (
                            <span style={{ color: 'var(--medium-gray)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              ○ Pendiente (Pre-registro)
                            </span>
                          )}
                        </td>

                        <td style={{ padding: '1rem 0.5rem' }}>
                          {user.role === 'admin' ? (
                            <span style={{ 
                              backgroundColor: 'rgba(200, 16, 46, 0.1)', 
                              color: 'var(--primary)', 
                              fontSize: '0.7rem', 
                              padding: '4px 10px', 
                              fontWeight: 700, 
                              fontFamily: 'var(--font-subtitle)', 
                              letterSpacing: '0.5px',
                              textTransform: 'uppercase',
                              border: '1px solid var(--primary)',
                              display: 'inline-block'
                            }}>
                              ADMINISTRADOR
                            </span>
                          ) : user.role === 'editor' ? (
                            <span style={{ 
                              backgroundColor: 'rgba(212, 175, 55, 0.1)', 
                              color: 'var(--accent-gold)', 
                              fontSize: '0.7rem', 
                              padding: '4px 10px', 
                              fontWeight: 700, 
                              fontFamily: 'var(--font-subtitle)', 
                              letterSpacing: '0.5px',
                              textTransform: 'uppercase',
                              border: '1px solid var(--accent-gold)',
                              display: 'inline-block'
                            }}>
                              EDITOR
                            </span>
                          ) : (
                            <span style={{ 
                              backgroundColor: 'rgba(136, 136, 136, 0.1)', 
                              color: 'var(--medium-gray)', 
                              fontSize: '0.7rem', 
                              padding: '4px 10px', 
                              fontWeight: 700, 
                              fontFamily: 'var(--font-subtitle)', 
                              letterSpacing: '0.5px',
                              textTransform: 'uppercase',
                              border: '1px solid var(--medium-gray)',
                              display: 'inline-block'
                            }}>
                              VISOR
                            </span>
                          )}
                        </td>

                        <td style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            <select
                              value={user.role}
                              onChange={(e) => handleRoleChange(user._id, e.target.value as any)}
                              disabled={
                                updatingUserId === user._id ||
                                myRole === 'viewer' ||
                                (myRole === 'editor' && (user.role === 'admin' || user._id === currentUser.id))
                              }
                              style={{
                                padding: '0.4rem 0.8rem',
                                fontSize: '0.75rem',
                                fontFamily: 'var(--font-subtitle)',
                                fontWeight: 700,
                                border: '1px solid var(--border-color)',
                                backgroundColor: 'white',
                                cursor: 'pointer',
                                outline: 'none',
                              }}
                            >
                              <option value="viewer">VISOR</option>
                              <option value="editor">EDITOR</option>
                              {(myRole === 'admin' || user.role === 'admin') && (
                                <option value="admin">ADMINISTRADOR</option>
                              )}
                            </select>

                            {myRole === 'admin' && (
                              <button
                                onClick={() => handleDeleteUser(user._id, user.name)}
                                disabled={updatingUserId === user._id || user._id === currentUser.id}
                                className="btn btn-secondary"
                                style={{ 
                                  padding: '0.4rem 0.8rem', 
                                  fontSize: '0.75rem', 
                                  color: user._id === currentUser.id ? 'var(--medium-gray)' : 'var(--primary)',
                                  borderColor: user._id === currentUser.id ? 'var(--border-color)' : 'var(--primary)',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  minWidth: '90px',
                                  justifyContent: 'center',
                                  cursor: user._id === currentUser.id ? 'not-allowed' : 'pointer'
                                }}
                              >
                                <Trash2 size={12} /> Eliminar
                              </button>
                            )}

                            {myRole === 'editor' && (
                              <div style={{ width: '90px', display: 'inline-flex', justifyContent: 'center', fontSize: '0.75rem', color: 'var(--medium-gray)' }} title="Solo los Administradores pueden revocar accesos">
                                🔒 Protegido
                              </div>
                            )}
                            
                            {myRole === 'viewer' && (
                              <div style={{ width: '90px', display: 'inline-flex', justifyContent: 'center', fontSize: '0.75rem', color: 'var(--medium-gray)' }} title="Solo lectura">
                                <Eye size={12} /> Solo lectura
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* ==================== TAB: SHOP ==================== */}
      {activeTab === 'shop' && (
        <>
          {/* Header */}
          <div style={{ borderBottom: '2px solid var(--foreground)', paddingBottom: '1.5rem', marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '2.25rem', fontFamily: 'var(--font-title)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <ShoppingBag size={32} color="var(--primary)" /> Administración de Catálogo (Tienda)
              </h1>
              <p style={{ color: 'var(--medium-gray)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
                Agrega, edita y elimina productos del catálogo que los clientes ven en la sección Tienda.
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ 
                fontSize: '0.7rem', 
                fontFamily: 'var(--font-subtitle)', 
                fontWeight: 700, 
                letterSpacing: '1px',
                padding: '6px 12px',
                color: 'white',
                backgroundColor: myRole === 'admin' ? 'var(--primary)' : myRole === 'editor' ? 'var(--accent-gold)' : 'var(--medium-gray)',
                border: 'none',
                marginRight: '8px'
              }}>
                ROL SIMULADO: {myRole.toUpperCase()}
              </span>

              {myRole !== 'viewer' && (
                <button 
                  onClick={() => setShowProductForm(!showProductForm)} 
                  className="btn btn-gold" 
                  style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  {showProductForm ? <X size={16} /> : <Plus size={16} />}
                  {showProductForm ? 'Cerrar Formulario' : 'Agregar Producto'}
                </button>
              )}

              <button onClick={fetchProducts} className="btn btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem' }} disabled={productsLoading}>
                {productsLoading ? 'Sincronizando...' : 'Sincronizar DB'}
              </button>
            </div>
          </div>

          {/* Add Product Form (Collapsible - Only shown for Admin and Editor) */}
          {showProductForm && myRole !== 'viewer' && (
            <div style={{ backgroundColor: 'white', border: '2px solid var(--accent-gold)', padding: '2rem', marginBottom: '2.5rem', boxShadow: 'var(--shadow-md)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--foreground)' }}>
                <Plus size={20} color="var(--accent-gold)" /> Registrar Nuevo Producto en la Tienda
              </h3>
              <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-subtitle)', fontWeight: 700, marginBottom: '6px', color: 'var(--dark-gray)' }}>
                      NOMBRE DEL PRODUCTO
                    </label>
                    <input 
                      type="text" 
                      placeholder="Ej. Tokaido Shiai Gi (10oz)" 
                      value={prodName}
                      onChange={(e) => setProdName(e.target.value)}
                      style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.85rem' }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-subtitle)', fontWeight: 700, marginBottom: '6px', color: 'var(--dark-gray)' }}>
                      CATEGORÍA
                    </label>
                    <select 
                      value={prodCategory}
                      onChange={(e) => setProdCategory(e.target.value as any)}
                      style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.85rem', height: '37px', backgroundColor: 'white', fontWeight: 'bold' }}
                    >
                      <option value="uniforms">Uniformes (Dogis)</option>
                      <option value="belts">Cinturones (Obis)</option>
                      <option value="protectors">Protecciones</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-subtitle)', fontWeight: 700, marginBottom: '6px', color: 'var(--dark-gray)' }}>
                      PRECIO (₡ COLONES)
                    </label>
                    <input 
                      type="number" 
                      placeholder="Ej. 130000" 
                      value={prodPrice}
                      onChange={(e) => setProdPrice(e.target.value === '' ? '' : Number(e.target.value))}
                      style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.85rem' }}
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-subtitle)', fontWeight: 700, marginBottom: '6px', color: 'var(--dark-gray)' }}>
                      URL DE LA IMAGEN
                    </label>
                    <input 
                      type="text" 
                      placeholder="Ej. /tokaido_gi_showcase.png o link https://" 
                      value={prodImage}
                      onChange={(e) => setProdImage(e.target.value)}
                      style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.85rem' }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-subtitle)', fontWeight: 700, marginBottom: '6px', color: 'var(--dark-gray)' }}>
                      ETIQUETA (OPCIONAL)
                    </label>
                    <input 
                      type="text" 
                      placeholder="Ej. WKF APPROVED, JAPAN MADE" 
                      value={prodBadge}
                      onChange={(e) => setProdBadge(e.target.value)}
                      style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.85rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-subtitle)', fontWeight: 700, marginBottom: '6px', color: 'var(--dark-gray)' }}>
                      COLOR DE ETIQUETA
                    </label>
                    <select 
                      value={prodBadgeColor}
                      onChange={(e) => setProdBadgeColor(e.target.value)}
                      style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.85rem', height: '37px', backgroundColor: 'white', fontWeight: 'bold' }}
                    >
                      <option value="var(--primary)">Rojo Tokaido (Primario)</option>
                      <option value="var(--accent-gold)">Dorado Bordado (Acento)</option>
                      <option value="var(--foreground)">Negro Premium (Fondo)</option>
                      <option value="var(--medium-gray)">Gris Metálico (Muted)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-subtitle)', fontWeight: 700, marginBottom: '6px', color: 'var(--dark-gray)' }}>
                    DESCRIPCIÓN DEL PRODUCTO
                  </label>
                  <textarea 
                    placeholder="Escribe una breve reseña del producto, composición, material y uso ideal..." 
                    value={prodDescription}
                    onChange={(e) => setProdDescription(e.target.value)}
                    rows={3}
                    style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.85rem', resize: 'vertical' }}
                    required
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ padding: '0.6rem 2rem', fontSize: '0.8rem' }}
                    disabled={submittingProduct}
                  >
                    {submittingProduct ? 'GUARDANDO EN DB...' : 'CREAR PRODUCTO DYNAMICO'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Product Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
            <div style={{ backgroundColor: 'white', border: '1px solid var(--border-color)', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--light-gray)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--foreground)' }}>
                <ShoppingBag size={20} />
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--medium-gray)', fontFamily: 'var(--font-subtitle)', fontWeight: 700, letterSpacing: '0.5px' }}>TOTAL PRODUCTOS</span>
                <h3 style={{ fontSize: '1.5rem', marginTop: '2px' }}>{productsLoading ? '...' : totalProductsCount}</h3>
              </div>
            </div>

            <div style={{ backgroundColor: 'white', border: '1px solid var(--border-color)', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(12, 12, 12, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--foreground)' }}>
                <ImageIcon size={20} />
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--foreground)', fontFamily: 'var(--font-subtitle)', fontWeight: 700, letterSpacing: '0.5px' }}>UNIFORMES (DOGIS)</span>
                <h3 style={{ fontSize: '1.5rem', marginTop: '2px' }}>{productsLoading ? '...' : uniformsCount}</h3>
              </div>
            </div>

            <div style={{ backgroundColor: 'white', border: '1px solid var(--border-color)', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(212, 175, 55, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)' }}>
                <Tag size={20} />
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', fontFamily: 'var(--font-subtitle)', fontWeight: 700, letterSpacing: '0.5px' }}>CINTURONES (OBIS)</span>
                <h3 style={{ fontSize: '1.5rem', marginTop: '2px', color: 'var(--accent-gold)' }}>{productsLoading ? '...' : beltsCount}</h3>
              </div>
            </div>

            <div style={{ backgroundColor: 'white', border: '1px solid var(--border-color)', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(200, 16, 46, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                <Shield size={20} />
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontFamily: 'var(--font-subtitle)', fontWeight: 700, letterSpacing: '0.5px' }}>PROTECCIONES</span>
                <h3 style={{ fontSize: '1.5rem', marginTop: '2px', color: 'var(--primary)' }}>{productsLoading ? '...' : protectorsCount}</h3>
              </div>
            </div>
          </div>

          {/* Product List Card */}
          <div style={{ backgroundColor: 'white', border: '1px solid var(--border-color)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
            
            {/* Filters */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', padding: '0.6rem 1rem', width: '100%', maxWidth: '380px', backgroundColor: 'var(--background)' }}>
                <input 
                  type="text" 
                  placeholder="Buscar productos por nombre o descripción..." 
                  value={productSearchQuery}
                  onChange={(e) => setProductSearchQuery(e.target.value)}
                  style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.85rem', width: '100%', color: 'var(--foreground)' }}
                />
                <Search size={18} color="var(--medium-gray)" />
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => setProductCategoryFilter('all')}
                  style={{ 
                    border: '1px solid var(--border-color)', 
                    background: productCategoryFilter === 'all' ? 'var(--foreground)' : 'white', 
                    color: productCategoryFilter === 'all' ? 'white' : 'var(--foreground)',
                    padding: '0.5rem 1.2rem', 
                    fontSize: '0.75rem', 
                    fontFamily: 'var(--font-subtitle)',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  TODOS
                </button>
                <button 
                  onClick={() => setProductCategoryFilter('uniforms')}
                  style={{ 
                    border: '1px solid var(--border-color)', 
                    background: productCategoryFilter === 'uniforms' ? 'var(--foreground)' : 'white', 
                    color: productCategoryFilter === 'uniforms' ? 'white' : 'var(--foreground)',
                    padding: '0.5rem 1.2rem', 
                    fontSize: '0.75rem', 
                    fontFamily: 'var(--font-subtitle)',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  UNIFORMES
                </button>
                <button 
                  onClick={() => setProductCategoryFilter('belts')}
                  style={{ 
                    border: '1px solid var(--border-color)', 
                    background: productCategoryFilter === 'belts' ? 'var(--foreground)' : 'white', 
                    color: productCategoryFilter === 'belts' ? 'white' : 'var(--foreground)',
                    padding: '0.5rem 1.2rem', 
                    fontSize: '0.75rem', 
                    fontFamily: 'var(--font-subtitle)',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  CINTURONES
                </button>
                <button 
                  onClick={() => setProductCategoryFilter('protectors')}
                  style={{ 
                    border: '1px solid var(--border-color)', 
                    background: productCategoryFilter === 'protectors' ? 'var(--foreground)' : 'white', 
                    color: productCategoryFilter === 'protectors' ? 'white' : 'var(--foreground)',
                    padding: '0.5rem 1.2rem', 
                    fontSize: '0.75rem', 
                    fontFamily: 'var(--font-subtitle)',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  PROTECCIONES
                </button>
              </div>
            </div>

            {/* Table */}
            {productsLoading ? (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--medium-gray)' }}>
                <div style={{ display: 'inline-block', width: '30px', height: '30px', border: '3px solid var(--border-color)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '1rem' }}></div>
                <p style={{ fontFamily: 'var(--font-subtitle)', fontWeight: 700 }}>CARGANDO CATÁLOGO DE PRODUCTOS...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 1rem', border: '1px dashed var(--border-color)' }}>
                <p style={{ color: 'var(--medium-gray)', fontSize: '0.95rem' }}>
                  No se encontraron productos en el catálogo.
                </p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '650px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--foreground)', paddingBottom: '0.5rem' }}>
                      <th style={{ padding: '0.75rem 0.5rem', fontSize: '0.8rem', fontFamily: 'var(--font-subtitle)', fontWeight: 700, color: 'var(--medium-gray)', width: '70px' }}>IMAGEN</th>
                      <th style={{ padding: '0.75rem 0.5rem', fontSize: '0.8rem', fontFamily: 'var(--font-subtitle)', fontWeight: 700, color: 'var(--medium-gray)' }}>PRODUCTO / DESCRIPCIÓN</th>
                      <th style={{ padding: '0.75rem 0.5rem', fontSize: '0.8rem', fontFamily: 'var(--font-subtitle)', fontWeight: 700, color: 'var(--medium-gray)', width: '120px' }}>CATEGORÍA</th>
                      <th style={{ padding: '0.75rem 0.5rem', fontSize: '0.8rem', fontFamily: 'var(--font-subtitle)', fontWeight: 700, color: 'var(--medium-gray)', width: '130px' }}>PRECIO</th>
                      <th style={{ padding: '0.75rem 0.5rem', fontSize: '0.8rem', fontFamily: 'var(--font-subtitle)', fontWeight: 700, color: 'var(--medium-gray)', width: '130px' }}>ETIQUETA</th>
                      <th style={{ padding: '0.75rem 0.5rem', fontSize: '0.8rem', fontFamily: 'var(--font-subtitle)', fontWeight: 700, color: 'var(--medium-gray)', textAlign: 'right', width: '180px' }}>ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((prod) => (
                      <tr key={prod._id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }} className="user-row">
                        {/* Image */}
                        <td style={{ padding: '1rem 0.5rem' }}>
                          <div 
                            style={{ 
                              width: '50px', 
                              height: '50px', 
                              backgroundImage: `url("${prod.image}")`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              border: '1px solid var(--border-color)',
                              backgroundColor: 'var(--light-gray)'
                            }} 
                          />
                        </td>

                        {/* Name / Description */}
                        <td style={{ padding: '1rem 0.5rem' }}>
                          <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--foreground)', marginBottom: '4px' }}>{prod.name}</strong>
                          <span style={{ fontSize: '0.75rem', color: 'var(--medium-gray)', display: 'block', lineHeight: '1.4', maxWidth: '350px' }}>
                            {prod.description}
                          </span>
                        </td>

                        {/* Category */}
                        <td style={{ padding: '1rem 0.5rem', fontSize: '0.8rem', fontWeight: 'bold' }}>
                          {prod.category === 'uniforms' ? '🥋 Dogi / Uniforme' : 
                           prod.category === 'belts' ? '🎗 Obi / Cinturón' : 
                           '🛡 Protección'}
                        </td>

                        {/* Price */}
                        <td style={{ padding: '1rem 0.5rem', fontSize: '0.95rem', fontFamily: 'var(--font-title)', color: 'var(--primary)', fontWeight: 'bold' }}>
                          ₡{prod.price.toLocaleString('es-CR')}
                        </td>

                        {/* Badge */}
                        <td style={{ padding: '1rem 0.5rem' }}>
                          {prod.badge ? (
                            <span style={{ 
                              backgroundColor: prod.badgeColor || 'var(--primary)',
                              color: 'white',
                              fontSize: '0.65rem',
                              padding: '3px 8px',
                              fontWeight: 700,
                              fontFamily: 'var(--font-subtitle)',
                              letterSpacing: '0.5px',
                              textTransform: 'uppercase'
                            }}>
                              {prod.badge}
                            </span>
                          ) : (
                            <span style={{ color: 'var(--medium-gray)', fontSize: '0.8rem' }}>Sin etiqueta</span>
                          )}
                        </td>

                        {/* Actions */}
                        <td style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            {myRole !== 'viewer' ? (
                              <>
                                <button
                                  onClick={() => startEditProduct(prod)}
                                  className="btn btn-secondary"
                                  style={{ 
                                    padding: '0.4rem 0.8rem', 
                                    fontSize: '0.75rem', 
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                  }}
                                >
                                  <Edit size={12} /> Editar
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(prod._id, prod.name)}
                                  className="btn btn-secondary"
                                  style={{ 
                                    padding: '0.4rem 0.8rem', 
                                    fontSize: '0.75rem', 
                                    color: 'var(--primary)',
                                    borderColor: 'var(--primary)',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                  }}
                                >
                                  <Trash2 size={12} /> Eliminar
                                </button>
                              </>
                            ) : (
                              <span style={{ fontSize: '0.75rem', color: 'var(--medium-gray)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <Eye size={12} /> Vista Lectura
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* Edit Product Modal Overlay */}
      {editingProduct && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(4px)',
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: 'white',
            border: '2px solid var(--accent-gold)',
            padding: '2.5rem',
            maxWidth: '650px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            position: 'relative'
          }}>
            <button 
              onClick={() => setEditingProduct(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--medium-gray)'
              }}
            >
              <X size={24} />
            </button>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-title)', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--foreground)' }}>
              <Edit size={22} color="var(--accent-gold)" /> Editar Producto del Catálogo
            </h3>

            <form onSubmit={handleEditProductSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-subtitle)', fontWeight: 700, marginBottom: '6px', color: 'var(--dark-gray)' }}>
                    NOMBRE DEL PRODUCTO
                  </label>
                  <input 
                    type="text" 
                    value={editProdName}
                    onChange={(e) => setEditProdName(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.85rem' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-subtitle)', fontWeight: 700, marginBottom: '6px', color: 'var(--dark-gray)' }}>
                    CATEGORÍA
                  </label>
                  <select 
                    value={editProdCategory}
                    onChange={(e) => setEditProdCategory(e.target.value as any)}
                    style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.85rem', height: '37px', backgroundColor: 'white' }}
                  >
                    <option value="uniforms">Uniformes (Dogis)</option>
                    <option value="belts">Cinturones (Obis)</option>
                    <option value="protectors">Protecciones</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-subtitle)', fontWeight: 700, marginBottom: '6px', color: 'var(--dark-gray)' }}>
                    PRECIO (₡ COLONES)
                  </label>
                  <input 
                    type="number" 
                    value={editProdPrice}
                    onChange={(e) => setEditProdPrice(Number(e.target.value))}
                    style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.85rem' }}
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-subtitle)', fontWeight: 700, marginBottom: '6px', color: 'var(--dark-gray)' }}>
                    URL DE LA IMAGEN
                  </label>
                  <input 
                    type="text" 
                    value={editProdImage}
                    onChange={(e) => setEditProdImage(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.85rem' }}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-subtitle)', fontWeight: 700, marginBottom: '6px', color: 'var(--dark-gray)' }}>
                    ETIQUETA (OPCIONAL)
                  </label>
                  <input 
                    type="text" 
                    placeholder="Ej. WKF APPROVED"
                    value={editProdBadge}
                    onChange={(e) => setEditProdBadge(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.85rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-subtitle)', fontWeight: 700, marginBottom: '6px', color: 'var(--dark-gray)' }}>
                    COLOR DE ETIQUETA
                  </label>
                  <select 
                    value={editProdBadgeColor}
                    onChange={(e) => setEditProdBadgeColor(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.85rem', height: '37px', backgroundColor: 'white' }}
                  >
                    <option value="var(--primary)">Rojo Tokaido (Primario)</option>
                    <option value="var(--accent-gold)">Dorado Bordado (Acento)</option>
                    <option value="var(--foreground)">Negro Premium (Fondo)</option>
                    <option value="var(--medium-gray)">Gris Metálico (Muted)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-subtitle)', fontWeight: 700, marginBottom: '6px', color: 'var(--dark-gray)' }}>
                  DESCRIPCIÓN
                </label>
                <textarea 
                  value={editProdDescription}
                  onChange={(e) => setEditProdDescription(e.target.value)}
                  rows={3}
                  style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.85rem', resize: 'vertical' }}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button 
                  type="button" 
                  onClick={() => setEditingProduct(null)}
                  className="btn btn-secondary"
                  style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem' }}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem' }}
                  disabled={updatingProduct}
                >
                  {updatingProduct ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .user-row:hover {
          background-color: var(--light-gray) !important;
        }
      ` }} />
    </div>
  );
}
