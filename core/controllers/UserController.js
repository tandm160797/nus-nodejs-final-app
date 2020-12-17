import jwt from 'jsonwebtoken';

import passport from './../../helpers/passport.js';

class UserController {
  signup(req, res, next) {
    passport.authenticate('signup', async (err, user, info) => {
      if (err) return next(err);
      if (err || !user) {
        res.status(500).json({
          status: 'failure',
          message: 'Có lỗi xảy ra, vui lòng thử lại sau',
          data: null
        });
      }

      let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
      res.status(200).json({
        status: 'success',
        message: info,
        data: {
          token
        }
      });
    })(req, res, next);
  }

  signin(req, res, next) {
    passport.authenticate('signin',
      async (err, user, info) => {
        if (err) return next(err);
        if (!user) {
          res.status(500).json({
            status: 'failure',
            message: info,
            data: null
          });
        }

        req.login(user, async (err) => {
          if (err) return next(err);

          let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
          res.status(200).json({
            status: 'success',
            message: info,
            data: {
              token
            }
          });
        });
      }
    )(req, res, next);
  }

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
  async get(req, res, next) {
    passport.authenticate('jwt',
    async (err, user, info) => {
      
      res.json({
        a: 'abcd'
      });
    }
  )(req, res, next);
  }
}

export default new UserController;
