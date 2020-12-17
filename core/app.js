import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import expressSession from 'express-session';

import routes from './../routes/routes.js';
import mongoDB from './../databases/MongoDB.js';
import passport from './../helpers/passport.js';

let app = express();
let port = process.env.PORT;
let host = process.env.HOST;
let sessionOptions = {
  secret: process.env.SESSION_COOKIE_SECRET_KEY,
  saveUninitialized: true,
  resave: true
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(methodOverride('_method'));
app.use(expressSession(sessionOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_COOKIE_SECRET_KEY));
app.use(express.static(path.join(path.resolve(), 'public')));

app.set('view engine', 'pug');
app.set('views', path.join(path.resolve(), './core/views'));

routes(app);
mongoDB.connect();

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://${host}:${port}`);
});
