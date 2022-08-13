const db = require("../models");
const Usuario = db.usuarios;
const Op = db.Sequelize.Op;
// Crea y guarda el nuevo producto
exports.create = (req, res) => {
    // Valida el request
    if (!req.body.nombre) {
        res.status(400).send({
            mensaje: "¡El contenido no puede estar vacío.!"
        });
        return;
    }
    // Crea el Producto
    const usuario = {
        username: req.body.username,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        cedula: req.body.cedula,
        email: req.body.email,
        password: req.body.password,
        estado: req.body.estado ? req.body.estado : false
    };
    // Guarda el producto en la db
    Usuario.create(usuario)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                mensaje:
                    err.mensaje || "Se produjo un error al crear el usuario."
            });
        });
};
// Recuperar todos los usuarios de la db.
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condicion = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;
    Usuario.findAll({ where: condicion })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                mensaje:
                    err.mensaje || "Se produjo un error al recuperar usuarios."
            });
        });
};
// Encuentre un solo producto con el id
exports.findOne= (req, res) => {
    const id = req.params.id;
    Usuario.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    mensaje: `No se puede encontrar el usuario con el id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                mensaje: "Error al recuperar el usuario con el id=" + id
            });
        });
};
// Actualizar un Producto por el id en el request
exports.update = (req, res) => {
    const id = req.params.id;
    Usuario.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    mensaje: "El usuario se actualizó con éxito."
                });
            } else {
                res.send({
                    mensaje: `No se puede actualizar Pusuariocon el id=${id}. ¡Tal vez no se encontró el Producto o el cuerpo del req. está vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                mensaje: "Error al actualizar usuario con el id=" + id
            });
        });
};
// Eliminar un Producto con el id especificado en el request
exports.delete = (req, res) => {
    const id = req.params.id;
    Usuario.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    mensaje: "El usuario fue eliminado con éxito!"
                });
            } else {
                res.send({
                    mensaje: `No se puede eliminar usuario con el id=${id}. Quizás Producto no fue encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                mensaje: "No se pudo eliminar usuario con el id=" + id
            });
        });
};
// Eliminar todos los productos de la db.
exports.deleteAll = (req, res) => {
Usuario.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ mensaje: `${nums} Los usuarios se eliminaron con éxito!` });
        })
        .catch(err => {
            res.status(500).send({
                mensaje:
                    err.mensaje || "Se produjo un error al eliminar todos los usuarios ."
            });
        });
};
// Encuentra todos los Productos publicados
exports.findAllUsuarioPublicados = (req, res) => {
    Usuario.findAll({ where: { estado: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                mensaje:
                    err.mensaje || "Ocurrió algún error al recuperar usuarios."
            });
        });
};

exports.allAccesos = (req, res) => {
  res.status(200).send("Contenido Publico.");
};

exports.userTablero = (req, res) => {
  res.status(200).send("Contenido Usuario.");
};

exports.adminTablero = (req, res) => {
  res.status(200).send("Contenido Admin");
};

exports.moderadorTablero = (req, res) => {
  res.status(200).send("Contenido Moderador");
};
