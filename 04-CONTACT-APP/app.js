import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { simpanContact, listContact, detailContact, deleteContact } from './contact.js';

// Menggunakan yargs untuk membuat command line interface
yargs(hideBin(process.argv))
  .command({
    command: 'add',
    describe: 'Menambahkan kontak baru',
    builder: {
      nama: {
        describe: 'Nama lengkap',
        demandOption: true,
        type: 'string',
      },
      email: {
        describe: 'Email',
        demandOption: false,
        type: 'string',
      },
      noHp: {
        describe: 'Nomor HP',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      simpanContact(argv.nama, argv.email, argv.noHp);
    },
  })
  // Menampilkan daftar semua nama & no HP contact.
  .command({
    command: 'list',
    describe: 'Menampilkan daftar semua kontak',
    handler() {
      listContact();
    },
  })

  //Menampilkan detail kontak berdasarkan nama
  .command({
    command: 'detail',
    describe: 'Menampilkan detail kontak berdasarkan nama',
    builder: {
      nama: {
        describe: 'Nama lengkap',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      detailContact(argv.nama);
    }
  })

  // Menghapus kontak berdasarkan nama
  .command({
    command: 'delete',
    describe: 'Menghapus kontak berdasarkan nama',
    builder: {
      nama: {
        describe: 'Nama lengkap',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      deleteContact(argv.nama);
    }
  })
  .demandCommand()
  .parse();





// import { tulisPertanyaan, simpanContact } from './contact.js';

// const nama = await tulisPertanyaan('Masukkan nama anda: ');
// const noHp = await tulisPertanyaan('Masukkan nomor hp anda: ');
// const email = await tulisPertanyaan('Masukkan email anda: ');

// await simpanContact(nama, noHp, email);

