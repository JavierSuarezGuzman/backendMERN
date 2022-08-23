/* Javier Suárez Guzmán
    Agosto 2022 */

const { Schema, model } = require('mongoose');

const tareaSchema = new Schema({
    id: Number,
    contenido: String
});

const Tarea = model('Tarea', tareaSchema);

/* const tareaVSC = new Tarea({ //crear el objeto
    id: 101,
    contenido: "Tarea 101 desde vsc"
});

tareaVSC.save() //guardar el objeto de la línea 14
/*     .then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    }); */

/* Tarea.find({}) //"encontrar" y mostar por consola los documentos de tareas
.then(res => {
    console.log(res);
}); */


module.exports = Tarea;