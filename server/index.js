import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import path from 'path';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
// Routes
import routes from './routes/index';

// Port
const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
if (app.get('env') !== 'test') app.use(logger('dev')); // ignore logging in test env

// serve client-side
app.use(express.static(path.join(__dirname, './../client/public')));

app.use('/docs', swaggerUI.serve, swaggerUI.setup(require('./middleware/mr-docs.json')));

app.use('/api/v1/', routes);

// routes(app);

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
