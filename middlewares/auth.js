import jwt from 'jsonwebtoken';

import passport from './../helpers/passport.js';

export default function authentication(req, res, next) {
  passport.authenticate('jwt',
    async (err, user, info) => {
      if (info.name === 'JsonWebTokenError') {
        res.status(401).json({
          status: 'failure',
          message: 'Token không hợp lệ',
          data: 'null',
        });
      }
      if (!user) {
        res.status(401).json({
          status: 'failure',
          message: 'Token không hợp lệ',
          data: null
        });
      }
      if (err) return next(err);
      return next();
    }
  )(req, res, next);
}