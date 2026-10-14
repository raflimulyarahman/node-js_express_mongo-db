// Core Module
// File System
// const { error } = require("console");
import fs from 'node:fs/promises'; // ES6

// // menuliskan string ke file (synchronous)
// try {
//     fs.writeFileSync("data/test.txt", "Hello World! -secara synchronous-");
// } catch (error) {
//     console.log(error);
// }

// // menuliskan string ke file (asynchronous)
// fs.writeFile("data/test.txt", "Hello World! -secara asynchronous-", (error) => {
//     console.log(error)
// });

// // membaca isi file (synchronous)
// const data = fs.readFileSync("data/test.txt", "utf-8");
// console.log(data);

// // membaca isi file (asynchronous)
// fs.readFile("data/test.txt", "utf-8", (error, data) => {
//     if (error) throw error;
//     console.log(data)
// });

// // REAADLINE
import * as readline from 'node:readline/promises'; // ES6
import { stdin as input, stdout as output } from 'node:process';

await fs.mkdir('data', { recursive: true });
// Buat file contacts.json dengan isi '[]' jika belum ada
try {
    await fs.readFile('data/contacts.json');
} catch {
    await fs.writeFile('data/contacts.json', '[]'); 
}

const rl = readline.createInterface({ input, output });

const nama = await rl.question('Masukkan nama anda: ');
const noHp = await rl.question('Masukkan nomor hp anda: ');

const contact = { nama, noHp };

//Baca File
const file = await fs.readFile('data/contacts.json', 'utf-8');
const contacts = JSON.parse(file);

//Tambah data baru
contacts.push(contact);

//Simpan kembali
await fs.writeFile('data/contacts.json', JSON.stringify(contacts, null, 2));
console.log('Data berhasil disimpan');
rl.close();
// fs.writeFile('data/contacts.json', JSON.stringify(contact), (err) => {
//     if (err) throw err;
//     console.log('Data berhasil disimpan');
//     rl.close();
// });