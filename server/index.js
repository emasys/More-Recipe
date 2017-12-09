import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import path from 'path';
import cors from 'cors';

import routes from './routes/index';


const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, './../client/public')));

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
