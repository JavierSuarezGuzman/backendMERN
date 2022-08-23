/* Javier Suárez Guzmán
    Agosto 2022 */

const mongoose = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/nodemongo';

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true/* ,
    useFindAndModify: false,
    useCreateIndex: true //ayuda a crear sus propios índices */
})
    .then(() => {
        console.log('Conexión exitosa');
    })
    .catch(err => {
        console.log(err);
    });
