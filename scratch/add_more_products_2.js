const mongoose = require('mongoose');

const MONGODB_URI = "mongodb://davidartaviarodriguez_db_user:UYUNlKLuR1rSoTsu@ac-cxc8kvq-shard-00-00.jodngjz.mongodb.net:27017,ac-cxc8kvq-shard-00-01.jodngjz.mongodb.net:27017,ac-cxc8kvq-shard-00-02.jodngjz.mongodb.net:27017/tokaidocr?authSource=admin&replicaSet=atlas-p0tcts-shard-0&ssl=true&retryWrites=true&w=majority";

const NEW_PRODUCTS = [
  {
    name: 'Maletín Sensei',
    category: 'protectors',
    price: 65000,
    description: 'Maletín oficial Tokaido tipo Sensei, ideal para transportar tu equipo de Karate, Karategi y accesorios con estilo y comodidad.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600',
    badge: 'NUEVO',
    badgeColor: 'var(--accent-gold)'
  },
  {
    name: 'Peto Tokaido',
    category: 'protectors',
    price: 40000,
    description: 'Peto protector Tokaido oficial WKF. Diseño anatómico y ligero para máxima movilidad y seguridad en Kumite.',
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=600',
    badge: 'WKF APPROVED',
    badgeColor: 'var(--primary)'
  },
  {
    name: 'Guantes',
    category: 'protectors',
    price: 25000,
    description: 'Guantillas Tokaido oficiales para Kumite. Espuma de alta densidad para máxima protección, con cierre de velcro firme.',
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=600',
    badge: 'WKF APPROVED',
    badgeColor: 'var(--primary)'
  }
];

async function addProducts() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully!");

    const ProductSchema = new mongoose.Schema({}, { strict: false, collection: 'Products' });
    const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

    console.log("Inserting new products...");
    await Product.insertMany(NEW_PRODUCTS);
    console.log("Successfully inserted new products!");

  } catch (err) {
    console.error("Error during insertion:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from database.");
  }
}

addProducts();
