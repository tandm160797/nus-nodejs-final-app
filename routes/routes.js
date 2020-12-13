import userRouter from './user.js';
import photoRouter from './photo.js';
import albumRouter from './album.js';
import siteRouter from './site.js';

export default function router(app) {
  app.use('/user', userRouter);
  app.use('/photo', photoRouter);
  app.use('/album', albumRouter);
  app.use('/', siteRouter);
}
