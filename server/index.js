const http = require('http');
const url = require('url');
const config = require('./config');
const handler = require('./handler');

const handleRequest = (req, res)  => {
    const router = url.parse(req.url).pathname.substring(1);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (!~['log', 'get-report'].indexOf(router)) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hey dude...');
        return;
    }

    res.writeHead(200, {'Content-Type': 'application/json'});

    if ('log' === router) {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            const info = Buffer.concat(body).toString();
            handler.log(info);
            res.end();
        });
    }

    if ('get-report' === router) {
        const report = handler.report();
        res.end(JSON.stringify(report));
    }

};

const server = http.createServer();
server.addListener('request', handleRequest);
server.listen(config.PORT);