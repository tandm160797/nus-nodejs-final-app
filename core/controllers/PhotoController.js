import Photo from '../models/Photo.js';

class PhotoController {
  async getPhotosByAuthor(req, res, next) {}
  async getPhotosPublicByAuthor(req, res, next) {}
  async getLikesById(req, res, next) {}
  async getCountByAuthor(req, res, next) {}
  async new(req, res, next) {}
  async create(req, res, next) {}
  async edit(req, res, next) {}
  async update(req, res, next) {}
  async destroy(req, res, next) {}
}

export default new PhotoController;
