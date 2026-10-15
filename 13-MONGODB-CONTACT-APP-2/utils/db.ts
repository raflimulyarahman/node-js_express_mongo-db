import 'dotenv/config';
import mongoose from 'mongoose';
import { Schema, model, Types, connect} from 'mongoose'

// 1. Ambil URI dari .env
const MONGODB_URI = process.env.MONGODB_URI;

// 2. Validasi: Paksa TypeScript tau bahwa ini PASTI string, atau crash di awal kalau lupa isi .env
if (!MONGODB_URI) {
  throw new Error('❌ MONGODB_URI tidak ditemukan di file .env!');
}

export const connectDB = async () => {
  try {
    // 3. Connect dengan opsi tambahan biar lebih stabil di cloud
    await mongoose.connect(MONGODB_URI, {
      // Mencegah aplikasi hang selamanya kalau network lag
      serverSelectionTimeoutMS: 10000, // Maksimal 10 detik buat nyari server
      socketTimeoutMS: 45000,          // Maksimal 45 detik per operasi
      connectTimeoutMS: 10000,         // Maksimal 10 detik buat establish koneksi
    });

    console.log('✅ Berhasil terhubung ke MongoDB Atlas via Mongoose');
  } catch (error) {
    console.error('❌ Gagal terhubung ke MongoDB:', error);
    // Opsional: process.exit(1) kalau mau aplikasi mati total saat DB gagal connect
    process.exit(1); 
  }
};

// 4. Event Listener buat monitoring koneksi (Sangat berguna buat debug)
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ Mongoose terputus dari MongoDB. Mencoba reconnect...');
});

mongoose.connection.on('reconnected', () => {
  console.log('🔄 Mongoose berhasil reconnect ke MongoDB!');
});



// // Menambah data
// const contact1 = new Contact({
//     nama: 'Rafli',
//     noHp: '08123456789',
//     email: 'mulya@gmail.com'
// })

// // Menyimpan ke database setelah koneksi benar-benar berhasil
// const saveContact = async () => {
//   try {
//     await connectDB();
//     const contact = await contact1.save();
//     console.log('Data berhasil disimpan:', contact);
//   } catch (error) {
//     console.error('Data gagal disimpan:', error);
//   } finally {
//     await mongoose.disconnect();
//   }
// };

// await saveContact();

//Koneksi database
connectDB().catch((err) => {
  console.error("Gagal connect ke DB:", err);
  process.exit(1); // Keluar paksa kalau DB gagal
});
