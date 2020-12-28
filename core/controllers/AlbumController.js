import Joi from 'joi';
import jwt from 'jsonwebtoken';
import sharp from 'sharp';

import Photo from '../models/Photo.js';
import Album from '../models/Album.js';

class AlbumController {
  async getAlbumsByAuthor(req, res, next) {}
  async getLikeCountById(req, res, next) {}

  async new(req, res, next) {
    let token = req.query.token;
    let user = req.body.user;
    let msg = req.query.msg;
    return res.render('components/album/new-album.pug', { token, user, msg });
  }

  async create(req, res, next) {
    let data = {};
    data.title = req.body['album-title'];
    data.description = req.body['album-description'];
    data.mode = req.body['album-sharing-mode'];
    data.photosUrl = `/images/photos/${req.file['filename']}`;
    sharp(req.file.path).resize(1080, 1080).toFile(`./public/images/photos/${req.file.filename}`); //error

    let schema = Joi.object().keys({
      title: Joi.string().required().max(140),
      description: Joi.string().required().max(300),
      mode: Joi.string().required(),
      photosUrl: Joi.required()
    });

    if (!schema.validate(data).error) {
      
      let userId = jwt.verify(req.query.token, process.env.JWT_SECRET_KEY).id;
      data.user = userId;
      let album = new Album(data);
      await album.save();
      let msg = 'Album saved successfully';
      return res.redirect(`album/new?token=${req.query.token}&msg=${msg}`);
    }
    return res.send('Invalid data');
  }

  async edit(req, res, next) {
    let token = req.query.token;
    let user = req.body.user;
    let msg = req.query.msg;
    let albumId = req.params.id;
    let album = await Album.findById(albumId).exec();
    return res.render('components/album/edit-album.pug', { token, user, msg, album });
  }

  async update(req, res, next) {
    let data = {};
    data.title = req.body['album-title'];
    data.description = req.body['album-description'];
    data.mode = req.body['album-sharing-mode'];
    if (req.file) {
      data.photoUrl = `/images/photos/${req.file['filename']}`;
      sharp(req.file.path).resize(1080, 1080).toFile(`./public/images/photos/${req.file.filename}`);
    }
    
    let schema = Joi.object().keys({
      title: Joi.string().required().max(140),
      description: Joi.string().required().max(300),
      mode: Joi.string().required(),
      photoUrl: Joi.string()
    });

    if (!schema.validate(data).error) {
      let albumId = req.params.id;
      let album = await Album.findById(albumId).exec();

      album.title = data.title;
      album.description = data.description;
      album.mode = data.mode;
      if (data.photoUrl) {
        album.photosUrl.push(data.photoUrl);
      }
      await album.save();
      return res.redirect(`${process.env.SERVER}/user/${req.query.userId}/profile/album?token=${req.query.token}`);
    }
    return res.send('Invalid data');  
  }

  async destroy(req, res, next) {
    let albumId = req.params.id;
    await Album.deleteById(albumId);
    return res.redirect(`${process.env.SERVER}/user/${req.query.userId}/profile/album?token=${req.query.token}`);
  }

  async liked(req, res, next) {
    let albumId = req.params.id;
    let album = await Album.findByIdAndUpdate(albumId, {$inc: {likeCount: 1}}).exec();
    return res.status(200).json(++album.likeCount);
  }

  async public(req, res, next) {
    let albumId = req.params.id;
    let album = await Album.findByIdAndUpdate(albumId, {$set: {mode: 'public'}}).exec();
    return res.status(200).json({mode: "public"});
  }
}

export default new AlbumController;
