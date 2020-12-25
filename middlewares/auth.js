import passport from './../helpers/passport.js';

export default function authentication(req, res, next) {
  passport.authenticate('jwt',
    async (err, user, info) => {
      if (info.name === 'JsonWebTokenError') {
        return res.sendStatus(401);
      }
      if (!user) {
        return res.sendStatus(401);
      }
      if (err) return next(err);

      req.body.user = user;
      return next();
    }
  )(req, res, next);
}