import User from './../core/models/User.js';

class UserValidator {
  async signup(req, res, next) {
    let validKeys = ['firstName', 'lastName', 'email', 'password', 'passwordConfirm'];
    let body = JSON.parse(JSON.stringify(req.body));

    if (validKeys.length === Object.values(body).length) {
      for (let validKey of validKeys) {
        if (!(validKey in body)) {
          res.status(500).json({
            status: 'failure',
            message: 'Thông tin đăng ký không hợp lệ',
            data: null
          });
        }
      }

      if (body.password !== body.passwordConfirm) {
        res.status(500).json({
          status: 'failure',
          message: 'Mật khẩu không trùng khớp',
          data: null
        });
      }

      let isExistUser = await User.findOne({ email: body.email }).exec();
      if (isExistUser) {
        res.status(500).json({
          status: 'failure',
          message: 'Email đã tồn tại',
          data: null
        });
      }
    } else {
      res.status(500).json({
        status: 'failure',
        message: 'Thông tin đăng ký không hợp lệ',
        data: null
      });
    }
    return next();
  }

  signin(req, res, next) {
    let validKeys = ['email', 'password'];
    let body = JSON.parse(JSON.stringify(req.body));
    
    if (validKeys.length === Object.values(body).length) {
      for (let validKey of validKeys) {
        if (!(validKey in body)) {
          res.status(500).json({
            status: 'failure',
            message: 'Thông tin đăng nhập không hợp lệ',
            data: null
          });
        }
      }
    } else {
      res.status(500).json({
        status: 'failure',
        message: 'Thông tin đăng nhập không hợp lệ',
        data: null
      });
    }
    return next();
  }
}

export default new UserValidator;
