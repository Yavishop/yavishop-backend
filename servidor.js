const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:8081" 
};
app.use(cors(corsOptions));
// analiza requests de content-type - application/json
app.use(express.json());
// analiza requests de content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
const db = require("./app/modelos");
db.sequelize.sync()
  .then(() => {
    console.log("Sincronizada la db.");
  })
  .catch((err) => {
    console.log("Falla en la sincronizacion de la db: " + err.message);
  });
  
// ruta sencilla
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a Yavishop." });
});
// establece el puerto , escucha los requests
require("./app/rutas/producto.ruta.js")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}.`);
});