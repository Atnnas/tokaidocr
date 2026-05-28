const mongoose = require('mongoose');

// MONGODB URI pointing to the tokaidocr database
const MONGODB_URI = "mongodb://davidartaviarodriguez_db_user:UYUNlKLuR1rSoTsu@ac-cxc8kvq-shard-00-00.jodngjz.mongodb.net:27017,ac-cxc8kvq-shard-00-01.jodngjz.mongodb.net:27017,ac-cxc8kvq-shard-00-02.jodngjz.mongodb.net:27017/tokaidocr?authSource=admin&replicaSet=atlas-p0tcts-shard-0&ssl=true&retryWrites=true&w=majority";

async function main() {
  console.log('Conectando a MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('Conexión exitosa a la base de datos "tokaidocr"!');

  // Define Schema matching the main application User model
  const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: String,
    image: String
  }, { 
    collection: 'Users',
    timestamps: true 
  });

  const User = mongoose.models.User || mongoose.model('User', UserSchema);

  console.log('Verificando/Creando usuario inicial de prueba...');
  const testUser = await User.findOneAndUpdate(
    { email: 'test@tokaidocr.com' },
    { 
      name: 'Usuario de Prueba Tokaido',
      role: 'admin',
      image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865'
    },
    { upsert: true, new: true }
  );

  console.log('Usuario creado exitosamente:');
  console.log(testUser);
  
  await mongoose.connection.close();
  console.log('\nConexión cerrada.');
  console.log('¡Listo! Ya deberías ver la base de datos "tokaidocr" con su colección "Users" en MongoDB Compass.');
}

main().catch(err => {
  console.error('Error durante la inserción:', err);
  process.exit(1);
});
