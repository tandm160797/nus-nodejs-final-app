import express from 'express';
import userController from '../core/controllers/UserController.js';

let router = express.Router();

router.get('/:id/following/', userController.getFollowingsById);
router.get('/:id/profile/', userController.profile);
router.get('/:id/profile/photo/', userController.photoProfile);
router.get('/:id/profile/album/', userController.albumProfile);
router.get('/:id/profile/following/', userController.followingProfile);
router.get('/:id/profile/follower/', userController.followerProfile);
router.get('/:user-id/', userController.getUserById);
router.get('/:id/edit/', userController.edit);
router.put('/:id/', userController.update);

export default router;