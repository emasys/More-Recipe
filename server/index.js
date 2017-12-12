import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import path from 'path';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';

// Routes
import routes from './routes/index';

// Port
const PORT = process.env.PORT || 8080;

// Middlewares
const app = express();
// Swagger definition
const swaggerDefinition = {
  info: {
    title: 'More Recipe Documentation',
    version: '1.0.0',
    description: 'Fullstack app using react/redux and postgres'
  },
  host: 'localhost:8080',
  basePath: '/',
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./routes/index'],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// serve swagger
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
if (app.get('env') !== 'test') app.use(logger('dev')); // ignore logging in test env

// serve client-side
app.use(express.static(path.join(__dirname, './../client/public')));

routes(app);

// Catch all routes not available above
app.use('/api/v1/*', (req, res) => {
  res.status(404).send({
    error: 'page not found',
  });
});

// fallback to client-side if a page is reloaded while on a route defined in react-router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});

export default app;
