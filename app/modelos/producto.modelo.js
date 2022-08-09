module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define("producto", {
        nombre: {
            type: Sequelize.STRING
        },
        pcompra: {
            type: Sequelize.STRING
        },
        pventa: {
            type: Sequelize.STRING
        },
        stock: {
            type: Sequelize.STRING
        },
        detalle: {
            type: Sequelize.STRING
        },
        imagen: {
            type: Sequelize.STRING
        },
        estado: {
            type: Sequelize.STRING
        }
    });
    return Producto;
};