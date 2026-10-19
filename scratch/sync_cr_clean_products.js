const mongoose = require('mongoose');

const MONGODB_URI = "mongodb://davidartaviarodriguez_db_user:UYUNlKLuR1rSoTsu@ac-cxc8kvq-shard-00-00.jodngjz.mongodb.net:27017,ac-cxc8kvq-shard-00-01.jodngjz.mongodb.net:27017,ac-cxc8kvq-shard-00-02.jodngjz.mongodb.net:27017/tokaidocr?authSource=admin&replicaSet=atlas-p0tcts-shard-0&ssl=true&retryWrites=true&w=majority";

async function syncCleanProducts() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully!");

    const ProductSchema = new mongoose.Schema({}, { strict: false, collection: 'Products' });
    const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

    const updates = [
      {
        filter: { name: /kumite/i },
        update: { 
          name: 'Kumite Master II WKF',
          image: '/products/kumite_master.jpg',
          price: 115000,
          description: 'Set de 2 chaquetas (azul + rojo) y 1 pantalón. Ultraligero homologado WKF.'
        }
      },
      {
        filter: { name: /kata master/i },
        update: { 
          name: 'Kata Master WKF - Corte Americano',
          image: '/products/kata_master.jpg',
          price: 135000,
          description: '1 chaqueta pesada y 1 pantalón con snap sound inigualable para alta competencia.'
        }
      },
      {
        filter: { name: /espinillera/i },
        update: { 
          name: 'Espinillera WKF',
          image: '/products/espinillera.jpg',
          price: 38000,
          description: '1 Par con empeine desmontable. Colores disponibles: Rojo y Azul.'
        }
      },
      {
        filter: { name: /guant[ií]n/i },
        update: { 
          name: 'Guantín de competencia WKF',
          image: '/products/guantin.jpg',
          price: 28000,
          description: '1 Par con espuma de alta absorción y cierre ergonómico. Colores: Rojo y Azul.'
        }
      },
      {
        filter: { name: /peto masc|pectoral/i },
        update: { 
          name: 'Protector Pectoral Unisex WKF',
          image: '/products/pectoral.jpg',
          price: 35000,
          description: 'Unidad homologada para torneos oficiales. Color disponible: Blanco.'
        }
      },
      {
        filter: { name: /peto fem|femenino/i },
        update: { 
          name: 'Protector Femenino WKF',
          image: '/products/femenino.jpg',
          price: 36000,
          description: 'Unidad anatómica con copas protectoras integradas. Color disponible: Blanco.'
        }
      },
      {
        filter: { name: /entrenamiento/i },
        update: { 
          name: 'Uniforme Entrenamiento Tradicional',
          image: '/products/kata_master.jpg',
          price: 31000,
          description: 'Uniforme de corte tradicional japonés para práctica diaria en el dojo.'
        }
      }
    ];

    for (const item of updates) {
      const res = await Product.updateMany(item.filter, { $set: item.update });
      console.log(`Updated for ${item.update.name}:`, res.modifiedCount);
    }

    console.log("Database clean sync completed successfully!");
  } catch (err) {
    console.error("Error during sync:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected.");
  }
}

syncCleanProducts();
