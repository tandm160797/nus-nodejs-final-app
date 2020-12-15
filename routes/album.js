import express from 'express';
import albumController from '../core/controllers/AlbumController.js';

let router = express.Router();

router.get('/:user-id/', albumController.getAlbumsByAuthor);
router.get('/:album-id/like-count/', albumController.getLikeCountById);
router.get('/new/', albumController.new);
router.post('/', albumController.create);
router.get('/:id/edit/', albumController.edit);
router.put('/:id/', albumController.update);
router.delete('/:id/', albumController.destroy);

export default router;