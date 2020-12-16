import jwt from 'jsonwebtoken';

import passport from './../helpers/passport.js';

export default function authentication(req, res, next) {
  passport.authenticate('jwt',
    async (err, user, info) => {
      console.log(err);
      console.log(user);
      console.log(info);
      
        
      res.end();
    }
  )(req, res, next);
}