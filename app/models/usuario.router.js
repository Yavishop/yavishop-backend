module.exports = (sequelize, Sequelize) => {
    const Usuario= sequelize.define("usuario", {
      nombre: {
        type: Sequelize.STRING
      },
      apellido: {
        type: Sequelize.STRING
      },
      cedula: {
        type: Sequelize.STRING
      },
      correo: {
        type: Sequelize.STRING
      },
      contraseña: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.BOOLEAN
      }
    });
    return Usuario;
  };