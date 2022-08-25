/* Javier Suárez Guzmán
    Agosto 2022 */

const { Schema, model } = require('mongoose');

const Producto = require('./Producto');

const boletaSchema = new Schema({

    nroBoleta: Number,
    productos: [String], //solución temporal
/*     productos: [{
        type: Schema.Types.ObjectId, ref: "Producto"
    }], */
    monto: Number
});

const Boleta = model('Boleta', boletaSchema);

module.exports = Boleta;

/* Me falta incluir la cantidad de productos que lleva en la boleta 
y que este esté asociado con la disminución en inventario.
Esta cantidad es independiente de la cantidad del modelo Producto */