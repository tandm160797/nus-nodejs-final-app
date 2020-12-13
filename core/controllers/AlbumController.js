import Album from '../models/Album.js';

class AlbumController {
  async getAlbumsByAuthor(req, res, next) {}
  async getAlbumsPublicByAuthor(req, res, next) {}
  async getLikesById(req, res, next) {}
  async getCountByAuthor(req, res, next) {}
  async getPhotoCountById(req, res, next) {}
  async new(req, res, next) {}
  async create(req, res, next) {}
  async edit(req, res, next) {}
  async update(req, res, next) {}
  async destroy(req, res, next) {}
}

export default new AlbumController;
