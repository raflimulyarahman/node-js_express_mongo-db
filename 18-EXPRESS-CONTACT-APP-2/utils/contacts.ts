import fs from 'node:fs/promises';

const DIR_PATH = './data';
const DATA_PATH = `${DIR_PATH}/contacts.json`;

// Pastikan folder data dan file contacts.json tersedia
await fs.mkdir(DIR_PATH, { recursive: true });
try {
  await fs.readFile(DATA_PATH);
} catch {
  await fs.writeFile(DATA_PATH, '[]', 'utf-8');
}


//Ambil semua data di contacts.json
export const loadContacts = async (): Promise<any[]> => {
  const file = await fs.readFile(DATA_PATH, 'utf-8');
  const contacts = JSON.parse(file);
  return contacts;
}

//Cari contact berdasarkan nama
export const findContact = async (nama: string) => {
  const contacts = await loadContacts();
  return contacts.find((contact: { nama: string; }) => contact.nama.toLowerCase() === nama.toLowerCase());
}

//Menuliskan / menimpa file contacts json dengan data yang baru 
const saveContacts = async (contacts: any) => {
  fs.writeFile(DATA_PATH, JSON.stringify(contacts));
}

//Menambahkan data contact baru 
export const addContact = async (contact: any) => {
  const contacts = await loadContacts();
  contact.nama = contact.nama.replace(/\b\w/g, (c: any) => c.toUpperCase()).trim();
  contacts.push(contact);
  await saveContacts(contacts);
}

//Cek nama yang duplikat
export const cekDuplikat = async (nama: string) => {
  const contacts = await loadContacts();
  return contacts.some((contact: { nama: string; }) => contact.nama.toLowerCase() === nama.toLowerCase());
}