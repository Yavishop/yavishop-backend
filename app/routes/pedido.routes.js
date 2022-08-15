module.exports = app => {
    const pedidos = require("../controllers/producto.controller.js");
    var router = require("express").Router();
    // Crear un nuevo Producto
    router.post("/", pedidos.create);
    // Recupera todos los productos
    router.get("/", pedidos.findAll);
    // Recupera todos los pedidos publicados
    router.get("/AllPedidos", pedidos.findAllPedidosPublicados);
    // Recupera un solo pedido con el id
    router.get("/:id", pedidos.findOne);
    // Actualiza un pedido con el id
    router.put("/:id", pedidos.putProducto);
    // Eliminar un pedido con el id
    router.delete("/:id", pedidos.delete);
    // Elimina todos los pedidos
    router.delete("/", pedidos.deleteProducto);
    app.use('/api/pedidos', router);
  };