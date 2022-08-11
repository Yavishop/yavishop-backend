const createError = require('http-errors');
const express = require("express");
const path = require('path');
const cors = require("cors");
const bodyParser = require('body-parser');

var corsOptions = {
  origin: "http://localhost:8081" 
};
app.use(cors(corsOptions));

productoRoute = require('./rutas/producto.rutas') 
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

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

// 404 
app.use((req, res, next) => {
  next(createError(404));
});
// ruta sencilla
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a Yavishop." });
});
// establece el puerto , escucha los requests
app.use('/api', productoRoute)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}.`);
});