const domain = {};

if (process.env.NODE_ENV === 'development') {
  domain.web = 'http://0.0.0.0:9522';
  domain.static = 'http://0.0.0.0:9522';
  domain.img = 'http://0.0.0.0:9522/map/';

} else {
  domain.web = 'http://admin.guwenming.org';
  domain.static = 'http://admin.guwenming.org';
  domain.img = 'http://admin.guwenming.org/map/';
}

export default domain;

