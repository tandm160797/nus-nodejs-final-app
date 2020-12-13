class SiteController {
  index(req, res, next) {
    res.render('index.pug');
  }

  signup(req, res, next) {}

  signin(req, res, next) {}

  forgotPassword(req, res, next) {}

  resetPassword(req, res, next) {}

  feeds(req, res, next) {}

  discovery(req, res, next) {}
}

export default new SiteController;
