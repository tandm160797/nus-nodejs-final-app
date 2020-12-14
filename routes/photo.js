import express from 'express';
import photoController from '../core/controllers/PhotoController.js';

let router = express.Router();

router.get('/:user-id/', photoController.getPhotosByAuthor);
router.get('/:photo-id/like-count/', photoController.getLikeCountById);
router.get('/new/', photoController.new);
router.post('/', photoController.create);
router.get('/:id/edit/', photoController.edit);
router.put('/:id/', photoController.update);
router.delete('/:id/', photoController.destroy);

export default router;