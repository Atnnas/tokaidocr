import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import User from '@/models/User';

// Helper to verify if the requester is an admin or editor
async function getAuthorizedStaff() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return null;
  }
  await dbConnect();
  const dbUser = await User.findOne({ email: session.user.email });
  if (!dbUser || !['admin', 'editor'].includes(dbUser.role)) {
    return null;
  }
  return dbUser;
}

export async function POST(request: Request) {
  try {
    const staff = await getAuthorizedStaff();
    if (!staff) {
      return NextResponse.json({ error: 'No autorizado. Se requieren permisos de Administrador o Editor.' }, { status: 403 });
    }

    const { name, category, price, description, image, badge, badgeColor } = await request.json();

    if (!name || !category || price === undefined || !description || !image) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
    }

    if (!['uniforms', 'belts', 'protectors'].includes(category)) {
      return NextResponse.json({ error: 'Categoría inválida' }, { status: 400 });
    }

    const newProduct = await Product.create({
      name: name.trim(),
      category,
      price: Number(price),
      description: description.trim(),
      image: image.trim(),
      badge: badge ? badge.trim() : '',
      badgeColor: badgeColor ? badgeColor.trim() : 'var(--primary)'
    });

    return NextResponse.json({ product: newProduct }, { status: 201 });
  } catch (error: any) {
    console.error('Error in POST /api/admin/products:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const staff = await getAuthorizedStaff();
    if (!staff) {
      return NextResponse.json({ error: 'No autorizado. Se requieren permisos de Administrador o Editor.' }, { status: 403 });
    }

    const { productId, name, category, price, description, image, badge, badgeColor } = await request.json();

    if (!productId) {
      return NextResponse.json({ error: 'ID de producto requerido' }, { status: 400 });
    }

    const updateFields: any = {};
    if (name) updateFields.name = name.trim();
    if (category) {
      if (!['uniforms', 'belts', 'protectors'].includes(category)) {
        return NextResponse.json({ error: 'Categoría inválida' }, { status: 400 });
      }
      updateFields.category = category;
    }
    if (price !== undefined) updateFields.price = Number(price);
    if (description) updateFields.description = description.trim();
    if (image) updateFields.image = image.trim();
    if (badge !== undefined) updateFields.badge = badge.trim();
    if (badgeColor !== undefined) updateFields.badgeColor = badgeColor.trim();

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ product: updatedProduct });
  } catch (error: any) {
    console.error('Error in PATCH /api/admin/products:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const staff = await getAuthorizedStaff();
    if (!staff) {
      return NextResponse.json({ error: 'No autorizado. Se requieren permisos de Administrador o Editor.' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    let productId = searchParams.get('productId');

    if (!productId) {
      try {
        const body = await request.json();
        productId = body.productId;
      } catch (e) {
        // body not present
      }
    }

    if (!productId) {
      return NextResponse.json({ error: 'ID de producto requerido' }, { status: 400 });
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Producto eliminado con éxito.' });
  } catch (error: any) {
    console.error('Error in DELETE /api/admin/products:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
