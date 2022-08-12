const { authJwt } = require("../middleware");
const controller = require("../controllers/usuario.controller");



module.exports = function (app) {
  app.use(function (req, res, next) {
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

  const router = require("express").Router();
  // Crear un nuevo Producto
  router.post("/", controller.create);
  // Retrieve all Tutorials
  router.get("/", controller.findAll);
  // Retrieve all published Tutorials
  router.get("/AllUsuarios", controller.findAllUsuarioPublicados);
  // Retrieve a single Tutorial with id
  router.get("/:id", controller.findOne);
  // Update a Tutorial with id
  router.put("/:id", controller.update);
  // Delete a Tutorial with id
  router.delete("/:id", controller.delete);
  // Delete all usuarios
  router.delete("/", controller.deleteAll);
  app.use('/api/usuarios', router);
};
