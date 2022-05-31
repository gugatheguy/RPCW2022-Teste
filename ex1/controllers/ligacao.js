const Ligacao = require('../models/ligacao')

module.exports.listarByOrigem = function (o){
    return Ligacao
        .find({origem: o},{_id:0,id:1,destino:1})
        .exec()
}

module.exports.listar = function (){
    return Ligacao
        .find({},{_id:0,id:1,origem:1,destino:1,distância:1})
        .exec()
}