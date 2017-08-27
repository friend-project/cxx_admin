const domain = {};

if (process.env.NODE_ENV === 'development') {
  domain.web = 'http://0.0.0.0:9522';
  domain.static = 'http://0.0.0.0:9522';
} else {
  domain.web = 'http://admin.cxx.loseyear.com';
  domain.static = 'http://admin.cxx.loseyear.com';
}

export default domain;

