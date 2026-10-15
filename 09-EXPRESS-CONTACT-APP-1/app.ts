import express, { type Express, type NextFunction, type Request, type Response } from 'express';
import expressLayouts from 'express-ejs-layouts';
import { loadContact, findContact } from './utils/contacts.ts';

const app: Express = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');
app.use(express.static('public'))

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
  const contacts = await loadContact();
  res.render('contact', {
    title: 'Halaman Contact',
    contacts,
  });
});

app.get('/contact/:nama', async (req: Request, res: Response) => {
  // req.params.nama bertipe: string | string[] | undefined
  const namaParam = req.params.nama;

  // Normalisasi: kalo bentuknya array, ambil elemen pertama [0] biar jadi string
  // Kalo bukan array, pakai langsung (string atau undefined)
  const nama = Array.isArray(namaParam) ? namaParam[0] : namaParam;

  // Guard: pastikan nama ada & valid (bukan undefined/kosong) sebelum dipakai findContact()
  if (!nama) {
    return res.status(404).send('<h1>404</h1>');
  }

  const contact = await findContact(nama);
  res.render('detail', {
    title: 'Halaman Detail Contact',
    contact,
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).send('<h1>404</h1>');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
