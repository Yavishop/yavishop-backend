const {database} = require('./config/conexion');
const express = require('express');
const port = (process.env.port || 3000)

// express
const app = express()

//admitir json 
app.use(express.json())

//configurar
app.set('port',port)

//rutas
app.use('/api/producto',require('./rutas/rutas.producto'))

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Prueba en el back YAVISHOP de jenkins." });
  });
//inicializar express 
app.listen(app.get('port'),(error)=>{
    if(error)
    {console.log('error al iniciar el servidor: '+error)}
    else{
        console.log('servidor iniciado en el puerto: '+port)
    }
})