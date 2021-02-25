# web-ar
An example of how to create AR for web and how to test it (locally)

## What's needed
- Mobile device that supports AR (I'm using OnePlus 7T Pro)
- Google Chrome 81+ on Android and Mozilla WebXR Viewer on iOS (I'm using Google Chrome 88)
- Text editor/IDE (I use Visual Studio Code)
- Node.js (and NPM) and OpenSSL (for creating the locally working server and HTTPS protocol)

## How it works
- www/index.html has the very basic website functionality
- www/css/style.css has the basic stylesheet
- main.js has the JavaScript functionality
- server.js is the local Node.js server
- cert.pem and key.pem files create the needed HTTPS protocol

### Local server
WebXR scripts must have HTTPS protocol so for example Node.js server is needed for local testing. I used OpenSSL for creating the needed HTTPS certificates.

For generating certificate and key:
`openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365`

Install dependencies with:
`npm init -y && npm install node-static --save-dev`

Start the server with:
`npm start`

### Disclaimer
I'm in no way website development/Node.js expert. This was my first time doing this and these steps helped me to setup this project. I researched what is needed to be done to get the MVP working and you should probably also do some research if you want to try these out and are not familiar with either. This project is definitely not build using best practises/ther important guidelines.

Maybe this project will give the basic idea to someone wanting to try out WebXR :)
