const mongoose = require('mongoose');

const MONGODB_URI = "mongodb://davidartaviarodriguez_db_user:UYUNlKLuR1rSoTsu@ac-cxc8kvq-shard-00-00.jodngjz.mongodb.net:27017,ac-cxc8kvq-shard-00-01.jodngjz.mongodb.net:27017,ac-cxc8kvq-shard-00-02.jodngjz.mongodb.net:27017/tokaidocr?authSource=admin&replicaSet=atlas-p0tcts-shard-0&ssl=true&retryWrites=true&w=majority";

async function run() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully!");

    const email = "david.artavia.rodriguez@gmail.com";
    
    // Define a basic dynamic model pointing to the 'Users' collection
    const UserSchema = new mongoose.Schema({}, { strict: false, collection: 'Users' });
    const User = mongoose.models.User || mongoose.model('User', UserSchema);

    console.log(`Searching for user with email: ${email}...`);
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      console.log(`User "${email}" not found. Creating/Pre-registering with Admin privileges...`);
      const newUser = await User.create({
        name: "David Artavia Rodriguez",
        email: email.toLowerCase().trim(),
        role: "admin",
        image: "",
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log("User pre-registered successfully as Admin:", newUser);
    } else {
      console.log(`Found existing user: "${user.name}" with current role: "${user.role}"`);
      user.role = "admin";
      await User.updateOne({ _id: user._id }, { $set: { role: 'admin' } });
      console.log(`User "${user.name}" role updated to "admin" successfully!`);
    }
  } catch (err) {
    console.error("Error executing admin assignment:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from database.");
  }
}

run();
