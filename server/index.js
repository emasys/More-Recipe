import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import routes from './routes/index';
import path from 'path';

import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, './../client/public')));

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, './../client/public'));
// });
// app.all('*', (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'X-Requested-With, Content-Type, Accept, x-access-token',
//   );
//   res.header('Access-Control-Request-Method', 'DELETE');
//   res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, OPTION');
//   next();
// });

routes(app);

app.use('/api/v1/*', (req, res) => {
  res.status(404).send({
    error: 'page not found',
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});

export default app;
