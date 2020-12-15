import express from 'express';
import siteController from '../core/controllers/SiteController.js';

let router = express.Router();

router.get('/feeds/:user-id/', siteController.feeds);
router.get('/discovery/', siteController.discovery);
router.get('/', siteController.index);

export default router;