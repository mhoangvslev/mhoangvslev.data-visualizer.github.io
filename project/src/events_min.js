function onDocumentMouseMove(a){mouse.x=a.clientX/window.innerWidth*2-1;mouse.y=2*-(a.clientY/window.innerHeight)+1}function onDocumentLMB(){isLMB||(isLMB=!0)}function onDocumentMouseReset(){isLMB=isRMB=!1}function onDocumentMouseWheel(a){isInPerspectiveMode||(0>a.wheelDelta&&1.5<zoomAmount-.02*zoomFactor?zoomAmount-=.02*zoomFactor:0<a.wheelDelta&&(zoomAmount+=.02*zoomFactor),camera.setZoom(zoomAmount),camera.updateProjectionMatrix())}
function onWindowResize(){camera.aspect=window.innerWidth/window.innerHeight;camera.updateProjectionMatrix();WebGLRenderer.setSize(window.innerWidth,window.innerHeight);cssRenderer.setSize(window.innerWidth,window.innerHeight)};