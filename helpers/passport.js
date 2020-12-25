import passport from 'passport';
import passportLocal from 'passport-local';
import passportJwt from 'passport-jwt';

import User from './../core/models/User.js';

let LocalStrategy = passportLocal.Strategy;
let JwtStrategy = passportJwt.Strategy;
let extractJwt = passportJwt.ExtractJwt;
let jwtSecretKey = process.env.JWT_SECRET_KEY;
let authFields = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}
let jwtOptions = {
  secretOrKey: jwtSecretKey,
  jwtFromRequest: extractJwt.fromUrlQueryParameter('token'),
  session: false,
  passReqToCallBack: true
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use('signup', new LocalStrategy(authFields,
  async (req, email, password, done) => {
    try {
      let body = {};
      body.firstName = req.body['first-name'];
      body.lastName = req.body['last-name'];
      body.email = req.body['email'];
      body.password = req.body['password'];
      let user = new User(body);

      await user.save();
      return done(null, user, 'Đăng ký tài khoản thành công');
    } catch (err) {
      return done(err);
    }
  })
);

passport.use('signin', new LocalStrategy(authFields,
  async (req, email, password, done) => {
    try {
      let user = await User.findOne({ email }).exec();
      if (!user) return done(null, false, 'Email không tồn tại');

      let validate = await user.verifyPassword(password);
      if (!validate) return done(null, false, 'Mật khẩu không chính xác');
      return done(null, user, 'Đăng nhập thành công');
    } catch (err) {
      return done(err);
    }
  })
);

passport.use(new JwtStrategy(jwtOptions,
  async (jwtPayload, done) => {
    try {
      let user = await User.findById(jwtPayload.id).exec();
      if (!user) return done(null, false, 'Token không hợp lệ');
      return done(null, user, 'Xác thực thành công');
    } catch (err) {
      return done(err);
    }
  })
);

export default passport;