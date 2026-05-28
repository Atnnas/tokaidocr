const mongoose = require('mongoose');

const MONGODB_URI_SRV = "mongodb+srv://davidartaviarodriguez_db_user:UYUNlKLuR1rSoTsu@kmadb.jodngjz.mongodb.net/tokaidocr?retryWrites=true&w=majority";
const MONGODB_URI_STANDARD = "mongodb://davidartaviarodriguez_db_user:UYUNlKLuR1rSoTsu@ac-cxc8kvq-shard-00-00.jodngjz.mongodb.net:27017,ac-cxc8kvq-shard-00-01.jodngjz.mongodb.net:27017,ac-cxc8kvq-shard-00-02.jodngjz.mongodb.net:27017/tokaidocr?authSource=admin&replicaSet=atlas-p0tcts-shard-0&ssl=true&retryWrites=true&w=majority";

async function testConnection(uri, label) {
  console.log(`\nTesting connection for: ${label}`);
  try {
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log(`Success connecting to ${label}!`);
    await mongoose.disconnect();
  } catch (err) {
    console.error(`Failed connecting to ${label}:`, err.message);
  }
}

async function run() {
  // Test 1: Standard MongoDB connection string (should succeed without setting custom DNS)
  await testConnection(MONGODB_URI_STANDARD, "Standard connection URI");

  // Test 2: SRV MongoDB connection string (might fail if custom DNS isn't set, or might fail anyway)
  await testConnection(MONGODB_URI_SRV, "SRV connection URI");
}

run();
