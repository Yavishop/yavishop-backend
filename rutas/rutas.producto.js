const express = require('express')
const rutas=express.Router()
const conexion = require('../config/conexion')

//---------- agregamos rutas--------
//get productos
rutas.get('/lista',(req, res)=>{
    let sql ='select * from productos'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })

})

// get un producto
rutas.get('producto/detalle:id',(req, res)=>{
    const {id} = req.params
    let sql ='select * from productos where id = ?'
    conexion.query(sql,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//agregar producto
rutas.post('/add',( req, res)=>{
    const{nombre, p_compra, p_venta,stock,detalle,imagen,estado} = req.body
    let sql = `INSERT INTO productos (nombre,pcompra, pventa, stock, imagen, detalle, estado) VALUES ('${nombre}','${p_compra}','${p_venta}','${stock}','${imagen}','${detalle}','${estado}')`

    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'producto agregado'})
        }
    })
})

//eliminar 
rutas.delete('/delete:id',(req, res)=>{
    const{id} = req.params

    let sql =`delete from productos where id = '${id}'`
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'producto eliminado'})
        }
    })
});

//modificar
rutas.put('/editar:id',(req, res)=>{
    const{id}=req.params
    const{nombre, p_compra, p_venta,stock,detalle,imagen,estado} = req.body

    let sql = `update productos set 
                nombre ='${nombre}',
                pcompra='${p_compra}',
                pventa='${p_venta}',
                stock='${stock}',                
                detalle='${detalle}',
                imagen='${imagen}',
                estado='${estado}'
                where id = '${id}'`
    
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'producto modificado'})
        }
    })

})
//----------------------------------

module.exports = rutas