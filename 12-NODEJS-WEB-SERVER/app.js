import http from 'node:http';
import fs from 'node:fs'

const PORT = 3000;

http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    })

    const renderHTML = (path, res) => {
        fs.readFile(path, (err, data) => {
            if(err){
                res.writeHead(404);
                res.write('Error: File Not Found')
            } else {
                res.write(data)
            }
            res.end()
        })
    }

    const url = req.url;
    switch(url){
        case '/about':
            renderHTML('./about.html', res)
            break;
        case '/contact':
            renderHTML('./contact.html', res)
            break;
        default:
            renderHTML('./index.html', res)
    }
    // if(url === '/about') {
    //     renderHTML('./about.html', res)
    // } else if(url === '/contact') {
    //     renderHTML('./contact.html', res)
    // } else {
    //     renderHTML('./index.html', res)
    // }
}).listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`)
})