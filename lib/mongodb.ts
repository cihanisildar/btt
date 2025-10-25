import mongoose from 'mongoose';

// MongoDB Atlas bağlantı bilgileri - Bu bilgileri kendi MongoDB Atlas hesabınızdan alın
// 1. MongoDB Atlas'a giriş yapın: https://cloud.mongodb.com/
// 2. Yeni bir cluster oluşturun veya mevcut cluster'ı kullanın
// 3. Database Access bölümünden yeni bir kullanıcı oluşturun
// 4. Network Access bölümünden IP adresinizi ekleyin (0.0.0.0/0 tüm IP'ler için)
// 5. Cluster'ınıza bağlanmak için connection string'i alın
// 6. Aşağıdaki MONGODB_URI'yi kendi connection string'inizle değiştirin

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Helpful guard: if the developer forgot to replace the placeholder in env files
// the DNS SRV lookup will fail with errors like: querySrv EBADNAME _mongodb._tcp.<cluster-url>
if (MONGODB_URI.includes('<') || MONGODB_URI.includes('>') || MONGODB_URI.includes('cluster-url')) {
  throw new Error(
    'MONGODB_URI appears to still contain placeholder values.\n' +
    'Please set a valid MongoDB Atlas connection string in your .env.local (remove angle brackets).\n' +
    "Example: mongodb+srv://<username>:<password>@cluster0.abcd.mongodb.net/myDatabase?retryWrites=true&w=majority"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
