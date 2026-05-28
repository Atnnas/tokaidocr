import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import User from '@/models/User';

// Helper to verify if the requester has a valid session and returns their DB user document
async function getAuthorizedUser() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return null;
  }
  await dbConnect();
  const dbUser = await User.findOne({ email: session.user.email });
  if (!dbUser || !['admin', 'editor', 'viewer'].includes(dbUser.role)) {
    return null;
  }
  return dbUser;
}

export async function GET() {
  try {
    const requester = await getAuthorizedUser();
    if (!requester) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    // All authorized roles (admin, editor, viewer) can view the users list
    const users = await User.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ users });
  } catch (error: any) {
    console.error('Error in GET /api/admin/users:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const requester = await getAuthorizedUser();
    if (!requester) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const { userId, role } = await request.json();

    if (!userId || !role) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
    }

    // Verify allowed roles
    if (!['viewer', 'editor', 'admin'].includes(role)) {
      return NextResponse.json({ error: 'Rol inválido' }, { status: 400 });
    }

    // Developer helper: Allow the current user to modify their own role to test all 3 views
    const isSelfModification = requester._id.toString() === userId;

    // Role-based restrictions:
    // 1. Viewers cannot change roles at all (except self-modification for testing)
    if (requester.role === 'viewer' && !isSelfModification) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    // Find the target user being modified
    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    // 2. Editors cannot assign or modify the Admin role (except self-modification for testing)
    if (requester.role === 'editor' && !isSelfModification) {
      if (targetUser.role === 'admin' || role === 'admin') {
        return NextResponse.json({ error: 'Los editores no pueden asignar ni modificar el rol de Administrador.' }, { status: 403 });
      }
    }

    // 3. Admins have full access, but cannot demote themselves if they are the last admin
    if (requester.role === 'admin') {
      if (requester._id.toString() === userId && role !== 'admin') {
        const otherAdminsCount = await User.countDocuments({ role: 'admin', _id: { $ne: requester._id } });
        if (otherAdminsCount === 0) {
          return NextResponse.json({ error: 'No puedes quitarte el rol de administrador porque eres el único administrador en el sistema.' }, { status: 400 });
        }
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );

    return NextResponse.json({ user: updatedUser });
  } catch (error: any) {
    console.error('Error in PATCH /api/admin/users:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const requester = await getAuthorizedUser();
    if (!requester) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    const { name, email, role } = await request.json();

    if (!name || !email || !role) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
    }

    // Verify role
    if (!['viewer', 'editor', 'admin'].includes(role)) {
      return NextResponse.json({ error: 'Rol inválido' }, { status: 400 });
    }

    // Role-based restrictions:
    // 1. Viewers cannot add users
    if (requester.role === 'viewer') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    // 2. Editors cannot create admin users
    if (requester.role === 'editor' && role === 'admin') {
      return NextResponse.json({ error: 'Los editores no pueden pre-registrar administradores.' }, { status: 403 });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return NextResponse.json({ error: 'Este correo electrónico ya está registrado en el sistema.' }, { status: 400 });
    }

    // Pre-register user in DB
    const newUser = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      role,
      image: '',
    });

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error: any) {
    console.error('Error in POST /api/admin/users:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const requester = await getAuthorizedUser();
    // Only administrators can delete users (revoke access)
    if (!requester || requester.role !== 'admin') {
      return NextResponse.json({ error: 'No autorizado. Se requieren permisos de Administrador.' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    let userId = searchParams.get('userId');

    if (!userId) {
      try {
        const body = await request.json();
        userId = body.userId;
      } catch (e) {
        // body not present
      }
    }

    if (!userId) {
      return NextResponse.json({ error: 'ID de usuario requerido' }, { status: 400 });
    }

    // Prevent deleting oneself
    if (requester._id.toString() === userId) {
      return NextResponse.json({ error: 'No puedes eliminar tu propia cuenta de administrador.' }, { status: 400 });
    }

    await User.findByIdAndDelete(userId);

    return NextResponse.json({ success: true, message: 'Usuario eliminado con éxito de la lista de permitidos.' });
  } catch (error: any) {
    console.error('Error in DELETE /api/admin/users:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
