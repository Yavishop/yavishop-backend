module.exports = (sequelize, Sequelize) => {
    const User= sequelize.define("usuario", {
      username: {
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
      apellido: {
        type: Sequelize.STRING
      },
      cedula: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.BOOLEAN
      }
    });
    return User;
  };