import Joi from 'joi';
import jwt from 'jsonwebtoken';
import sharp from 'sharp';

import Photo from '../models/Photo.js';

class PhotoController {
  async getPhotosByAuthor(req, res, next) {}
  async getLikeCountById(req, res, next) {}

  async new(req, res, next) {
    let token = req.query.token;
    let user = req.body.user;
    let msg = req.query.msg;

    return res.render('components/photo/new-photo.pug', { token, user, msg });
  }

  async create(req, res, next) {
    let data = {};
    data.title = req.body['photo-title'];
    data.description = req.body['photo-description'];
    data.mode = req.body['photo-sharing-mode'];
    data.photoUrl = `/images/photos/${req.file['filename']}`;
    sharp(req.file.path).resize(1080, 1080).toFile(`./public/images/photos/${req.file.filename}`);

    let schema = Joi.object().keys({
      title: Joi.string().required().max(140),
      description: Joi.string().required().max(300),
      mode: Joi.string().required(),
      photoUrl: Joi.required()
    });

    if (!schema.validate(data).error) {
      let userId = jwt.verify(req.query.token, process.env.JWT_SECRET_KEY).id;
      data.user = userId;
      let photo = new Photo(data);
      await photo.save();
      let msg = 'Photo saved successfully';
      return res.redirect(`photo/new?token=${req.query.token}&msg=${msg}`);
    }
    return res.send('Invalid data');   
  }

  async edit(req, res, next) {
    let token = req.query.token;
    let user = req.body.user;
    let msg = req.query.msg;
    let photoId = req.params.id;
    let photo = await Photo.findById(photoId).exec();
    return res.render('components/photo/edit-photo.pug', { token, user, msg, photo });
  }
  
  async update(req, res, next) {
    let data = {};
    data.title = req.body['photo-title'];
    data.description = req.body['photo-description'];
    data.mode = req.body['photo-sharing-mode'];
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
      let photoId = req.params.id;
      let photo = await Photo.findById(photoId).exec();

      photo.title = data.title;
      photo.description = data.description;
      photo.mode = data.mode;
      if (data.photoUrl) {
        photo.photoUrl = data.photoUrl;
      }
      await photo.save();
      return res.redirect(`${process.env.SERVER}/user/${req.query.userId}/profile/photo?token=${req.query.token}`);
    }
    return res.send('Invalid data');  
  }

  async destroy(req, res, next) {
    let photoId = req.params.id;
    await Photo.deleteById(photoId);
    return res.redirect(`${process.env.SERVER}/user/${req.query.userId}/profile/photo?token=${req.query.token}`);
  }

  async liked(req, res, next) {
    let photoId = req.params.id;
    let photo = await Photo.findByIdAndUpdate(photoId, {$inc: {likeCount: 1}}).exec();
    return res.status(200).json(++photo.likeCount);
  }
  
  async public(req, res, next) {
    let photoId = req.params.id;
    let photo = await Photo.findByIdAndUpdate(photoId, {$set: {mode: 'public'}}).exec();
    return res.status(200).json({mode: "public"});
  }
}

export default new PhotoController;
