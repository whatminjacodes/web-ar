/*
 *      Basic local server for testing WebAR
 */
var static = require('node-static');

const fs = require('fs');
const https = require('https');

const options = {
    // Needed for HTTPS certification, remember to generate these!
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}

const file = new (static.Server)();

https.createServer(options, function (req, res) {
    req.addListener('end', function () {
        file.serve(req, res);
    }).resume();
}).listen(3000);