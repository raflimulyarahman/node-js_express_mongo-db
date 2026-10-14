import express, {} from 'express';
import expressLayouts from 'express-ejs-layouts';
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');
app.use(express.static('public'));
const mahasiswa = [
    { nama: 'Sandhika Galih', email: 'sandhika@gmail.com' },
    { nama: 'Doddy Ferdiansyah', email: 'doddy@gmail.com' },
    { nama: 'Erik', email: 'erik@gmail.com' },
];
app.get('/', (req, res) => {
    res.render('index', {
        nama: 'Rafli',
        title: 'Halaman Index',
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Halaman About',
    });
});
app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Halaman Contact',
        mahasiswa,
    });
});
app.use((req, res) => {
    res.status(404).send('<h1>404</h1>');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=app.js.map