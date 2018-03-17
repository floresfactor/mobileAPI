var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ContactoSchema = new Schema({
    id: Number,
    nombre: String,
    telefono: String
});

module.exports = mongoose.model('Contacto', ContactoSchema);