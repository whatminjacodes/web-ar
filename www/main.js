// General needed things
let xrSession = null;
let xrRefSpace = null;
let gl = null;

// Button for starting the camera and using XR
let enableXRButton = document.getElementById('enable-xr-button');

function checkXRStatus() {
    // Check for secure context, at least Chrome needs this for testing WebXR
    if (!window.isSecureContext) {
      document.getElementById("warning").innerText = "Secure context needed for WebXR.";
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

  // Update the enable XR button depending on the browser status
  function updateXRButton(supported) {
    if (supported) {
        enableXRButton.innerHTML = 'Start AR';
        enableXRButton.addEventListener('clicked', onXRButtonClicked);
      } else {
        enableXRButton.innerHTML = 'AR is not available';
      }
      enableXRButton.disabled = !supported;
  }

  // Enable XR button click listener
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
    enableXRButton.innerHTML = 'Exit AR';

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
    enableXRButton.innerHTML = 'Start AR';
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
  }

  checkXRStatus();