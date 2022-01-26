// valida si es una petición desde la API
function isAPIRequest(req) {
  return req.originalUrl.startsWith('/apiv1/');
}

// carga la foto en URL
function getUrlPhotos(req, photo) {
    return `http://${req.get('host')}/images/ads/${photo}`;
}

module.exports = {
  isAPIRequest,
  getUrlPhotos
}