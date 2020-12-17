import jwt from 'jsonwebtoken';

import passport from './../../helpers/passport.js';

class UserController {
  signup(req, res, next) {
    let jsonRes = req.app.get('jsonRes');
    
    if (jsonRes) return res.render('components/user/signup.pug', { jsonRes });
    return res.render('components/user/signup.pug');
  }

  signin(req, res, next) {
    let jsonRes = req.app.get('jsonRes');
    
    if (jsonRes) return res.render('components/user/signin.pug', { jsonRes });
    return res.render('components/user/signin.pug');
  }

  signupHandler(req, res, next) {
    passport.authenticate('signup', async (err, user, info) => {
      let jsonRes = {
        status: 'failure',
        message: '',
        data: null
      };

      if (err) return next(err);
      if (err || !user) {
        jsonRes.message = 'Có lỗi xảy ra, vui lòng thử lại sau';
        req.app.set('jsonRes', jsonRes);
        return res.redirect('/user/signup');
      }

      let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
      return res.redirect('/');
    })(req, res, next);
  }

  signinHanler(req, res, next) {
    passport.authenticate('signin', async (err, user, info) => {
      let jsonRes = {
        status: 'failure',
        message: '',
        data: null
      };

      if (err) return next(err);
      if (!user) {
        jsonRes.message = info;
        req.app.set('jsonRes', jsonRes);
        return res.redirect('/user/signin');
      }

      req.login(user, async (err) => {
        if (err) return next(err);

        let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
        return res.redirect('/');
      });
    })(req, res, next);
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
