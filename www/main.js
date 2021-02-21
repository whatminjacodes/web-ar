// button to start XR experience
let xrButton = document.getElementById('xr-button');
xrButton.innerHTML = 'Enter AR';

// to control the xr session
let xrSession = null;

// reference space used within an application
let xrRefSpace = null;

// Canvas OpenGL context used for rendering
let gl = null;