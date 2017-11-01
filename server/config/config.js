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
    DATABASE_URL: 'postgres://fwcmuunqrrgzhs:c58124fa6fb480a20412448dd53398e817b647a8efc73393b5f47318d8ed4530@ec2-54-163-230-219.compute-1.amazonaws.com:5432/dc3k4ur6e95cbl',
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
