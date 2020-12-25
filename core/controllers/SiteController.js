import Photo from '../models/Photo.js';

class SiteController {
  async feedsPhoto(req, res, next) {
    let token = req.query.token;
    let user = req.body.user;
    let followings = user.followings;
    let followingPhotos = await Photo.find({user: {$in: followings}, mode: 'public'}).populate('user').sort({createdAt: -1}).exec();

    return res.render('components/site/feeds.pug', {token, user, followingPhotos});
  }

  feedsAlbum(req, res, next) {}
  discoveryPhoto(req, res, next) {}
  discoveryAlbum(req, res, next) {}
}

export default new SiteController;
