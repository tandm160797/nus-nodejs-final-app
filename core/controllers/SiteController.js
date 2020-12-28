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

  async discoveryPhoto(req, res, next) {
    let token = req.query.token;
    let user = req.body.user;
    let followingPhotos = await Photo.find({mode: 'public'}).populate('user').sort({createdAt: -1}).exec();

    return res.render('components/site/discover-photo.pug', {token, user, followingPhotos});
  }

  async discoveryAlbum(req, res, next) {
    let token = req.query.token;
    let user = req.body.user;
    let followingAlbums = await Album.find({mode: 'public'}).populate('user').sort({createdAt: -1}).exec();

    return res.render('components/site/discover-album.pug', {token, user, followingAlbums});
  }

  index(req, res, next) {
    let token = req.query.token;
    if (token) {
      return res.redirect(`feeds/photo?token=${token}`);
    }
    return res.render('components/user/signin.pug');
  }
}

export default new SiteController;
