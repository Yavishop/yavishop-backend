const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:8081"],
  })
)

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "Sebas-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true,
    sameSite: 'strict'
  })
);

const db = require("./app/models");
const Role = db.role;

db.sequelize.sync()
  .then(() => {
    console.log("Sincronizada la db.");
  })
  .catch((err) => {
    console.log("Falla en la sincronizacion de la db: " + err.message);
  });

//// drop tabla si ya existe
//db.sequelize.sync({ force: true }).then(() => {
//  console.log("Drop and re-sync db.");
//});

// ruta simple
app.get("/", (req, res) => {
  res.json({ message: "Sebas con jwt." });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/usuario.routes")(app);
require("./app/routes/producto.routes")(app);


// mandar el puerto
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}.`);
});


function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderador",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}
