const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const router = require('./routes')

const app = express()
app.use(cors())

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())

const PORT = 8000

app.get('/', (req, res) => {
    res.send('hello sk')
})

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`server berjalan pada port: ${PORT}`)
})