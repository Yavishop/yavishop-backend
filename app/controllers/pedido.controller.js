const db = require("../models");
const Producto = db.pedidos;
const Op = db.Sequelize.Op;
// Crea y guarda el nuevo pedido
const addProducto = async (req, res) =>{
    const {id , nombre, estado} = req.body;

    //se ve si tenemos el producto
    const estaEnProductos = await Producto.findOne({nombre});

    //para verificar que no haya campos vacios 
    const noEstaVacio = nombre !== "" && img !== "" && precio !== "";

    //para ver si el producto ya esta en el carrito
    const estaEnElCarrito = await Producto.findOne({nombre});

    //validamos si no tenemos producto
    if (!estaEnProductos) {
        res.status(400).json({
            mensaje: "Este producto no se encuentra en la base de datos",
        });
    }else if (noEstaVacio && !estaEnElCarrito) {
        const nuevoProducto = new Producto({id, nombre, estado});

        //actualizamos los articulos del carrito
        await Producto.findByIdUpdate(
            estaEnProductos?._id,
            {inProducto: true, id, nombre,},
            {new: true}
        )
         .then((producto) => {
           nuevoProducto.save();
           res.json({
            mensaje: "El producto fue agregado",
            producto,
           });
         })
         .catch((error) => console.error(error));   
      //y si esta en el carrito nos lo muestra
    }else if (estaEnElCarrito) {
        res.status(400).json({
            mensaje: "El producto ya esta en el carrito",
        });
    }
};

const getProductos = async (req, res) => {
    const productos = await Producto.find();

    if (productos) {
        res.json({productos});
    }else {
        res.json({ mensaje: "No hay productos en el carrito"});
    }
};


const putProducto = async (req, res) => {
    const {productoId} = req.params;
    const {query} = req.query;
    const body = req.body;

    //buscamos el producto en el carrito
    const productoBuscado = await Producto.findById(productoId);

    if (!query) {
        res.status(404).json({mensaje: "Debes enviar una query" });
    } else if  (productoBuscado && query === "add") {
       body.amount = body.amount + 1;

       await Producto.findByIdAndUpdate(productoId , body,{
        new: true,
       }).then((producto)=>{
        res.json({
            mensaje: "El producto: ${producto.nombre} fue actualizado",
            producto,
        });
       });

       //si esta el producto en el carrito y lo quremos quitar
    }else if (productoBuscado && query === "del") {
        body.amount = body.amount -1;
        await Producto.findByIdAndUpdate(productoId, body,{
            new:true,
        }).then((producto)=>{
            res.json({
                mensaje: "El producto: ${producto.nombre} fue actualizado",
                producto,
            })
        });
    } else {
        res.status(400).json({mensaje: "Ocurrio un error"});
    }   
  };


  const deleteProducto = async (req,res) => {
    const {productoId} =req.params;

    //buscamos el producto en el carrito
    const productoInProducto = await Producto.findById(productoId);

    //buscamos el producto ennuestra base de datos
    const {id, nombre, estado} = await Producto.findOne({
        nombre: productoInProducto.nombre,
    });

    //Buscamos el producto con el id 
    await Producto.findByIdAndDelete(productoId);

    await Producto.findByIdAndUpdate(
        _id,
        {inProducto: false, id, nombre, estado},
        {new: true}
    )
     .then((producto) => {
        res.json({
            mensaje: "El producto ${producto.nombre} fue eliminado del carrito",
        });
     })
     .catch((error) => res.json({mensaje: "Hubo un error"}));
  };



