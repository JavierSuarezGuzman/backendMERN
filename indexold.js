/* Javier Suárez Guzmán
    Agosto 2022 */

const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json);

//const connectionString = 'mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb';
const connectionString = 'mongodb://127.0.0.1:27017/nodemongo';

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true/* ,
    useFindAndModify: false,
    useCreateIndex: true */
})
    .then(() => {
        console.log('Conexión exitosa');
    })
    .catch(err => {
        console.log(err);
    });

const kittySchema = new mongoose.Schema({
    name: String
});

const Kitten = mongoose.model('Kitten', kittySchema);

const kitten = new Kitten({
    name: 'Silence'
});

/* kitten.save()
    .then(res => {
        console.log(res);
        mongoose.connection.close();
    })
    .catch(err => {
        console.log(err);
    }); */
//console.log(silence.name); // 'Silence'

Kitten.find({})
    .then(res => {
        console.log(res);
        // mongoose.connection.close();
    });