const { authJwt } = require("../middleware");
const controller = require("../controllers/usuario.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccesos);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userTablero
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.esModerador],
    controller.moderadorTablero
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.esAdmin],
    controller.adminTablero
  );
};