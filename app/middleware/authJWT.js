const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.session.token;

  if (!token) {
    return res.status(403).send({
      message: "No se proporcionó token!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "No autorizado!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

esAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        return next();
      }
    }

    return res.status(403).send({
      message: "Requerir rol de administrador!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "No se puede validar el rol de usuario!",
    });
  }
};

esModerador = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderador") {
        return next();
      }
    }

    return res.status(403).send({
      message: "Requerir rol de moderador!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "No se puede validar el rol de moderador!",
    });
  }
};

esModeradorOAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderador") {
        return next();
      }

      if (roles[i].name === "admin") {
        return next();
      }
    }

    return res.status(403).send({
      message: "Requerir rol de moderador o administrador!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "No se puede validar el rol de moderador o administrador!",
    });
  }
};

const authJwt = {
  verifyToken,
  esAdmin,
  esModerador,
  esModeradorOAdmin,
};
module.exports = authJwt;
