const express = require('express')
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.use('/api', Router)

app.listen(4000, () => {
    console.log('server is listening on port 4000')
})