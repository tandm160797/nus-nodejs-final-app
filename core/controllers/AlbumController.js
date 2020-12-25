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

    let album = req.query.album;
    if (album) {
      album = await JSON.parse(album);
    }
    
    return res.render('components/album/new-album.pug', { token, user, msg, album });
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
      return res.redirect(`album/new?token=${req.query.token}&msg=${msg}&album=${JSON.stringify(album)}`);
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

  async update(req, res, next) {}
  async destroy(req, res, next) {}
}

export default new AlbumController;
