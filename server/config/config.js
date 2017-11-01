const dotenv = require('dotenv');

dotenv.config();

const config = {
  jwtSecretKey: 'rubbishStuff123',
  development: {
    username: 'emasys',
    password: 'root',
    database: 'recipe-dev',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    operatorsAliases: false
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    username: 'emasys',
    password: 'root',
    database: 'database_production',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];


// const config = {
//   jwtSecretKey: 'rubbishStuff123',
//   development: {
//     username: 'emasys',
//     password: 'root',
//     database: 'recipe-dev',
//     host: '127.0.0.1',
//     port: 5432,
//     dialect: 'postgres'
//   },
//   production: {
//     database: 'database_production',
//     dialect: 'postgres'
//   }

// };

// export default config;
