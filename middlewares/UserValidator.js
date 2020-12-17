import User from './../core/models/User.js';

class UserValidator {
  async signup(req, res, next) {
    let validKeys = ['first-name', 'last-name', 'email', 'password', 'password-confirm'];
    let body = JSON.parse(JSON.stringify(req.body));
    let isValid = true;
    let jsonRes = {
      status: 'failure',
      message: '',
      data: null
    };

    if (validKeys.length === Object.values(body).length) {
      for (let validKey of validKeys) {
        if (!(validKey in body)) {
          jsonRes.message = 'Thông tin đăng ký không hợp lệ';
          isValid = false;
          break;
        }
      }

      if (body.password !== body['password-confirm']) {
        jsonRes.message = 'Mật khẩu không trùng khớp';
        isValid = false;
      }

      let isExistUser = await User.findOne({ email: body.email }).exec();
      if (isExistUser) {
        jsonRes.message = 'Email đã tồn tại';
        isValid = false;
      }
    } else {
      jsonRes.message = 'Thông tin đăng ký không hợp lệ';
      isValid = false;
    };

    if (!isValid) {
      req.app.set('jsonRes', jsonRes);
      return res.redirect('/user/signup');
    }
    return next();
  }

  signin(req, res, next) {
    let validKeys = ['email', 'password'];
    let body = JSON.parse(JSON.stringify(req.body));
    let isValid = true;
    let jsonRes = {
      status: 'failure',
      message: '',
      data: null
    };
    
    if (validKeys.length === Object.values(body).length) {
      for (let validKey of validKeys) {
        if (!(validKey in body)) {
          jsonRes.message = 'Thông tin đăng nhập không hợp lệ';
          isValid = false;
          break;
        }
      }
    } else {
      jsonRes.message = 'Thông tin đăng nhập không hợp lệ';
      isValid = false;
    }

    if (!isValid) {
      req.app.set('jsonRes', jsonRes);
      return res.redirect('/user/signin');
    }
    return next();
  }
}

export default new UserValidator;
