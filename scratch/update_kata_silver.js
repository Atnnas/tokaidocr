const mongoose = require('mongoose');

const MONGODB_URI = "mongodb://davidartaviarodriguez_db_user:UYUNlKLuR1rSoTsu@ac-cxc8kvq-shard-00-00.jodngjz.mongodb.net:27017,ac-cxc8kvq-shard-00-01.jodngjz.mongodb.net:27017,ac-cxc8kvq-shard-00-02.jodngjz.mongodb.net:27017/tokaidocr?authSource=admin&replicaSet=atlas-p0tcts-shard-0&ssl=true&retryWrites=true&w=majority";

async function updateImage() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully!");

    const ProductSchema = new mongoose.Schema({}, { strict: false, collection: 'Products' });
    const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

    console.log("Updating Kata Master Silver 12 oz image...");
    const result = await Product.updateOne(
      { name: 'Kata Master Silver 12 oz' },
      { $set: { image: '/kataMasterSilver.png' } }
    );
    
    console.log("Update result:", result);

  } catch (err) {
    console.error("Error during update:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from database.");
  }
}

updateImage();
