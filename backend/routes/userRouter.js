const express = require('express')
const userRouter = express.Router()
const viewController = require("../controllers/viewController")
userRouter.get('/',viewController.renderBackground)
userRouter.get('/map',viewController.renderMap)
userRouter.get('/analysis/:id',viewController.renderAnlysis)


module.exports = userRouter