const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://davidartaviarodriguez_db_user:UYUNlKLuR1rSoTsu@ac-cxc8kvq-shard-00-00.jodngjz.mongodb.net:27017,ac-cxc8kvq-shard-00-01.jodngjz.mongodb.net:27017,ac-cxc8kvq-shard-00-02.jodngjz.mongodb.net:27017/tokaidocr?authSource=admin&replicaSet=atlas-p0tcts-shard-0&ssl=true&retryWrites=true&w=majority';

async function makeAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Conectado a MongoDB.');

    // Using raw collection to avoid needing to load the Next.js model
    const db = mongoose.connection.db;
    const usersCollection = db.collection('Users');

    const email = 'david.artavia.rodriguez@gmail.com';

    // Find if user exists
    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      await usersCollection.updateOne({ email }, { $set: { role: 'admin' } });
      console.log(`Usuario actualizado exitosamente. ${email} ahora es ADMIN.`);
    } else {
      await usersCollection.insertOne({
        name: 'David Artavia',
        email: email,
        image: '',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log(`Usuario creado exitosamente. ${email} es el nuevo ADMIN.`);
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Desconectado de MongoDB.');
  }
}

makeAdmin();
