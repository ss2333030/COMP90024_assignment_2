// this file is used to fetch data from couchdb 
// the browser cannot send request to couchdb due to cors policy

const express = require('express')
const apiRouter = express.Router()
const apiController = require("../public/api/api")

// coffee
apiRouter.get('/coffee/twitter',apiController.renderCoffeeTwitter)
apiRouter.get('/coffee/lga',apiController.renderCoffeeLGA)
apiRouter.get('/coffee/state',apiController.renderCoffeeState)
apiRouter.get('/coffee/mast',apiController.renderCoffeeMast)

// negative
apiRouter.get('/work/twitter',apiController.renderWorkTwitter)
apiRouter.get('/negative/twitter',apiController.renderNegativeTwitter)
apiRouter.get('/negative/lga',apiController.renderNegativeLGA)
apiRouter.get('/negative/state',apiController.renderNegativeState)

// entertainment
apiRouter.get('/enter/twitter',apiController.renderEnterTotal)
apiRouter.get('/enter/lga',apiController.renderEnterLGA)
apiRouter.get('/enter/state',apiController.renderEnterState)

// sudo
apiRouter.get('/sudo/big',apiController.renderSudoBigB)
apiRouter.get('/sudo/small',apiController.renderSudoSmallB)
apiRouter.get('/sudo/total',apiController.renderSudoTotalB)
apiRouter.get('/sudo/sum',apiController.renderSudoTotalSum)
apiRouter.get('/sudo/bSD',apiController.renderBusiSD)
apiRouter.get('/sudo/big',apiController.renderSudoBigB)
apiRouter.get('/sudo/big/state',apiController.renderSudoBigBState)
apiRouter.get('/sudo/small/state',apiController.renderSudoSmallBState)
apiRouter.get('/sudo/total/state',apiController.renderSudoTotalBState)
apiRouter.get('/sudo/bSD/state',apiController.renderBusiSDState)


//Mastodon
apiRouter.get('/mast/coffee',apiController.renderMastCoffee)
apiRouter.get('/mast/total',apiController.renderMastTotal)
apiRouter.get('/mast/nega',apiController.renderMastNega)
apiRouter.get('/mast/work',apiController.renderMastWork)


//Health
apiRouter.get('/sudo/health',apiController.renderSudoHealth)
apiRouter.get('/sudo/obesity',apiController.renderSudoObesity)
apiRouter.get('/sudo/smoker',apiController.renderSudoSmoker)
apiRouter.get('/sudo/alchohol',apiController.renderSudoAlchohol)


//Unemployment
apiRouter.get('/sudo/unemp',apiController.renderSudoUnemp)

//Climate Change
apiRouter.get('/sudo/climate',apiController.renderSudoClimate)
apiRouter.get('/sudo/transport',apiController.renderSudoTransport)
apiRouter.get('/sudo/bic',apiController.renderSudoBic)
apiRouter.get('/sudo/bus',apiController.renderSudoBus)
apiRouter.get('/sudo/scooter',apiController.renderSudoScooter)
apiRouter.get('/sudo/train',apiController.renderSudoTrain)
apiRouter.get('/sudo/tram',apiController.renderSudoTram)
apiRouter.get('/sudo/walk',apiController.renderSudoWalk)

module.exports = apiRouter