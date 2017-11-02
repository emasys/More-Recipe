import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
  },
  production: {
    use_env_variable: process.env.DATABASE_URL,
    dialect: 'postgres'
  }
};

export default config[process.env.NODE_ENV || 'development'];
