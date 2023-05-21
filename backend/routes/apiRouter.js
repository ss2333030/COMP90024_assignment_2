const express = require('express')
const apiRouter = express.Router()
const apiController = require("../public/api/api")
apiRouter.get('/',apiController.renderHomepage)
// coffee
apiRouter.get('/coffee/twitter',apiController.renderCoffeeTwitter)
apiRouter.get('/coffee/lga',apiController.renderCoffeeLGA)

// negative
apiRouter.get('/negative/twitter',apiController.renderNegativeTwitter)
apiRouter.get('/negative/lga',apiController.renderNegativeLGA)

// entertainment
apiRouter.get('/enter/twitter',apiController.renderEnterTotal)
apiRouter.get('/enter/lga',apiController.renderEnterLGA)

// sudo
apiRouter.get('/sudo/big',apiController.renderSudoBigB)
apiRouter.get('/sudo/small',apiController.renderSudoSmallB)
apiRouter.get('/sudo/total',apiController.renderSudoTotalB)
apiRouter.get('/sudo/sum',apiController.renderSudoTotalSum)

//Mastodon
apiRouter.get('/mast/coffee',apiController.renderMastCoffee)
apiRouter.get('/mast/total',apiController.renderMastTotal)
apiRouter.get('/mast/nega',apiController.renderMastNega)
apiRouter.get('/mast/work',apiController.renderMastWork)

module.exports = apiRouter