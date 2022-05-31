var express = require('express');
var router = express.Router();
var Cidade = require('../controllers/cidade');
var Ligacao = require('../controllers/ligacao');

/* GET home page. */
router.get('/cidades', function(req, res, next) {
  if (req.query['distrito']!= undefined){
    Cidade.listarDistrito(req.query['distrito'])
      .then(dados =>{
          res.status(200).jsonp(dados)
      })
      .catch(err =>{
        res.status(502).jsonp({error:err})
      })
  }else{
    Cidade.listar()
      .then(dados =>{
          res.status(200).jsonp(dados)
      })
      .catch(err =>{
        res.status(503).jsonp({error:err})
      })
  }
});

router.get('/ligacoes', function(req, res, next) {
  if (req.query['origem']!= undefined){
    Ligacao.listarByOrigem(req.query['origem'])
    .then(dados =>{
        var lista = []
        dados.forEach(l =>{
          Cidade.consultar(l.destino)
          .then(cidade =>{
            lista.push({id:l.id, destino:{id:l.destino, nome:cidade.nome}})
          })
          .catch(err =>{
            res.status(502).jsonp({error:err})
          })
        })
        res.status(200).jsonp(dados)
    })
    .catch(err =>{
      res.status(503).jsonp({error:err})
    })
  }else if (req.query['dist']!= undefined){
    Ligacao.listar()
    .then(dados =>{
        var lista = []
        dados.forEach(l =>{
          //Cidade.consultar(l.destino)
          //.then(cidade =>{
          //  lista.push({id:l.id, destino:{id:l.destino, nome:cidade.nome}})
          //})
          //.catch(err =>{
          //  res.status(502).jsonp({error:err})
          //})
          if (l.distância >= req.query['dist']){
            lista.push({id:l.id,origem:{id:l.origem}, destino:{id:l.destino}})
          }
        })
        res.status(200).jsonp(lista)
    })
    .catch(err =>{
      res.status(503).jsonp({error:err})
    })
  }else{
    res.status(200).jsonp("Não há queries")
  }
});

router.get('/distritos', function(req, res, next) {
    Cidade.listar()
      .then(dados =>{
          ans = {}
          dados.forEach(d =>{
            if (ans[d.distrito] == undefined) {
              ans[d.distrito] = {nome: d.distrito, cidades:[{id:d.id, nome: d.nome}]}
            }
            else{
              ans[d.distrito].cidades.push({id:d.id, nome: d.nome})
            }
          })
          res.status(200).jsonp(ans)
      })
      .catch(err =>{
        res.status(502).jsonp({error:err})
      })
});

router.get('/cidades/nomes', function(req, res, next) {
  Cidade.listarNomes()
    .then(dados =>{
        res.status(200).jsonp(dados)
    })
    .catch(err =>{
      res.status(502).jsonp({error:err})
    })
});

router.get('/cidades/:id', function(req, res, next) {
  Cidade.consultar(req.params.id)
  .then(dados =>{
    res.status(200).jsonp(dados)
  })
  .catch(err =>{
    res.status(502).jsonp({error:err})
  })
});

module.exports = router;
