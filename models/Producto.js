/* Javier Suárez Guzmán
    Agosto 2022 */

    const { Schema, model } = require('mongoose');

    const productoSchema = new Schema({
        
        producto: String,
        cantidad: Number,
        tags: [String]
    });
    
    const Producto = model('Producto', productoSchema);
    
    module.exports = Producto;