require('dotenv').config()
const express = require("express");
const cors = require('cors')
const Router = require('./routes/routes')
require('./config/database')
const app = express()

app.use(cors())
app.use(express.json())

<<<<<<< HEAD
app.set('port', process.env.PORT || 4000)

app.use('/api', Router)

app.listen(app.get('port'), () => {
    console.log('server is listening on port ', app.get('port'))
=======
app.use('/api', Router)

app.listen(4000, () => {
    console.log('server is listening on port 4000')
>>>>>>> 416ec8ff809c1babfb7b20ae98aedf2b44948c51
})