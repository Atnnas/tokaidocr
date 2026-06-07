const mongoose = require('mongoose');
const User = require('./src/models/User').default || require('./src/models/User');

const MONGODB_URI = 'mongodb://davidartaviarodriguez_db_user:UYUNlKLuR1rSoTsu@ac-cxc8kvq-shard-00-00.jodngjz.mongodb.net:27017,ac-cxc8kvq-shard-00-01.jodngjz.mongodb.net:27017,ac-cxc8kvq-shard-00-02.jodngjz.mongodb.net:27017/tokaidocr?authSource=admin&replicaSet=atlas-p0tcts-shard-0&ssl=true&retryWrites=true&w=majority';

async function testSignIn() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB Connected');

    const email = 'david.artavia.rodriguez@gmail.com';
    const name = 'David'; // Simulating Google sending 'David' instead of the full name
    const image = '';

    const existingUser = await mongoose.model('User').findOne({ email });

    if (!existingUser) {
        console.log('User not found.');
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
            console.log('Saving modifications with mongoose...');
            await existingUser.save();
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
