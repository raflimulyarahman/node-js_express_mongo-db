import express, {} from 'express';
import expressLayouts from 'express-ejs-layouts';
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');
app.get('/', (req, res) => {
    const mahasiswa = [
        {
            nama: 'Sandhika Galih',
            email: 'sandhika@gmail.com',
        },
        {
            nama: 'Doddy Ferdiansyah',
            email: 'doddy@gmail.com',
        },
        {
            nama: 'Erik',
            email: 'erik@gmail.com',
        },
    ];
    res.render('index', {
        nama: 'Rafli',
        title: 'Halaman Index',
        mahasiswa,
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
    });
});
app.use((req, res) => {
    res.status(404).send('<h1>404</h1>');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
// import http from 'node:http';
// import fs from 'node:fs'
// const PORT = 3000;
// http.createServer((req, res) => {
//     res.writeHead(200, {
//         'Content-Type': 'text/html'
//     })
//     const renderHTML = (path, res) => {
//         fs.readFile(path, (err, data) => {
//             if(err){
//                 res.writeHead(404);
//                 res.write('Error: File Not Found')
//             } else {
//                 res.write(data)
//             }
//             res.end()
//         })
//     }
//     const url = req.url;
//     switch(url){
//         case '/about':
//             renderHTML('./about.html', res)
//             break;
//         case '/contact':
//             renderHTML('./contact.html', res)
//             break;
//         default:
//             renderHTML('./index.html', res)
//     }
//     // if(url === '/about') {
//     //     renderHTML('./about.html', res)
//     // } else if(url === '/contact') {
//     //     renderHTML('./contact.html', res)
//     // } else {
//     //     renderHTML('./index.html', res)
//     // }
// }).listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}/`)
// })
//# sourceMappingURL=app.js.map