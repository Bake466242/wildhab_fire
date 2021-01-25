const express = require('express')
const { getEvents } = require('./src/events')

const app = express()
const port = 3001

//app.get('/events', (req, res) => getEvents(req, res))
app.get('/events', getEvents)

app.get('/', (req, res) => {
    res.status(200).send('Hello There...General Kenobi')
})


app.listen(port, () => console.log('listening on http://localhost:' + port))