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
export const loadContact = async () => {
  const file = await fs.readFile(DATA_PATH, 'utf-8');
  const contacts = JSON.parse(file);
  return contacts;
}

//Cari contact berdasarkan nama
export const findContact = async (nama: string) => {
  const contacts = await loadContact();
  return contacts.find((contact: { nama: string; }) => contact.nama.toLowerCase() === nama.toLowerCase());
}