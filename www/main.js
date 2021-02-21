// button to start XR experience
let xrButton = document.getElementById('xr-button');

// to control the xr session
let xrSession = null;

// reference space used within an application
let xrRefSpace = null;

// Canvas OpenGL context used for rendering
let gl = null;

// Make sure WebXR is working as intended
function checkXR() {
    // Check if secure context is available
    if (!window.isSecureContext) {
      document.getElementById("warning").innerText = "Secure context needed.";
    }
    // Check if WebXR is supported
    if (navigator.xr) {
      navigator.xr.addEventListener('devicechange', checkXRSupportState);
      checkXRSupportState();
    } else {
      document.getElementById("warning").innerText = "WebXR is not supported by this browser.";
    }
  }

  // Check if browser supports WebXR and update the button
  function checkXRSupportState() {
    navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
     updateXRButton(supported);
    });
  }

  function updateXRButton(supported) {
    if (supported) {
        xrButton.innerHTML = 'Start AR';
        xrButton.addEventListener('clicked', onButtonClicked);
      } else {
        xrButton.innerHTML = 'AR is not found';
      }
      xrButton.disabled = !supported;
  }