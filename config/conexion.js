const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: '',
    port:'3306',
    database: 'ys_db'
});

conexion.connect((err)=>{
    if(err){
        conexion.log('ha ocurrido un error :'+ err)
    }
    else
    {console.log(' la base de datos se conecto!!!')}
});

module.exports=conexion
