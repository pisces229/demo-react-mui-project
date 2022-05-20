// default development
const CONFIG = {
  ENVIRONMENT: 'DEVELOPMENT',
  ENDPOINT: 'localhost',
};

switch (process.env.REACT_APP_ENV) {
  case 'test': {
    CONFIG.ENVIRONMENT = 'TEST';
    CONFIG.ENDPOINT = '127.0.0.1';
    break;
  }
  case 'production': {
    CONFIG.ENVIRONMENT = 'PRODUCTION';
    CONFIG.ENDPOINT = '192.168.0.1';
    break;
  }
}

export default CONFIG;
