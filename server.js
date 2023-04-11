const express = require('express')
const http = require('http')
const logger = require('morgan')
const cors = require('cors')
const checklistRoute = require('./routes/checklist.js')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()


const jsonErrorHandler = (err, req, res, next) => {
  res.status(500).send({ error: err.message })
}

//middlewear
const app = express()
app.use(logger('dev'))
app.use(cors())


//body passers
// for body parsers
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//connection of mongodb
mongoose.set('strictQuery', true)
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to db')
  })
  .catch((err) => {
    console.log('couldnt connect to db', err)
  })


app.use('/checklist', checklistRoute)



app.use(jsonErrorHandler)

app.use('*', function (request, response) {
  response
    .status(200)
    .json({ message: ' cron job  is working  , but routes not defined' })
})

//serverListener
http.createServer(app).listen(process.env.PORT || 3000)
