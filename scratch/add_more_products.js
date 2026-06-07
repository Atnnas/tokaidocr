const mongoose = require('mongoose');

const MONGODB_URI = "mongodb://davidartaviarodriguez_db_user:UYUNlKLuR1rSoTsu@ac-cxc8kvq-shard-00-00.jodngjz.mongodb.net:27017,ac-cxc8kvq-shard-00-01.jodngjz.mongodb.net:27017,ac-cxc8kvq-shard-00-02.jodngjz.mongodb.net:27017/tokaidocr?authSource=admin&replicaSet=atlas-p0tcts-shard-0&ssl=true&retryWrites=true&w=majority";

const NEW_PRODUCTS = [
  {
    name: 'Kata Master Gold 14 oz',
    category: 'uniforms',
    price: 95000,
    description: 'Uniforme Tokaido premium para Kata. Fabricado con tela pesada de 14 oz, produce un excelente sonido (snap) en cada movimiento. Ideal para competencia y maestría.',
    image: '/tokaido_gi_showcase.png',
    badge: 'PREMIUM',
    badgeColor: 'var(--accent-gold)'
  },
  {
    name: 'Kata Master Silver 12 oz',
    category: 'uniforms',
    price: 90000,
    description: 'Uniforme de nivel maestro para Kata. Tela de 12 oz que brinda una excelente movilidad, conservando el característico sonido en técnicas explosivas.',
    image: '/tokaido_gi_showcase.png',
    badge: 'KATA MASTER',
    badgeColor: '#C0C0C0'
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
