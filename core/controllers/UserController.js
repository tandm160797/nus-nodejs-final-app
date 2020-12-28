import jwt from 'jsonwebtoken';

import User from '../models/User.js';
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

  async follow(req, res, next) {
    console.log();
    await User.updateOne({_id: req.params.id}, {$push: {followings: req.params.userId}}).exec();
    return res.status(200).json({ value: 'following' });
  }

  async unfollow(req, res, next) {
    await User.updateOne({_id: req.params.id}, {$pull: {followings: req.params.userId}}).exec();
    return res.status(200).json({ value: 'follow'});
  }

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

  async profileFollowing(req, res, next) {
    let token = req.query.token;
    let user = req.body.user;
    let photos = await Photo.find({user: user._id}).exec();
    let albums = await Album.find({user: user._id}).exec();
    let followings = await User.find({_id: {$in: user.followings}}).exec();
    let photoCount = await Photo.find({user: user._id}).countDocuments().exec();
    let albumCount = await Album.find({user: user._id}).countDocuments().exec();
    user.photoCount = photoCount;
    user.albumCount = albumCount;
    user.photos = photos;
    user.albums = albums;
    user.followings = followings;
    for (let element of user.followings) {
      let photoCount = await Photo.find({user: element._id}).countDocuments().exec();
      let albumCount = await Album.find({user: element._id}).countDocuments().exec();
      element.photoCount = photoCount;
      element.albumCount = albumCount;
    }
    return res.render('components/user/following-profile.pug', { token, user });
  }

  async profileFollower(req, res, next) {
    let token = req.query.token;
    let user = req.body.user;
    let photos = await Photo.find({user: user._id}).exec();
    let albums = await Album.find({user: user._id}).exec();
    let followers = await User.find({_id: {$in: user.followers}}).exec();
    let photoCount = await Photo.find({user: user._id}).countDocuments().exec();
    let albumCount = await Album.find({user: user._id}).countDocuments().exec();
    user.photoCount = photoCount;
    user.albumCount = albumCount;
    user.photos = photos;
    user.albums = albums;
    user.followers = followers;
    for (let element of user.followers) {
      let photoCount = await Photo.find({user: element._id}).countDocuments().exec();
      let albumCount = await Album.find({user: element._id}).countDocuments().exec();
      element.photoCount = photoCount;
      element.albumCount = albumCount;
    }
    return res.render('components/user/follower-profile.pug', { token, user });
  }

  async publicProfilePhoto(req, res, next) {
    let token = req.query.token;
    let user = req.body.user;
    let publicUser = await User.findOne({_id: req.params.id}).lean();
    let isFollowed = !!(await User.findOne({_id: user._id, followings: publicUser._id}).exec());
    let photos = await Photo.find({user: publicUser._id}).exec();
    let albums = await Album.find({user: publicUser._id}).exec();
    let photoCount = await Photo.find({user: publicUser._id}).countDocuments().exec();
    let albumCount = await Album.find({user: publicUser._id}).countDocuments().exec();

    publicUser.photoCount = photoCount;
    publicUser.albumCount = albumCount;
    publicUser.photos = photos;
    publicUser.albums = albums;
    publicUser.isFollowed = isFollowed;
    console.log(isFollowed);
    
    return res.render('components/user/photo-public-profile.pug', { token, user, publicUser });
  }

  async followings(req, res, next) {}
  async followers(req, res, next) {}
  async show(req, res, next) {}
  async edit(req, res, next) {}
  async update(req, res, next) {}
  async get(req, res, next) {}
}

export default new UserController;
