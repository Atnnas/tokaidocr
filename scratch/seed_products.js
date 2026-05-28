const mongoose = require('mongoose');

const MONGODB_URI = "mongodb://davidartaviarodriguez_db_user:UYUNlKLuR1rSoTsu@ac-cxc8kvq-shard-00-00.jodngjz.mongodb.net:27017,ac-cxc8kvq-shard-00-01.jodngjz.mongodb.net:27017,ac-cxc8kvq-shard-00-02.jodngjz.mongodb.net:27017/tokaidocr?authSource=admin&replicaSet=atlas-p0tcts-shard-0&ssl=true&retryWrites=true&w=majority";

const PRODUCTS = [
  {
    name: 'Tokaido Yakudo (Heavyweight Kata Gi)',
    category: 'uniforms',
    price: 160000,
    description: 'El uniforme insignia de Tokaido para Kata. Hecho en Japón de 12oz de algodón pesado, produce un snap insuperable.',
    image: '/tokaido_gi_showcase.png',
    badge: 'JAPAN MADE',
    badgeColor: 'var(--foreground)'
  },
  {
    name: 'Tokaido Kumite Master (Lightweight)',
    category: 'uniforms',
    price: 125000,
    description: 'Ultra liviano y transpirable, homologado WKF para competencias internacionales. 100% poliéster micro-ventilado.',
    image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=600',
    badge: 'WKF APPROVED',
    badgeColor: 'var(--primary)'
  },
  {
    name: 'Tokaido Kata Master Premium',
    category: 'uniforms',
    price: 145000,
    description: 'Corte japonés oficial para Kata. Tela de 14oz súper gruesa que mantiene su forma rígida perfecta en competencia.',
    image: '/tokaido_gi_showcase.png',
    badge: 'KATA CHAMPION',
    badgeColor: 'var(--accent-gold)'
  },
  {
    name: 'Cinturón Negro de Satén Premium',
    category: 'belts',
    price: 45000,
    description: 'Cinturón negro de satén grueso con brillo premium de 4.5cm de ancho. Excelente calidad y brillo superior.',
    image: '/tokaido_belt_embroidery.png',
    badge: 'PREMIUM',
    badgeColor: 'var(--accent-gold)'
  },
  {
    name: 'Cinturón Negro de Algodón Tradicional',
    category: 'belts',
    price: 38000,
    description: 'Cinturón negro tradicional de algodón mate. Desarrolla un desgaste natural de color gris con los años de práctica.',
    image: '/tokaido_belt_embroidery.png',
    badge: 'TRADICIONAL',
    badgeColor: 'var(--accent-gold)'
  },
  {
    name: 'Guantillas de Competición WKF',
    category: 'protectors',
    price: 28000,
    description: 'Guantillas oficiales de competición WKF con pulgar. Molde ergonómico de espuma de alta absorción. Disponibles en rojo y azul.',
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=600',
    badge: 'WKF APPROVED',
    badgeColor: 'var(--primary)'
  },
  {
    name: 'Espinilleras con Empeine WKF',
    category: 'protectors',
    price: 35000,
    description: 'Espinillera y protector de pie desmontable oficial WKF. Diseño anatómico antideslizante de excelente ajuste.',
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=600',
    badge: 'WKF APPROVED',
    badgeColor: 'var(--primary)'
  },
  {
    name: 'Karategi Tokaido Student (8oz)',
    category: 'uniforms',
    price: 30000,
    description: 'Uniforme de iniciación ideal para principiantes y jóvenes. 8oz de tela mixta de algodón/poliéster de fácil planchado.',
    image: '/tokaido_gi_showcase.png',
    badge: 'BEST SELLER',
    badgeColor: 'var(--foreground)'
  }
];

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully!");

    // Define a basic dynamic model pointing to the 'Products' collection
    const ProductSchema = new mongoose.Schema({}, { strict: false, collection: 'Products' });
    const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

    console.log("Checking for existing products in database...");
    const count = await Product.countDocuments();
    console.log(`Current products count: ${count}`);

    if (count === 0) {
      console.log("Database is empty of products. Seeding initial catalog...");
      await Product.insertMany(PRODUCTS);
      console.log("Seeding complete! Initial catalog successfully inserted.");
    } else {
      console.log("Database already has products. Skipping initial seed.");
      console.log("To re-seed or reset, please clear the 'Products' collection first.");
    }
  } catch (err) {
    console.error("Error during seeding operation:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from database.");
  }
}

seed();
