import express from 'express';

import userController from './../core/controllers/UserController.js';
import userValidator from './../middlewares/UserValidator.js';
import authentication from './../middlewares/auth.js';

let router = express.Router();

router.post('/signup/', userValidator.signup, userController.signup);
router.post('/signin/', userValidator.signin, userController.signin);
router.post('/forgot-password/', userController.forgotPassword);
router.post('/reset-password/:id/', userController.resetPassword);
router.patch('/:id/follow/:user-id/', userController.follow);
router.patch('/:id/unfollow/:user-id/', userController.unfollow);
router.get('/:id/profile/', userController.profile);
router.get('/:id/followings/', userController.followings);
router.get('/:id/followers/', userController.followers);
router.get('/:id/', userController.show);
router.get('/:id/edit/', userController.edit);
router.put('/:id/', userController.update);
router.get('/', userController.get);

export default router;