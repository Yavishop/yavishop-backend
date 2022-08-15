module.exports = (sequelize, Sequelize) => {
    const Pedido = sequelize.define("pedido", {

        id: {
            type: Sequelize.STRING
        },
        nombre: {
            type: Sequelize.STRING
        },
        estado: {
            type: Sequelize.BOOLEAN
        }
    });
    return Pedido;
};