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
    CONFIG.ENDPOINT = 'https://localhost:9110';
    //CONFIG.ENDPOINT = 'https://localhost:8443';
    break;
  }
  default: {
    CONFIG.ENVIRONMENT = 'DEVELOPMENT';
    CONFIG.ENDPOINT = 'https://localhost:9110';
  }
}

export default CONFIG;
