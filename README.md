# web-ar
An example of how to create AR for web and how to test it (locally)

## What's needed
- mobile device that supports AR (I'm using OnePlus 7T Pro)
- Google Chrome 81+ on Android and Mozilla WebXR Viewer on iOS (I have Google Chrome 88)
- text editor/IDE (I use Visual Studio Code)
- nodjs (and npm) and openssl

## How it works
- www/index.html has the website functionality
- www/css/style.css has the stylesheet
- main.js has the JavaScript functionality
- server.js is the local nodejs server
- cert.pem and key.pem files create the needed HTTPS protocol.

### Local server
WebXR scripts must have HTTPS protocol so Node.js server is needed for local testing. I used OpenSSL.

Use openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 for generating certificate and key. Install dependencies by npm init -y && npm install node-static --save-dev. Start the server with npm start.
