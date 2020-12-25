import Photo from '../models/Photo.js';
import Album from '../models/Album.js';

class SiteController {
  async feedsPhoto(req, res, next) {
    let token = req.query.token;
    let user = req.body.user;
    let followings = user.followings;
    let followingPhotos = await Photo.find({user: {$in: followings}, mode: 'public'}).populate('user').sort({createdAt: -1}).exec();

    return res.render('components/site/feeds-photo.pug', {token, user, followingPhotos});
  }

  async feedsAlbum(req, res, next) {
    let token = req.query.token;
    let user = req.body.user;
    let followings = user.followings;
    let followingAlbums = await Album.find({user: {$in: followings}, mode: 'public'}).populate('user').sort({createdAt: -1}).exec();

    return res.render('components/site/feeds-album.pug', {token, user, followingAlbums});
  }

  discoveryPhoto(req, res, next) {}
  discoveryAlbum(req, res, next) {}
  index(req, res, next) {
    return res.render('components/album/new-album.pug');
  }
}

export default new SiteController;
