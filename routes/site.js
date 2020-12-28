import express from 'express';

import siteController from '../core/controllers/SiteController.js';
import authentication from './../middlewares/auth.js';

let router = express.Router();

router.get('/feeds/photo', authentication, siteController.feedsPhoto);
router.get('/feeds/album', authentication, siteController.feedsAlbum);
router.get('/discover/photo', authentication, siteController.discoveryPhoto);
router.get('/discover/album', authentication, siteController.discoveryAlbum);
router.get('/', siteController.index);

export default router;