// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var Contacto = require('./models/contacto');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mongoose   = require('mongoose');
mongoose.connect('mongodb://jose:qwertyuiop@ds117489.mlab.com:17489/agenda'); // connect to our database

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'API ok! vamos bien...' });   
});

// more routes for our API will happen here
router.route('/contactos')

    //create a producto (accessed at POST /api/productos)
    .post(function(req,res){
        var contacto = new Contacto(); // create a new instance of the producto model
        contacto.nombre = req.body.nombre; // set the productos name (comes from the request)
        contacto.telefono = req.body.telefono; 
        
        //save the producto and check for errors
        contacto.save(function(err){
            if(err)
                res.send(err);
            res.json({ message: 'contacto creado'});
        });
    })

    //Get all productos (accessed at POST /api/productos)
    .get(function(req,res){
        Contacto.find(function(err,contacto){
            if(err)
                res.send(err);


                res.json(contacto);

        });
    });




// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

