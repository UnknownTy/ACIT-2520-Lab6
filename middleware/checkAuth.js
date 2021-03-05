const userController = require("../controllers/userController")
module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/auth/login");
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/dashboard");
  },
  isAdmin: function (req, res, next) {
    if (!req.isAuthenticated()) {
      res.redirect("/auth/login")
    } else if (userController.getUserById(req.user.id).role === "admin"){
      return next();
    }
    res.redirect("/dashboard")
  }
};
