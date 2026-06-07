const mongoose = require('mongoose');

const MONGODB_URI = "mongodb://davidartaviarodriguez_db_user:UYUNlKLuR1rSoTsu@ac-cxc8kvq-shard-00-00.jodngjz.mongodb.net:27017,ac-cxc8kvq-shard-00-01.jodngjz.mongodb.net:27017,ac-cxc8kvq-shard-00-02.jodngjz.mongodb.net:27017/tokaidocr?authSource=admin&replicaSet=atlas-p0tcts-shard-0&ssl=true&retryWrites=true&w=majority";

async function updatePetos() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully!");

    const ProductSchema = new mongoose.Schema({}, { strict: false, collection: 'Products' });
    const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

    // 1. Rename existing "Peto Tokaido" to "Peto Masculino Tokaido" and update image
    console.log("Updating existing Peto Tokaido to Peto Masculino...");
    const updateResult = await Product.updateOne(
      { name: 'Peto Tokaido' },
      { 
        $set: { 
          name: 'Peto Masculino Tokaido',
          image: '/petoMascPng.png',
          description: 'Peto protector interno oficial Tokaido. Cumple con normativas WKF, ultraligero y con excelente amortiguación de impactos.'
        } 
      }
    );
    console.log("Update result:", updateResult);

    // 2. Check if "Peto Femenino Tokaido" already exists
    const existingFem = await Product.findOne({ name: 'Peto Femenino Tokaido' });
    if (!existingFem) {
      console.log("Inserting new Peto Femenino...");
      const newFem = new Product({
        name: 'Peto Femenino Tokaido',
        category: 'protectors',
        price: 40000,
        description: 'Peto protector femenino Tokaido oficial WKF. Diseño anatómico con copas protectoras integradas para máxima seguridad y movilidad en Kumite.',
        image: '/petoFemPng.png',
        badge: 'WKF APPROVED',
        badgeColor: 'var(--primary)'
      });
      await newFem.save();
      console.log("Successfully inserted Peto Femenino!");
    } else {
      console.log("Peto Femenino already exists, updating image...");
      await Product.updateOne(
        { _id: existingFem._id },
        { $set: { image: '/petoFemPng.png' } }
      );
    }

  } catch (err) {
    console.error("Error during execution:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from database.");
  }
}

updatePetos();
