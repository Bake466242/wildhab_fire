const express = require('express')
const bodyParser = require('body-parser')
const { getEvents, postEvent } = require('./src/events')

const app = express()
app.use(bodyParser.json())
const port = 3001

//app.get('/events', (req, res) => getEvents(req, res))
app.get('/events', getEvents)
app.post('/events', postEvent)


app.get('/', (req, res) => {
    res.status(200).send('Hello There...General Kenobi')
})


app.listen(port, () => console.log('listening on http://localhost:' + port))