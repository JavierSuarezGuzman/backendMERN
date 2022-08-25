/* Javier Suárez Guzmán
    Agosto 2022 */

/* const http = require('http'); */
/* const app = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(notas));
}); */

require('./database');

const express = require('express');
const app = express();

const Tarea = require('./models/Tarea');
const Producto = require('./models/Producto');
const Boleta = require('./models/Boleta');
const User = require('./models/User');

/* app.use(express.json); */
app.use(express.json()); //parse de json para express

const PORT = 3001;
app.listen(PORT, () => { //express es asíncrono por lo que se pasa como callback
    console.log(`Servidor escuchando en puerto: ${PORT}`);
});

app.get('/', (req, res) => { //vista raíz
    res.send('index');
});

/*          TAREAS          */

app.post('/api/tareas/post', (req, res) => { //crear una tarea
    const tarea = req.body;

    /* const ids = tareas.map(tarea => tarea.id); //mapeo las id's de las tareas
    const idMax = Math.max(...ids); //ubico la id más alta entre todas las ids */

    const nuevaTarea = new Tarea({
        /*         id: idMax + 1, */
        contenido: tarea.contenido
    });

    nuevaTarea.save()
        .then(tareaGuardada => {
            //tareas = tareas.concat(nuevaTarea);
            res.json(tareaGuardada);
            res.status(201);
            res.end();
        });

    //tareas = [...tareas, nuevaTarea]; //dos formas de hacer lo mismo
    //tareas = tareas.concat(nuevaTarea); //dos formas de hacer lo mismo

    //console.log(nuevaTarea);
});

app.get('/api/tareas', (req, res) => {//traigo las tareas como lista
    Tarea.find({})
        .then(tareas => {
            res.json(tareas);
            res.status(200);
            res.end();
        });
});

app.get('/api/tareas/:id', (req, res) => { //traigo un ítem de tareas por id. Creado solo para aprender, no tiene uso aún
    const id = req.params.id; //aunque no lo muestra
    Tarea.findById(id); //el request siempre nos va a mandar un string, en mi caso no cambiaré el tipo ya que puede que use otro valor como id
    res.status(200);
    res.end();
});

app.patch('/api/tareas/modificar/:id', async (req, res) => { //modificar un producto por id
/*     try { */
        const id = req.params.id;
        const tareaActualizada = req.body;

        const result = await Tarea.findByIdAndUpdate(id, tareaActualizada);
        res.send(result);
/*     } catch (err) {
        console.log(err);
    } */

    /*     Tarea.findByIdAndUpdate(id, tareaActualizada);
        res.send(tareaActualizada);
        res.end(); */

});

app.delete('/api/tareas/eliminar/:id', (req, res) => { //eliminar una tarea por id. Aquí si lo cambiaré a int (Number)
    /*     const id = req.params.id;
        Tarea.findByIdAndRemove(id, (err, del) => { */
    Tarea.findByIdAndRemove(req.params.id, (err, del) => {
        if (!err) {
            /* console.log(del); */
            res.status(204);
            res.end();
        }
    });
    /* res.status(204).json(`Se eliminó tarea: ${tarea}`); */
});

/*          INVENTARIO          */

app.post('/api/stock/post', (req, res) => { //crear un producto
    const producto = req.body;

    const nuevoProducto = new Producto({

        producto: producto.producto,
        cantidad: producto.cantidad,
        tags: producto.tags
    });

    nuevoProducto.save()
        .then(productoGuardado => {
            res.json(productoGuardado);
            res.status(201);
            res.end();
        });
});

app.get('/api/stock', (req, res) => { //traigo el inventario como lista

    /*     if (req.query.ordenar == 'cantidad') { //vista query '?' por cantidad de ítems ascendentes (menor cantidad arriba)
            res.json(stock.sort((a, b) => a.cantidad - b.cantidad)); //está pasando como un string a la vista. PENDIENTE
        }  */
    Producto.find({})
        .then(productos => {
            res.json(productos);
            res.status(200);
            res.end();
        });
});

app.get('/api/stock/:id', (req, res) => { //traigo un ítem de stock por id
    const id = req.params.id;
    Producto.findById(id);
    res.status(200);
    res.end();
});

app.patch('/api/stock/modificar/:id', async (req, res) => { //modificar un producto por id
    const id = req.params.id;
    const prodActualizado = req.body;

    const resultado = await Producto.findByIdAndUpdate(id, prodActualizado);
    res.send(resultado);
});

app.delete('/api/stock/eliminar/:id', (req, res) => { //eliminar un producto por id
    const id = req.params.id;
    Producto.findByIdAndRemove(id, (err, del) => {
        if (!err) {
            res.status(204);
            res.end();
        }
    });
});

/*          BOLETAS          */

app.post('/api/boletas/post', (req, res) => { //crear una boleta
    const boleta = req.body;

    const nuevaBoleta = new Boleta({
        nroBoleta: boleta.nroBoleta,
        productos: boleta.productos,
        monto: boleta.monto
    });

    nuevaBoleta.save()
        .then(boletaGuardada => {
            res.json(boletaGuardada);
            res.status(201);
        });
});

app.get('/api/boletas', (req, res) => {//traigo las boletas como lista
    Boleta.find({})
        .then(boletas => {
            res.json(boletas);
            res.status(200);
        });
});

/*          USUARIOS          */

//Manejo solo desde la base de datos, dependiendo de un administrador de sistemas con conocimiento

/*          Arreglos de objetos         */
/* 
let tareas = [/* 
    {
        "id": 1,
        "contenido": "nota id:1"
    },
    {
        "id": 2,
        "contenido": "nota id:2"
    },
    {
        "id": 3,
        "contenido": "nota id:3"
    } 
];

let stock = [/* 
    {
        "id": 1,
        "producto": "Paltas",
        "cantidad": 5
    },
    {
        "id": 2,
        "producto": "Pan",
        "cantidad": 20
    },
    {
        "id": 3,
        "producto": "Tomates",
        "cantidad": 9
    },
    {
        "id": 4,
        "producto": "Papas fritas",
        "cantidad": 15
    },
    {
        "id": 5,
        "producto": "Bebida",
        "cantidad": 4
    },
    {
        "id": 6,
        "producto": "Chocolate",
        "cantidad": 11
    },
    {
        "id": 7,
        "producto": "Aceite",
        "cantidad": 13
    }
];
 */
