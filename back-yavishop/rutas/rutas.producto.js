const express = require('express')
const rutas=express.Router()
const conexion = require('../config/conexion')

//---------- agregamos rutas--------
//get productos
rutas.get('/',(req, res)=>{
    let sql ='select * from ys_producto'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })

})

// get un producto
rutas.get('/:id',(req, res)=>{
    const {id} = req.params
    let sql ='select * from ys_producto where id_producto = ?'
    conexion.query(sql,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//agregar producto
rutas.post('/',( req, res)=>{
    const{nombre, p_compra, p_venta,stock,imagen,detalle,estado} = req.body
    let sql = `INSERT INTO ys_producto(nombre,p_compra, p_venta, stock, imagen, detalle, estado) VALUES ('${nombre}','${p_compra}','${p_venta}','${stock}','${imagen}','${detalle}','${estado}')`

    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'producto agregado'})
        }
    })
})

//eliminar 
rutas.delete('/:id',(req, res)=>{
    const{id} = req.params

    let sql =`delete from ys_producto where id_producto = '${id}'`
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'producto eliminado'})
        }
    })
});

//modificar
rutas.put('/:id',(req, res)=>{
    const{id}=req.params
    const{nombre, p_compra, p_venta,stock,imagen,detalle,estado} = req.body

    let sql = `update ys_producto set 
                nombre ='${nombre}',
                p_compra='${p_compra}',
                p_venta='${p_venta}',
                stock='${stock}',
                imagen='${imagen}',
                detalle='${detalle}',
                estado='${estado}'
                where id_producto = '${id}'`
    
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'producto modificado'})
        }
    })

})
//----------------------------------

module.exports = rutas