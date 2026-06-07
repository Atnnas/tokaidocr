const mongoose = require('mongoose');

const MONGODB_URI = "mongodb://davidartaviarodriguez_db_user:UYUNlKLuR1rSoTsu@ac-cxc8kvq-shard-00-00.jodngjz.mongodb.net:27017,ac-cxc8kvq-shard-00-01.jodngjz.mongodb.net:27017,ac-cxc8kvq-shard-00-02.jodngjz.mongodb.net:27017/tokaidocr?authSource=admin&replicaSet=atlas-p0tcts-shard-0&ssl=true&retryWrites=true&w=majority";

const NEW_PRODUCTS = [
  {
    name: 'Uniforme Entrenamiento',
    category: 'uniforms',
    price: 31000,
    description: 'Uniforme Tokaido para entrenamiento tradicional. Alta durabilidad y excelente corte, diseñado para la práctica diaria en el dojo.',
    image: '/tokaido_gi_showcase.png',
    badge: 'ENTRENAMIENTO',
    badgeColor: 'var(--accent-gold)'
  },
  {
    name: 'Kumite Reversible K1',
    category: 'uniforms',
    price: 175000,
    description: 'Uniforme oficial para competición de Kumite K1. Reversible con bordados rojo y azul (Aka/Ao) en los hombros. Extremadamente ligero, diseñado para velocidad.',
    image: '/tokaido_gi_showcase.png',
    badge: 'WKF APPROVED',
    badgeColor: 'var(--primary)'
  }
];

async function reseed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully!");

    const ProductSchema = new mongoose.Schema({}, { strict: false, collection: 'Products' });
    const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

    console.log("Deleting all existing products...");
    await Product.deleteMany({});
    console.log("Deleted old products.");

    console.log("Inserting new products...");
    await Product.insertMany(NEW_PRODUCTS);
    console.log("Successfully inserted new products!");

  } catch (err) {
    console.error("Error during reseeding operation:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from database.");
  }
}

reseed();
