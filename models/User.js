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