import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import session from 'express-session';

import './utils/db';
import {Contact} from './models/contact'

const app = express()
const port = 3000

//Setup EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//Konfigurasi flash & session
app.use(cookieParser('secret'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));
app.use(flash());

//Halaman home
app.get('/', (req, res) => {
  res.render('index', {
    nama: 'Rafli',
    title: 'Halaman Index',
  });
});

//Halaman about
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Halaman About',
  });
});

//Halaman kontak
app.get('/contact', async (req, res) => {
    
    // Contact.find()
    //     .then((contacts)=> {
    //         res.send(contacts);
    //     })
    //     .catch((err)=> {
    //         res.status(500).send(err);
    //     });

    try {
      const contacts = await Contact.find();
      res.render('contact', {
        title: 'Halaman Contact',
        contacts,
        msg: req.flash('msg')
      });
    } catch (error) {
      res.status(500).send({ message: 'Gagal mengambil data kontak', error });
    }
});

// Halaman detail kontak
app.get('/contact/:nama', async (req, res) => {
  const rawNama = req.params.nama;

  // Normalisasi jika bentuknya array
  const nama = Array.isArray(rawNama) ? rawNama[0] : rawNama;

  // Guard jika tidak ada
  if (!nama) {
    return res.status(404).render('404', {
      title: 'Halaman Tidak Ditemukan',
    });
  }

  // Sekarang 'contact' hanya dideklarasikan sekali untuk menampung data hasil database
//   const contact = await findContact(nama);
  const contact = await Contact.findOne({nama: nama});
  res.render('detail', {
    title: 'Halaman Detail Contact',
    contact,
  });
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})