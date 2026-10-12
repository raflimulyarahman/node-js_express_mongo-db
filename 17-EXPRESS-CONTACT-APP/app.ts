import express, { type Express, type NextFunction, type Request, type Response } from 'express';
import expressLayouts from 'express-ejs-layouts';

const app: Express = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');
app.use(express.static('public'))

interface Mahasiswa {
  nama: string;
  email: string;
}

const mahasiswa: Mahasiswa[] = [
  { nama: 'Sandhika Galih', email: 'sandhika@gmail.com' },
  { nama: 'Doddy Ferdiansyah', email: 'doddy@gmail.com' },
  { nama: 'Erik', email: 'erik@gmail.com' },
];

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

app.get('/contact', (req: Request, res: Response) => {
  res.render('contact', {
    title: 'Halaman Contact',
    mahasiswa,
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).send('<h1>404</h1>');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
