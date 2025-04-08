const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3000;

const server = http.createServer((req, res) => {
    const filePath = req.url === '/' ? 'index.html' : req.url;
    
    fs.readFile(path.join(__dirname, filePath), (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end('404 Not Found');
            return;
        }
        
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(content);
    });
});

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
