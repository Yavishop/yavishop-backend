module.exports = app => {
    const usuarios = require("../controllers/usuario.controller");
  
    var router = require("express").Router();
      // Create a new Tutorial
    router.post("/", usuarios.create);
      // Retrieve all Tutorials
    router.get("/", usuarios.findAll);
      // Retrieve all published Tutorials
    router.get("/AllUsuarios", usuarios.findAllPublished);
      // Retrieve a single Tutorial with id
    router.get("/:id", usuarios.findOne);
      // Update a Tutorial with id
    router.put("/:id", usuarios.update);
      // Delete a Tutorial with id
    router.delete("/:id", usuarios.delete);
      // Delete all usuarios
    router.delete("/", usuarios.deleteAll);
      app.use('/api/usuarios', router);
  };
  