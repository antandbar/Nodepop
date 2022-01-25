function isAPIRequest(req) {
  return req.originalUrl.startsWith('/apiv1/');
}

function getUrlPhotos(req, photo) {
    return `http://${req.get('host')}/images/ads/${photo}`;
}

module.exports = {
  isAPIRequest,
  getUrlPhotos
}