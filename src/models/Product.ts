import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  category: 'uniforms' | 'belts' | 'protectors';
  price: number;
  description: string;
  image: string;
  badge?: string;
  badgeColor?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema<IProduct> = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['uniforms', 'belts', 'protectors'],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    badge: {
      type: String,
      trim: true,
    },
    badgeColor: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: 'Products',
  }
);

// Prevent compiling model multiple times due to Next.js HMR
const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
