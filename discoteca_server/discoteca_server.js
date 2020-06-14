var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Disco = /** @class */ (function () {
    function Disco(id, nombre, image, numEntradas, precio) {
        this.id = id;
        this.nombre = nombre;
        this.image = image;
        this.numEntradas = numEntradas;
        this.precio = precio;
    }
    return Disco;
}());
var products = [
    new Disco(0, "Indara", "https://www.bilbaoplan.com/wp-content/uploads/2016/04/discoteca-1.jpg", 52, 10),
    new Disco(1, "Klabe", "https://www.bilbaoplan.com/wp-content/uploads/2016/04/discoteca-1.jpg", 45, 8),
    new Disco(2, "Totem", "https://www.bilbaoplan.com/wp-content/uploads/2016/04/discoteca-1.jpg", 69, 14),
];
function getProducts() {
    return products;
}
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.post('/products', bodyParser.json(), function (req, res) {
    var pNew = new Disco(products.length + 1, req.body.nombre, req.body.image, req.body.numEntradas, req.body.precio);
    products.push(pNew);
    res.status(200).send({
        id: pNew.id,
        nombre: pNew.nombre,
        image: pNew.image,
        numEntradas: pNew.numEntradas,
        precio: pNew.precio
    });
});
app.get('/', function (req, res) {
    res.send('The URL of products is 127.0.0.1:8000/products');
});
app.get('/products', function (req, res) {
    console.log("me han pedido la lista de discotecas");
    res.json(getProducts());
});
function getProductsById(productId) {
    var p;
    p = products.find(function (p) { return p.id == productId; });
    return p;
}
app.get('/products/:id', function (req, res) {
    res.json(getProductsById(parseInt(req.params.id)));
});
function updateProductsById(req, productId) {
    var p;
    p = products.find(function (p) { return p.id == productId; });
    var index = products.indexOf(p);
    req.body.nombre,
        req.body.image,
        req.body.numEntradas,
        req.body.precio;
    products[index] = p;
    return p;
}
app.put('/products/:id', function (req, res) {
    res.json(updateProductsById(req, parseInt(req.params.id)));
    res.send('Got a UPDATE request at /user');
});
function deleteProductsById(productId) {
    var p;
    p = products.find(function (p) { return p.id == productId; });
    var index = products.indexOf(p);
    //delete products[index];
    products.splice(index, 1);
    return p;
}
app["delete"]('/products/:id', function (req, res) {
    res.json(deleteProductsById(parseInt(req.params.id)));
    res.send('Got a DELETE request at /user');
});
app.post('/postData', bodyParser.json(), function (req, res) {
    console.log(res.json(req.body));
});
var server = app.listen(8000, "localhost", function () {
    var _a = server.address(), address = _a.address, port = _a.port;
    console.log('Listening on %s %s', address, port);
});
