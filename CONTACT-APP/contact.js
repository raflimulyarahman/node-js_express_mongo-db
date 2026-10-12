import fs from 'node:fs/promises';
import chalk from 'chalk';
import validator from 'validator';

const DIR_PATH = './data';
const DATA_PATH = `${DIR_PATH}/contacts.json`;

// Pastikan folder data dan file contacts.json tersedia
await fs.mkdir(DIR_PATH, { recursive: true });
try {
  await fs.readFile(DATA_PATH);
} catch {
  await fs.writeFile(DATA_PATH, '[]', 'utf-8');
}


// Membaca file contacts.json
const loadContact = async () => {
  const file = await fs.readFile(DATA_PATH, 'utf-8');
  const contacts = JSON.parse(file);
  return contacts;
}

// Fungsi untuk menyimpan kontak ke file JSON
export const simpanContact = async (nama, email, noHp) => {
  try {
    const contact = { nama, email, noHp };
    const contacts = await loadContact();

    //Cek duplikat
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if (duplikat) {
      console.log(chalk.red.inverse.bold(`Kontak ${nama} sudah terdaftar, gunakan nama lain!`));
      return;
    }

    //Cek validasi email
    if (email) {
      if (!validator.isEmail(email)) {
        console.log(chalk.red.inverse.bold(`Email ${email} tidak valid!`));
        return;
      }
    }

    //Cek validasi noHp
    if (noHp) {
      if (!validator.isMobilePhone(noHp, 'id-ID')) {
        console.log(chalk.red.inverse.bold(`Nomor HP ${noHp} tidak valid!`));
        return;
      }
    }

    contacts.push(contact);

    await fs.writeFile(DATA_PATH, JSON.stringify(contacts, null, 2));
    console.log(chalk.green.inverse.bold('Terima kasih, data berhasil disimpan!'));
  } catch (error) {
    console.error('Error:', error);
  }
};

// Fungsi untuk menampilkan daftar semua nama & no HP contact.
export const listContact = async () => {
  const contacts = await loadContact();
  if (!contacts) {
    console.log(chalk.red.inverse.bold('Tidak ada data!'));
    return;
  }
  console.log(chalk.cyan.inverse.bold('Daftar Kontak:'));
  contacts.forEach((contact, i) => {
    console.log('---');
    console.log(chalk.blueBright(`No: ${i + 1}`));
    console.log(chalk.white(`Nama: ${contact.nama}`));
    console.log(chalk.white(`Nomor HP: ${contact.noHp}`));

  })
  console.log('---');
}

// Fungsi untuk menampilkan detail kontak berdasarkan nama
export const detailContact = async (nama) => {
  const contacts = await loadContact();
  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
  if (!contact) {
    console.log(chalk.red.inverse.bold(`Kontak ${nama} tidak ditemukan!`));
    return;
  } else {
    console.log(chalk.cyan.inverse.bold('Detail Kontak:'));
    console.log(chalk.blueBright(`Nama: ${contact.nama}`));
    console.log(chalk.white(`Nomor HP: ${contact.noHp}`));
    console.log(chalk.white(`Email: ${contact.email}`));
  }
}

// Fungsi untuk menghapus kontak berdasarkan nama
export const deleteContact = async (nama) => {
  const contacts = await loadContact();
  const newContact = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());
  if (contacts.length === newContact.length) {
    console.log(chalk.red.inverse.bold(`Kontak ${nama} tidak ditemukan!`));
    return;
  }

  await fs.writeFile(DATA_PATH, JSON.stringify(newContact, null, 2));
  console.log(chalk.green.inverse.bold('Kontak berhasil dihapus!'));
}

