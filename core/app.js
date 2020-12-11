import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';

import mongoDB from './../databases/MongoDB.js';
import routes from './../routes/routes.js';

let app = express();
let port = process.env.PORT || 3000;
let host = process.env.HOST || '127.0.0.1';

routes(app);
mongoDB.connect();

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(path.resolve(), 'public')));

app.set('view engine', 'pug');
app.set('views', path.join(path.resolve(), './core/views'));

app.use('/', (req, res, next) => {
  res.render('./index.pug');
});

app.listen(port, () => {
  console.log(`App listening at http://${host}:${port}`);
});
