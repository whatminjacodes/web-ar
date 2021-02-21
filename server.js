var static = require('node-static');
const https = require('https');
const fs = require('fs');
const options = {
    // Needed for HTTPS certification, remember to generate before trying to run
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}
const file = new (static.Server)();
https.createServer(options, function (req, res) {
    req.addListener('end', function () {
        file.serve(req, res);
    }).resume();
}).listen(3000);