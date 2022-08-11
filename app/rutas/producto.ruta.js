const express = require('express');
const app = express();
const productoRoute = express.Router();
let Producto = require('../modelos/producto.modelo.js');
// Add Producto
productoRoute.route('/add-producto').post((req, res, next) => {
    Producto.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});
// Get all Producto
productoRoute.route('/').get((req, res) => {
  Producto.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
// Get Producto
productoRoute.route('/read-producto/:id').get((req, res) => {
  Producto.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
// Update Producto
productoRoute.route('/update-producto/:id').put((req, res, next) => {
  Producto.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Producto autualizado!')
    }
  })
})
// Delete Producto
productoRoute.route('/delete-producto/:id').delete((req, res, next) => {
  Producto.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})
module.exports = productoRoute;