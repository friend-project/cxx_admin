// const host = 'mongodb://127.0.0.1';
// const host = 'mongodb://172.25.47.50';
// const host = 'mongodb://172.24.138.198';

const stat = {};
stat.db = 'error_free',
stat.port = '27017';

if (process.env.NODE_ENV === 'development') {
  stat.host = '10.13.75.23';
  stat.username = '';
  stat.password = '';
} else {
  stat.host = '172.24.138.198';
  stat.username = 'error_free';
  stat.password = 'Jd98g2uk7Xyk';
}

export default stat;

