require('dotenv').config()
const express = require("express");
const cors = require('cors')
const Router = require('./routes/routes')
require('./config/database')
const app = express()

app.use(cors())
app.use(express.json())

app.set('port', process.env.PORT || 4000)

app.use('/api', Router)

app.listen(app.get('port'), () => {
    console.log('server is listening on port ', app.get('port'))
})