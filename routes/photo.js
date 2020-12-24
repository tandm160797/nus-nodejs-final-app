import express from 'express';
import multer from 'multer';

import photoController from '../core/controllers/PhotoController.js';
import authentication from './../middlewares/auth.js';

let router = express.Router();
let upload = multer({ dest: 'public/images/' });

router.get('/:user-id/', photoController.getPhotosByAuthor);
router.get('/:photo-id/like-count/', photoController.getLikeCountById);
router.get('/new/', authentication, photoController.new);
router.post('/', authentication, upload.single('photo-img'), photoController.create);
router.get('/:id/edit/', authentication, photoController.edit);
router.put('/:id/', authentication, upload.single('photo-img'), photoController.update);
router.delete('/:id/', authentication, photoController.destroy);
router.patch('/:id/like/', authentication, photoController.liked);
router.patch('/:id/public/', authentication, photoController.public);
router.delete('/:id/', authentication, photoController.destroy);

export default router;