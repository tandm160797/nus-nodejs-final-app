import User from '../models/User.js';

class UserController {
  async getFollowingsById(req, res, next) {}
  async profile(req, res, next) {}
  async photoProfile(req, res, next) {}
  async albumProfile(req, res, next) {}
  async followingProfile(req, res, next) {}
  async followerProfile(req, res, next) {}
  async getUserById(req, res, next) {}
  async edit(req, res, next) {}
  async update(req, res, next) {}
  async follow(req, res, next) {}
  async unfollow(req, res, next) {}
}

export default new UserController;
