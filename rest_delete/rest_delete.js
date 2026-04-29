const http = require('http');
const fs = require('fs');

const port = process.argv[2] || 3000;

const server = http.createServer((req, res) => {

    if (req.method === 'DELETE' && req.url.startsWith('/items/')) {

        const parts = req.url.split('/');
        const id = parseInt(parts[2], 10);

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

                const index = items.findIndex(i => i.id === id);

                if (index === -1) {
                    res.writeHead(404);
                    return res.end();
                }

                // видаляємо елемент
                items.splice(index, 1);

                fs.writeFile('data.json', JSON.stringify(items, null, 2), err => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        return res.end(JSON.stringify({ error: 'File write error' }));
                    }

                    // успішно
                    res.writeHead(200);
                    res.end();
                });

            } catch (e) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON in file' }));
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