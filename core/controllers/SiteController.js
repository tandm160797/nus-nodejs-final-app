class SiteController {
  index(req, res, next) {
    res.render('index.pug');
  }

  feeds(req, res, next) {}

  discovery(req, res, next) {}
}

export default new SiteController;
