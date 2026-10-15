import express, { type Request, type Response } from 'express';
import expressLayouts from 'express-ejs-layouts'
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import session from 'express-session';
import { body, validationResult, check } from 'express-validator';
import methodOverride from 'method-override';

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

//Setup method override (baca _method dari body form)
app.use(methodOverride(function (req, _res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method as string;
    delete req.body._method;
    return method;
  }
  return '';
}));

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

//Halaman form tambah data kontak
app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    title: 'Halaman Tambah Contact',
  });
});

//Proses tambah data kontak
app.post('/contact', [
  body('nama').custom(async (value) => {
    const duplikat = await Contact.findOne({nama: value});
    if (duplikat) {
      throw new Error('Nama udah ada yang punya, mundur pelan-pelan!');
    }
    return true;
  }),
  check('email', 'Email isi yang bener!').isEmail(),
  check('noHp', 'Ngisi nomor hp aja ngga bisa, apalagi ngisi hati dia :v').isMobilePhone('id-ID'),
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('add-contact', {
      title: 'Halaman Tambah Contact',
      layout: 'layouts/main-layout',
      errors: errors.array(),
      oldInput: req.body,
    });
  } else {
    await Contact.create(req.body);
    req.flash('msg', 'Yes! Udah di save, jangan lupa chattan ya ^_^');
    res.redirect('/contact');
  }
});

//Halaman edit data kontak
app.get('/contact/edit/:nama', async (req, res) => {
  const nama = String(req.params.nama);
  const contact = await Contact.findOne({nama: nama});
  if (!contact) {
    return res.status(404).render('404', {
      title: 'Halaman Tidak Ditemukan',
    });
  }
  res.render('edit-contact', {
    title: 'Halaman Edit Contact',
    contact,
  });
});

//Proses update data kontak
app.post('/contact/update', [
  body('nama').custom(async (value, { req }) => {
    if (value.toLowerCase() === String(req.body.oldNama).toLowerCase()) return true;
    const duplikat = await Contact.findOne({nama: value});
    if (duplikat) {
      throw new Error('Nama udah ada yang punya, mundur pelan-pelan!');
    }
    return true;
  }),
  check('email', 'Email isi yang bener!').isEmail(),
  check('noHp', 'Ngisi nomor hp aja ngga bisa, apalagi ngisi hati dia :v').isMobilePhone('id-ID'),
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('edit-contact', {
      title: 'Halaman Edit Contact',
      contact: req.body,
      errors: errors.array(),
    });
  }
  await updateContact(req.body);
  req.flash('msg', 'Data kontak berhasil diubah!');
  res.redirect('/contact');
});

// Routing hapus data kontak
app.delete('/contact/delete/:nama', async (req, res) => {
  const nama = String(req.params.nama);
  const contact = await Contact.findOne({ nama: nama });
  if (!contact) {
    return res.status(404).render('404', {
      title: 'Halaman Tidak Ditemukan',
    });
  }
  await Contact.deleteOne({ _id: contact._id });
  req.flash('msg', 'Yes! Data berhasil dihapus, jangan lupa move on ya! ^_^');
  res.redirect('/contact');
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