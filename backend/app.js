// install express

// import express
const express = require('express')
// create object
const app = express()
const cors = require('cors')
const axios = require('axios')

const port = 80
// use body-parser to receive post i.e req.body
const bodyParser = require('body-parser')

// connecy body-parser with app
app.use(bodyParser.urlencoded({extended:false})) // false receive value as string or array
// true with any type
app.use(bodyParser.json())
app.use(cors())

// app.use(cors())
//install handlebars
app.use(express.static('public'))
app.use(express.static('static'))

const exphbs = require('express-handlebars')
app.engine('hbs', 
    exphbs.engine({ // configure Handlebars
        defaultlayout: 'main',
        extname: 'hbs',
        partialsDir: __dirname + '/views/partials/',
        helpers: require('./public/js/helper.js').helpers,
    }))
app.set('view engine', 'hbs')
// path used to generate the html

// deal with request
const userRouter = require("./routes/userRouter")
const apiRouter = require("./routes/apiRouter")
// frontend
app.use('/',userRouter)

// backend
app.use('/',apiRouter)


app.listen(port,()=>{
    console.log(port," is listening");
})