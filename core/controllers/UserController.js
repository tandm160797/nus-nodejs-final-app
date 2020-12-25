import jwt from 'jsonwebtoken';

import Photo from '../models/Photo.js';
import Album from '../models/Album.js';
import passport from './../../helpers/passport.js';

class UserController {
  signup(req, res, next) {
    let jsonRes = req.query.res;

    if (jsonRes) {
      jsonRes = JSON.parse(jsonRes);
      return res.render('components/user/signup.pug', { jsonRes });
    }
    return res.render('components/user/signup.pug');
  }

  signin(req, res, next) {
    let jsonRes = req.query.res;
    
    if (jsonRes) {
      jsonRes = JSON.parse(jsonRes);
      return res.render('components/user/signin.pug', { jsonRes });
    }
    return res.render('components/user/signin.pug');
  }

  signout(req, res, next) {
    return res.redirect('user/signin');
  }

  signupHandler(req, res, next) {
    passport.authenticate('signup', async (err, user, info) => {
      let jsonRes = {
        status: 'failure',
        message: '',
        data: null
      };

      if (err) return next(err);
      if (!user) {
        jsonRes.message = 'Có lỗi xảy ra, vui lòng thử lại sau';
        return res.redirect(`/user/signup?res=${encodeURIComponent(JSON.stringify(jsonRes))}`);
      }

      let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
      return res.redirect(`/feeds/photo?token=${token}`);
    })(req, res, next);
  }

  signinHandler(req, res, next) {
    passport.authenticate('signin', async (err, user, info) => {
      let jsonRes = {
        status: 'failure',
        message: '',
        data: null
      };

      if (err) return next(err);
      if (!user) {
        jsonRes.message = info;
        return res.redirect(`/user/signin?res=${encodeURIComponent(JSON.stringify(jsonRes))}`);
      }

      req.login(user, async (err) => {
        if (err) return next(err);

        let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
        return res.redirect(`/feeds/photo?token=${token}`);
      });
    })(req, res, next);
  }

  async forgotPassword(req, res, next) {}
  async resetPassword(req, res, next) {}
  async follow(req, res, next) {}
  async unfollow(req, res, next) {}

  async profilePhoto(req, res, next) {
    let token = req.query.token;
    let user = req.body.user;
    let photos = await Photo.find({user: user._id}).exec();
    let albums = await Album.find({user: user._id}).exec();
    let photoCount = await Photo.find({user: user._id}).countDocuments().exec();
    let albumCount = await Album.find({user: user._id}).countDocuments().exec();

    user.photoCount = photoCount;
    user.albumCount = albumCount;
    user.photos = photos;
    user.albums = albums;
    
    return res.render('components/user/photo-profile.pug', { token, user });
  }

  async profileAlbum(req, res, next) {
    let token = req.query.token;
    let user = req.body.user;
    let photos = await Photo.find({user: user._id}).exec();
    let albums = await Album.find({user: user._id}).exec();
    let photoCount = await Photo.find({user: user._id}).countDocuments().exec();
    let albumCount = await Album.find({user: user._id}).countDocuments().exec();

    user.photoCount = photoCount;
    user.albumCount = albumCount;
    user.photos = photos;
    user.albums = albums;
    
    return res.render('components/user/album-profile.pug', { token, user });
  }

  async publicProfile(req, res, next) {}
  async followings(req, res, next) {}
  async followers(req, res, next) {}
  async show(req, res, next) {}
  async edit(req, res, next) {}
  async update(req, res, next) {}
  async get(req, res, next) {}
}

export default new UserController;
