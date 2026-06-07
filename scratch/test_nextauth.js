const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://davidartaviarodriguez_db_user:UYUNlKLuR1rSoTsu@ac-cxc8kvq-shard-00-00.jodngjz.mongodb.net:27017,ac-cxc8kvq-shard-00-01.jodngjz.mongodb.net:27017,ac-cxc8kvq-shard-00-02.jodngjz.mongodb.net:27017/tokaidocr?authSource=admin&replicaSet=atlas-p0tcts-shard-0&ssl=true&retryWrites=true&w=majority';

// Simulate the logic in route.ts
async function testSignIn() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB Connected');

    const db = mongoose.connection.db;
    const usersCollection = db.collection('Users');

    const email = 'david.artavia.rodriguez@gmail.com';
    const name = 'David';
    const image = '';

    const existingUser = await usersCollection.findOne({ email });

    if (!existingUser) {
        console.log('User not found. Simulating creation...');
    } else {
        console.log('User found:', existingUser);
        let isModified = false;
        
        if (name && existingUser.name !== name) {
            existingUser.name = name;
            isModified = true;
        }
        if (image && existingUser.image !== image) {
            existingUser.image = image;
            isModified = true;
        }

        if (isModified) {
            console.log('Saving modifications...', { name: existingUser.name, image: existingUser.image });
            // Using updateOne to simulate mongoose save()
            await usersCollection.updateOne({ _id: existingUser._id }, { $set: { name: existingUser.name, image: existingUser.image } });
            console.log('Saved successfully');
        } else {
            console.log('No modifications needed');
        }
    }
  } catch (err) {
    console.error('Error in test:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected');
  }
}

testSignIn();
