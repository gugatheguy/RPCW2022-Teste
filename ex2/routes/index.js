var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
var express = require('express');
var router = express.Router();
var axios = require('axios')

key = "token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTRlY2VhNmI1ZDVjMjQ3NmNmMDhiMSIsImxldmVsIjozLjUsImVudGlkYWRlIjoiZW50X0EzRVMiLCJlbWFpbCI6InJwY3cyMDIyQGdtYWlsLmNvbSIsImlhdCI6MTY1NDAxNDMzMSwiZXhwIjoxNjU0MDQzMTMxfQ.ENm-Al72WRoyvYsmPDl5X-5yQ6uloV0UoYmfbtFxFuXfO1RWcBxupXcWOSjkn0ml-O-iMhxDPORX0R7ydtGcOLvLdbf31QbW3hMdpuwLc4u_8z7uHEfjSDwDzVNi5PN3Vce6Yp9RsBiRsj-0J4dtT2X3QhkbSNYGkr7akgqJPRpUQvJu5OvXY-iW35iNdVJewF9DpRHLkD1a4mCymkhP4F38AnHnhycpb24LOPKnYy7SGqMrn-y-jXokiO0-x21YwjePfNnPD2hUYhssONeUAIugXL93WNbNNvLCdzBQ3OIy4VuUnsvBEdyAN-FfBu2qK-lWdAKl9soNz1pudd2lQQ"
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "CLAV"})
})

router.get('/classes', function(req, res, next) {
  axios.get("http://clav-api.di.uminho.pt/v2/classes?nivel=1&"+key).then( resp => {
    res.render('classes', { title: "CLAV", list: resp.data })
  }).catch( err => {
    res.render('error', { title: "erro", message: err })
  })
});;

router.get('/termos', function(req, res, next) {
  axios.get("http://clav-api.di.uminho.pt/v2/termosIndice?"+key).then( resp => {
    res.render('termos', { title: "CLAV", list: resp.data })
  }).catch( err => {
    res.render('error', { title: "erro", message: err })
  })
});;

router.get('/classe/:id', function(req, res, next) {
  axios.get("http://clav-api.di.uminho.pt/v2/classes/c"+req.params.id +"?"+key).then( resp => {
    var pai = !(Object.keys(resp.data.pai).length === 0)

    res.render('classe', { title: "CLAV", classe: resp.data, temPai: pai})
  }).catch( err => {
    res.render('error', { title: "erro", message: err })
  })
});

module.exports = router;
