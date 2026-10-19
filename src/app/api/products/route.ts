import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
  try {
    await dbConnect();
    // Using .lean() per Vercel/MongoDB best practices for read-only JSON responses
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ products });
  } catch (error: any) {
    console.error('Error in GET /api/products:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
