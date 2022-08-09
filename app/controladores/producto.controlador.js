const db = require("../modelos");
const Producto = db.producto;
const Op = db.Sequelize.Op;
// Crea y guarda el nuevo producto
exports.create = (req, res) => {
    // Valida el request
    if (!req.body.nombre) {
        res.status(400).send({
            mensaje: "¡El contenido no puede estar vacío!"
        });
        return;
    }
    // Crea el Producto
    const producto = {
        nombre: req.body.nombre,
        pcompra: req.body.pcompra,
        pventa: req.body.pventa,
        stock: req.body.stock,
        detalle: req.body.detalle,
        imagen: req.body.imagen,
        estado: req.body.estado ? req.body.estado : false
    };
    // Guarda el producto en la db
    Producto.create(producto)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                mensaje:
                    err.mensaje || "Se produjo un error al crear el Producto."
            });
        });
};
// Recuperar todos los productos de la db.
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condicion = nombre ? { tinombretle: { [Op.like]: `%${nombre}%` } } : null;
    Producto.findAll({ where: condicion })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                mensaje:
                    err.mensaje || "Se produjo un error al recuperar productos."
            });
        });
};
// Encuentre un solo producto con el id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Producto.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    mensaje: `No se puede encontrar el producto con el id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                mensaje: "Error al recuperar el Producto con el id=" + id
            });
        });
};
// Actualizar un Producto por el id en el request
exports.update = (req, res) => {
    const id = req.params.id;
    Producto.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    mensaje: "El producto se actualizó con éxito."
                });
            } else {
                res.send({
                    mensaje: `No se puede actualizar Producto con el id=${id}. ¡Tal vez no se encontró el Producto o el cuerpo del req. está vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                mensaje: "Error al actualizar Producto con el id=" + id
            });
        });
};
// Eliminar un Producto con el id especificado en el request
exports.delete = (req, res) => {
    const id = req.params.id;
    Producto.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    mensaje: "El producto fue eliminado con éxito!"
                });
            } else {
                res.send({
                    mensaje: `No se puede eliminar Producto con el id=${id}. Quizás Producto no fue encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                mensaje: "No se pudo eliminar Producto con el id=" + id
            });
        });
};
// Eliminar todos los productos de la db.
exports.deleteAll = (req, res) => {
    Producto.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ mensaje: `${nums} Los productos se eliminaron con éxito!` });
        })
        .catch(err => {
            res.status(500).send({
                mensaje:
                    err.mensaje || "Se produjo un error al eliminar todos los Productos."
            });
        });
};
// Encuentra todos los Productos publicados
exports.findAllProductosActivos = (req, res) => {
    Producto.findAll({ where: { estado: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                mensaje:
                    err.mensaje || "Ocurrió algún error al recuperar Productos."
            });
        });
};