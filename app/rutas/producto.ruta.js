module.exports = app => {
    const productos = require("../controladores/producto.controlador.js");
    var router = require("express").Router();
    // Crear un nuevo Producto
    router.post("/", productos.create);
    // Recupera todos los productos
    router.get("/", productos.findAll);
    // Recupera todos los productos publicados
    router.get("/AllProductos", productos.findAllProductosActivos);
    // Recupera un solo producto con el id
    router.get("/:id", productos.findOne);
    // Actualiza un producto con el id
    router.put("/:id", productos.update);
    // Eliminar un producto con el id
    router.delete("/:id", productos.delete);
    // Elimina todos los productos
    router.delete("/", productos.deleteAll);
    app.use('/api/productos', router);
  };