// button to start XR experience
let xrButton = document.getElementById('xr-button');

// to control the xr session
let xrSession = null;

// reference space used within an application
let xrRefSpace = null;

// Canvas OpenGL context used for rendering
let gl = null;

// Make sure WebXR is working as intended
function checkXRStatus() {
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

  // Update the XR start button depending on the browser status
  function updateXRButton(supported) {
    if (supported) {
        xrButton.innerHTML = 'Start AR';
        xrButton.addEventListener('clicked', onXRButtonClicked);
      } else {
        xrButton.innerHTML = 'AR is not found';
      }
      xrButton.disabled = !supported;
  }

  // XR button click listener
  function onXRButtonClicked() {
    if (!xrSession) {
        navigator.xr.requestSession('immersive-ar', {
            optionalFeatures: ['dom-overlay'],
            requiredFeatures: ['local'],
            domOverlay: {root: document.getElementById('overlay')}
        }).then(onSessionStarted, onRequestSessionError);
    } else {
      xrSession.end();
    }
  }

  // XR session logic
  function onSessionStarted(session) {
    xrSession = session;
    xrButton.innerHTML = 'Exit AR';

    session.addEventListener('end', onSessionEnded);

    let canvas = document.createElement('canvas');
    gl = canvas.getContext('webgl', { xrCompatible: true });
    session.updateRenderState({ baseLayer: new XRWebGLLayer(session, gl) });
  
    session.requestReferenceSpace('local').then((refSpace) => {
      xrRefSpace = refSpace;
      session.requestAnimationFrame(onXRFrame);
    });
  
  }
  
  // Error on AR session
  function onRequestSessionError(ex) {
    document.getElementById('info').innerHTML = "AR session failed.";
  }

  // Session end logic
  function onSessionEnded(event) {
    xrSession = null;
    xrButton.innerHTML = 'Start AR';
    document.getElementById('info').innerHTML = '';
    gl = null;
  }

  // Session loop
  function onXRFrame(t, frame) {
    let session = frame.session;
    session.requestAnimationFrame(onXRFrame);
    let pose = frame.getViewerPose(xrRefSpace);
    if (!pose) {
      return;
    }
    const pos = pose.transform.position;
    info.innerHTML = `x:${pos.x.toFixed(2)} y:${pos.y.toFixed(2)} z:${pos.z.toFixed(2)}`;
  }

  checkXRStatus();