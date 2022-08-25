/* Javier Suárez Guzmán
    Agosto 2022 */

    const { Schema, model } = require('mongoose');

    const userSchema = new Schema({
        
        user: String,
        password: String,
        rol: String
    });
    
    const User = model('User', userSchema);
    
    module.exports = User;

    /* En el caso de que un usuario tenga más de un rol, este  será
    creado con otro usuario, para evitar el error humano.
    En caso de pensar rol como un objeto o array sería propenso
    al error */