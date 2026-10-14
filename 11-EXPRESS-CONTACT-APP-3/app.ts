import express, { type Express, type NextFunction, type Request, type Response } from 'express';
import expressLayouts from 'express-ejs-layouts';
import { loadContacts, findContact, addContact, cekDuplikat, updateContact, deleteContact } from './utils/contacts.ts';
import { body, validationResult, check } from 'express-validator'; // Untuk validasi
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import session from 'express-session';

const app: Express = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser('secret'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));
app.use(flash());

app.get('/', (req: Request, res: Response) => {
  res.render('index', {
    nama: 'Rafli',
    title: 'Halaman Index',
  });
});

app.get('/about', (req: Request, res: Response) => {
  res.render('about', {
    title: 'Halaman About',
  });
});

app.get('/contact', async (req: Request, res: Response) => {
  const contacts = await loadContacts();
  res.render('contact', {
    title: 'Halaman Contact',
    contacts,
    msg: req.flash('msg')
  });
});

app.get('/contact/add', (req: Request, res: Response) => {
  res.render('add-contact', {
    title: 'Halaman Tambah Contact',
    layout: 'layouts/main-layout',
  });
});

app.post('/contact', [
  body('nama').custom(async (value) => {
    const duplikat = await cekDuplikat(value);
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
    req.flash('msg', 'Yes! Udah di save, jangan lupa chattan ya ^_^');
    await addContact(req.body);
    res.redirect('/contact');
  }


});

app.get('/contact/edit/:nama', async (req: Request, res: Response) => {
  const nama = String(req.params.nama);
  const contact = await findContact(nama);
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

app.post('/contact/update', [
  body('nama').custom(async (value, { req }) => {
    if (value.toLowerCase() === String(req.body.oldNama).toLowerCase()) return true;
    const duplikat = await cekDuplikat(value);
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

app.post('/contact/delete/:nama', async (req: Request, res: Response) => {
  const nama = String(req.params.nama);
  const contact = await findContact(nama);
  if (!contact) {
    return res.status(404).render('404', {
      title: 'Halaman Tidak Ditemukan',
    });
  }
  await deleteContact(nama);
  req.flash('msg', 'Yes! Data berhasil dihapus, jangan lupa move on ya! ^_^');
  res.redirect('/contact');
});

app.get('/contact/:nama', async (req: Request, res: Response) => {
  // req.params.nama bertipe: string | string[] | undefined
  const namaParam = req.params.nama;

  // Normalisasi: kalo bentuknya array, ambil elemen pertama [0] biar jadi string
  // Kalo bukan array, pakai langsung (string atau undefined)
  const nama = Array.isArray(namaParam) ? namaParam[0] : namaParam;

  // Guard: pastikan nama ada & valid (bukan undefined/kosong) sebelum dipakai findContact()
  if (!nama) {
    return res.status(404).render('404', {
      title: 'Halaman Tidak Ditemukan',
    });
  }

  const contact = await findContact(nama);
  res.render('detail', {
    title: 'Halaman Detail Contact',
    contact,
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).render('404', {
    title: 'Halaman Tidak Ditemukan',
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
