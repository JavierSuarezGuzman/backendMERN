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
        });
});

/* app.get('/api/tareas/:id', (req, res) => { //traigo un ítem de tareas por id. Creado solo para aprender, no tiene uso aún
    const id = Number(req.params.id); //el request siempre nos va a mandar un string, en mi caso no cambiaré el tipo ya que puede que use otro valor como id
    const tarea = tareas.find(tarea => tarea.id == id);
    if (tarea) {
        res.json(tarea);
        res.status(200);
    } else {
        res.status(404).end();
    }
}); */

app.delete('/api/tareas/eliminar/:id', (req, res) => { //eliminar una tarea por id. Aquí si lo cambiaré a int (Number)
    const id = Number(req.params.id);
    tareas = tareas.filter(tarea => tarea.id != id);
    res.status(204).end();
});

/*          INVENTARIO          */

app.post('/api/stock/post', (req, res) => { //crear un producto
    const producto = req.body;

    const nuevoProducto = new Producto ({

        producto: producto.producto,
        cantidad: producto.cantidad
    });

    nuevoProducto.save()
        .then(productoGuardado => {
            res.json(productoGuardado);
            res.status(201);
        });
});

app.get('/api/stock', (req, res) => { //traigo el inventario como lista

    /*     if (req.query.ordenar == 'cantidad') { //vista query '?' por cantidad de ítems ascendentes (menor cantidad arriba)
            res.json(stock.sort((a, b) => a.cantidad - b.cantidad)); //está pasando como un string a la vista. PENDIENTE
        }  */
    Stock.find({})
        .then(productos => {
            res.json(productos);
            res.status(200);
        });
});

app.get('/api/stock/:id', (req, res) => { //traigo un ítem de stock por id
    const id = Number(req.params.id);
    const producto = stock.find(producto => producto.id == id);
    if (producto) {
        res.json(producto);
        res.status(200);
    } else {
        res.status(404).end();
    }
});

app.patch('/api/stock/modificar/:id', (req, res) => { //modificar un producto por id
    const prodActualizado = req.body;
    const id = req.params.id;
    /*     console.log(`id: ${id}`); */

    const index = stock.findIndex(producto => producto.id == id);
    /*   console.log(`index: ${index}`); */

    if (index >= 0) { //hay que validar que sea mayor a 0. Si no lo encontró es -1
        const prodActualizar = stock[index];
        Object.assign(prodActualizar, prodActualizado);
    }
    res.json(stock);
});

app.delete('/api/stock/eliminar/:id', (req, res) => { //eliminar un producto por id
    const id = Number(req.params.id);
    stock = stock.filter(producto => producto.id != id);
    res.status(204).end();
});

/*          Arreglos de objetos         */

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
    } */
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
    } */
];

