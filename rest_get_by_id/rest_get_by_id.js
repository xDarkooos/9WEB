const http = require('http');
const fs = require('fs');

const port = process.argv[2] || 3000;

const server = http.createServer((req, res) => {

    // перевіряємо, що це GET і шлях починається з /items/
    if (req.method === 'GET' && req.url.startsWith('/items/')) {

        // дістаємо id з URL
        const parts = req.url.split('/');
        const id = parseInt(parts[2], 10);

        // якщо id не число
        if (isNaN(id)) {
            res.writeHead(404);
            return res.end();
        }

        fs.readFile('data.json', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'File read error' }));
            }

            try {
                const items = JSON.parse(data);

                // шукаємо елемент
                const item = items.find(i => i.id === id);

                if (!item) {
                    res.writeHead(404);
                    return res.end();
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(item));

            } catch (e) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });

    } else {
        res.writeHead(404);
        res.end();
    }

});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});