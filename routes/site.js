import express from 'express';
import siteController from '../core/controllers/SiteController.js';

let router = express.Router();

router.post('/signin/', siteController.signin);
router.post('/signup/', siteController.signup);
router.post('/forgot-password/', siteController.forgotPassword);
router.post('/reset-password/:id/', siteController.resetPassword);

router.get('/feeds/', siteController.feeds);
router.get('/discovery/', siteController.discovery);
router.get('/profile/:user-id/', siteController.discovery);
router.get('/', siteController.index);

export default router;