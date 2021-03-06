import express from 'express';

import userController from './../core/controllers/UserController.js';
import userValidator from './../middlewares/UserValidator.js';
import authentication from './../middlewares/auth.js';

let router = express.Router();

router.get('/signup/', userController.signup);
router.get('/signin/', userController.signin);
router.get('/signout/', authentication, userController.signout);
router.post('/signup-handler/', userValidator.signup, userController.signupHandler);
router.post('/signin-handler/', userValidator.signin, userController.signinHandler);
router.post('/forgot-password/', userController.forgotPassword);
router.post('/reset-password/:id/', userController.resetPassword);
router.patch('/:id/follow/:userId/', authentication, userController.follow);
router.patch('/:id/unfollow/:userId/', authentication, userController.unfollow);
router.get('/:id/profile/photo', authentication, userController.profilePhoto);
router.get('/:id/profile/album', authentication, userController.profileAlbum);
router.get('/:id/profile/following', authentication, userController.profileFollowing);
router.get('/:id/profile/follower', authentication, userController.profileFollower);
router.get('/:id/public-profile/photo', authentication, userController.publicProfilePhoto);
router.get('/:id/followings/', userController.followings);
router.get('/:id/followers/', userController.followers);
router.get('/:id/', userController.show);
router.get('/:id/edit/', userController.edit);
router.put('/:id/', userController.update);
router.get('/', authentication, userController.get);

export default router;