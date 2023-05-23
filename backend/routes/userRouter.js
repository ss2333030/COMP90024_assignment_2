const express = require('express')
const userRouter = express.Router()
const viewController = require("../controllers/viewController")
//  generate the page according to the path
userRouter.get('/',viewController.renderBackground)
userRouter.get('/map/:sc',viewController.renderMap)
userRouter.get('/analysis/:sc',viewController.renderAnlysis)
userRouter.get('/mastodon',viewController.renderMastodon)


module.exports = userRouter