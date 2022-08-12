const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicacionUsernameOEmail = async (req, res, next) => {
  try {
    // Username
    let user = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if (user) {
      return res.status(400).send({
        message: "¡Ha fallado! El nombre de usuario ya está en uso!"
      });
    }

    // Email
    user = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (user) {
      return res.status(400).send({
        message: "¡Ha fallado! Correo electrónico ya está en uso!"
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: error.message
    });
  }
};

checkRolesExistentes = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "¡Ha fallado! El rol no existe = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};

const verifyRegistro = {
  checkDuplicacionUsernameOEmail,
  checkRolesExistentes
};

module.exports = verifyRegistro;
