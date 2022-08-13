const { verifyRegistro } = require("../middleware");
const controller = require("../controllers/auth.controller.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/registro",
    [
        verifyRegistro.checkDuplicacionUsernameOEmail,
        verifyRegistro.checkRolesExistentes
    ],
    controller.signup
  );

  app.post("/api/auth/login", controller.singnin);

  app.post("/api/auth/signout", controller.signout);
};
