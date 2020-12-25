import express from 'express';
import multer from 'multer';

import albumController from '../core/controllers/AlbumController.js';
import authentication from './../middlewares/auth.js';

let router = express.Router();
let upload = multer({ dest: 'public/images/' });

router.get('/:user-id/', albumController.getAlbumsByAuthor);
router.get('/:album-id/like-count/', albumController.getLikeCountById);
router.get('/new/', authentication, albumController.new);
router.post('/', authentication, upload.single('photo-img'), albumController.create);
router.get('/:id/edit/', authentication, albumController.edit);
router.put('/:id/', upload.single('photo-img'), albumController.update);
router.delete('/:id/', albumController.destroy);

export default router;