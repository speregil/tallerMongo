var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EsquemaMercancia = new Schema({
    nombre: { type: String, required: true, unique: true},
    descripcion: { type: String, required: true },
    tipo: { type: String, required: true },
    anio: {type: Number, required: true},
    imagen: {type: String, required: true}
});

module.exports = mongoose.model('Mercancia', EsquemaMercancia);