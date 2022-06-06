// default development
const CONFIG = {
  ENVIRONMENT: 'DEVELOPMENT',
  ENDPOINT: 'localhost',
};

switch (process.env.REACT_APP_ENV) {
  case 'test': {
    CONFIG.ENVIRONMENT = 'TEST';
    CONFIG.ENDPOINT = 'https://0.0.0.0';
    break;
  }
  case 'production': {
    CONFIG.ENVIRONMENT = 'PRODUCTION';
    CONFIG.ENDPOINT = 'https://1.1.1.1';
    break;
  }
  default: {
    CONFIG.ENVIRONMENT = 'DEVELOPMENT';
    CONFIG.ENDPOINT = 'https://localhost:9100';
  }
}

export default CONFIG;
