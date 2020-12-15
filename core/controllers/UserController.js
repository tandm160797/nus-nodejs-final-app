import User from '../models/User.js';

class UserController {
  async signin(req, res, next) {}
  async signup(req, res, next) {}
  async forgotPassword(req, res, next) {}
  async resetPassword(req, res, next) {}
  async follow(req, res, next) {}
  async unfollow(req, res, next) {}
  async profile(req, res, next) {}
  async followings(req, res, next) {}
  async followers(req, res, next) {}
  async show(req, res, next) {}
  async edit(req, res, next) {}
  async update(req, res, next) {}
}

export default new UserController;
