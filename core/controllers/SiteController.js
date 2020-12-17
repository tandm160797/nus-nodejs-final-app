class SiteController {
  index(req, res, next) {
    res.render('index.pug');
  }

  feeds(req, res, next) {
    res.render('components/site/feeds.pug');
  }

  discovery(req, res, next) {}
}

export default new SiteController;
