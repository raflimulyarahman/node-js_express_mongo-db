import express, { type Express, type Request, type Response } from 'express';

const app: Express = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  // res.send('Hello World!');
  res.sendFile('/index.html', {root: __dirname})
});

app.get('/about', (req: Request, res: Response) => {
  // res.send('Ini Adalah Halaman About');
    res.sendFile('/about.html', {root: __dirname})

});

app.get('/contact', (req: Request, res: Response) => {
  // res.send('Ini Adalah Halaman Contact');
    res.sendFile('/contact.html', {root: __dirname})

});

app.use('/', (req, res) => {
  res.status(404);
  res.send('<h1>404</h1>')
})

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