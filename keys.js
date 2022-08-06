module.exports={
    database:{
        connectionLimit:10, //limite de conexión de proyectos a base de datos
        host:process.env.DATABASE_HOST || "localhost", //conexionlocal-puerto de conexion 
        user:process.env.DATABASE_USER || "admin", // usuario de conexion de la base de datos (root es el usuario de MySQL por defecto)
        password:process.env.DATABASE_PASSWORD || "1234", //CONTRASEÑA DE LA BASE DE DATOS (CAMPO VACIO XQ MY SQL NO TIENE CONTRASEÑA)
        database:process.env.DATABASE_NAME || "ys_db", //LLAMAR A LA BASE DE DATOS(conexion segun el nombre)
     }
}